"use client";

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';

// Fix for default markers in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
  iconUrl: '/leaflet/images/marker-icon.png',
  shadowUrl: '/leaflet/images/marker-shadow.png',
});

interface Report {
  _id: string;
  location: string;
  description: string;
  urgency: "low" | "medium" | "high" | "emergency";
  status: "reported" | "under_review" | "resolved";
  coordinates?: {
    lat: number;
    lng: number;
  };
  imageUrl?: string;
}

interface InteractiveMapProps {
  reports: Report[];
  onMarkerClick: (report: Report) => void;
  onMapMove?: (bounds: any) => void;
  selectedReport?: Report | null;
  mapRef?: React.MutableRefObject<any>;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  reports,
  onMarkerClick,
  onMapMove,
  selectedReport,
  mapRef
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markerCluster = useRef<any>(null);
  const isProgrammaticMove = useRef<boolean>(false);
  const previousReportIds = useRef<string>('');
  const hasInitiallyFitted = useRef<boolean>(false);

  // Custom marker icons based on urgency
  const getMarkerIcon = (urgency: string, isSelected: boolean = false) => {
    const color = 
      urgency === 'emergency' ? 'red' :
      urgency === 'high' ? 'orange' :
      urgency === 'medium' ? 'yellow' :
      'green';
    
    const borderColor = isSelected ? 'blue' : 'white';
    const borderWidth = isSelected ? 3 : 2;

    return L.divIcon({
      html: `
        <div style="
          background-color: ${color};
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: ${borderWidth}px solid ${borderColor};
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 10px;
        ">
          🐕
        </div>
      `,
      className: 'custom-marker',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });
  };

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return;

    // Create map instance with zoom controls enabled
    mapInstance.current = L.map(mapContainer.current, {
      zoomControl: true,
      minZoom: 3,
      maxZoom: 19
    }).setView([28.6139, 77.2090], 12);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(mapInstance.current);

    // Initialize marker cluster
    markerCluster.current = (L as any).markerClusterGroup({
      chunkedLoading: true,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
    });
    mapInstance.current.addLayer(markerCluster.current);

    // Handle map move
    const handleMove = () => {
      if (onMapMove && mapInstance.current && !isProgrammaticMove.current) {
        const bounds = mapInstance.current.getBounds();
        onMapMove(bounds);
      }
    };

    mapInstance.current.on('moveend', handleMove);

    // Cleanup
    return () => {
      if (mapInstance.current) {
        mapInstance.current.off('moveend', handleMove);
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  // Update markers when reports change
  useEffect(() => {
    if (!mapInstance.current || !markerCluster.current) return;

    // Check if reports actually changed
    const currentReportIds = reports.map(r => r._id).sort().join(',');
    
    // Clear existing markers
    markerCluster.current.clearLayers();

    // Add new markers
    reports.forEach(report => {
      if (!report.coordinates) return;

      const isSelected = selectedReport?._id === report._id;
      const marker = L.marker(
        [report.coordinates.lat, report.coordinates.lng],
        { 
          icon: getMarkerIcon(report.urgency, isSelected),
          title: report.location
        }
      );

      marker.on('click', () => {
        onMarkerClick(report);
        // Center map on marker
        mapInstance.current?.setView([report.coordinates!.lat, report.coordinates!.lng], 15);
      });

      // Add popup
      marker.bindPopup(`
        <div style="min-width: 200px;">
          <strong>${report.location}</strong>
          <p style="margin: 5px 0; color: #666; font-size: 14px;">
            ${report.description.length > 100 
              ? report.description.substring(0, 100) + '...' 
              : report.description}
          </p>
          <div style="display: flex; justify-content: space-between; margin-top: 10px;">
            <span style="
              background: ${
                report.urgency === 'emergency' ? '#dc2626' :
                report.urgency === 'high' ? '#f97316' :
                report.urgency === 'medium' ? '#eab308' :
                '#22c55e'
              };
              color: white;
              padding: 2px 8px;
              border-radius: 12px;
              font-size: 12px;
            ">
              ${report.urgency}
            </span>
            <span style="
              background: #3b82f6;
              color: white;
              padding: 2px 8px;
              border-radius: 12px;
              font-size: 12px;
            ">
              ${report.status}
            </span>
          </div>
        </div>
      `);

      markerCluster.current.addLayer(marker);

      // If this is the selected report, open popup
      if (isSelected) {
        marker.openPopup();
      }
    });

    // Fit bounds to show all markers only on initial load or when report IDs actually change
    const shouldFitBounds = reports.length > 0 && 
                            markerCluster.current.getLayers().length > 0 &&
                            (currentReportIds !== previousReportIds.current || !hasInitiallyFitted.current);
    
    if (shouldFitBounds) {
      isProgrammaticMove.current = true;
      hasInitiallyFitted.current = true;
      const group = new L.FeatureGroup(markerCluster.current.getLayers());
      mapInstance.current.fitBounds(group.getBounds().pad(0.1));
      // Reset flag after a short delay to allow moveend event to fire
      setTimeout(() => {
        isProgrammaticMove.current = false;
      }, 100);
    }

    // Update previous report IDs
    previousReportIds.current = currentReportIds;

  }, [reports, selectedReport]);

  // Expose map instance to parent
  useEffect(() => {
    if (mapRef && mapInstance.current) {
      mapRef.current = mapInstance.current;
    }
  }, [mapRef]);

  return (
    <div 
      ref={mapContainer} 
      className="w-full h-full"
      style={{ minHeight: '500px' }}
    />
  );
};

export default InteractiveMap;
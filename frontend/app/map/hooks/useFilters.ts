import { useState, useEffect } from 'react';
import { Report } from '../components/types';

export const useFilters = (reports: Report[]) => {
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [urgencyFilter, setUrgencyFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [mapBounds, setMapBounds] = useState<any>(null);

  const applyFilters = () => {
    let filtered = [...reports || []];

    // Filter by urgency
    if (urgencyFilter !== "all") {
      filtered = filtered.filter(report => report.urgency === urgencyFilter);
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(report => report.status === statusFilter);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(report => 
        report.location.toLowerCase().includes(query) ||
        report.description.toLowerCase().includes(query)
      );
    }

    // Filter by map bounds
    if (mapBounds) {
      filtered = filtered.filter(report => {
        if (!report.coordinates) return false;
        const { lat, lng } = report.coordinates;
        return (
          lat >= mapBounds._southWest.lat &&
          lat <= mapBounds._northEast.lat &&
          lng >= mapBounds._southWest.lng &&
          lng <= mapBounds._northEast.lng
        );
      });
    }

    setFilteredReports(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [reports, urgencyFilter, statusFilter, searchQuery, mapBounds]);

  return {
    filteredReports : filteredReports || [],
    urgencyFilter,
    setUrgencyFilter,
    statusFilter,
    setStatusFilter,
    searchQuery,
    setSearchQuery,
    mapBounds,
    setMapBounds
  };
};
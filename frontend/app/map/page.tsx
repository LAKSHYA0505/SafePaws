"use client";

import PageHeader from "./components/PageHeader"; 
import { useState, useRef } from "react";
import MapHeader from "./components/MapHeader";
import StatsCards from "./components/StatsCards";
import MapContainer from "./components/MapContainer";
import ReportsSidebar from "./components/ReportsSidebar";
import ReportDetailsModal from "./components/ReportDetailsModal";
import MapLegend from "./components/MapLegend";
import Footer from "@/components/layout/Footer";
import { useReports } from "./hooks/useReports";
import { useFilters } from "./hooks/useFilters";
import { Report } from "./components/types";

export default function MapPage() {
  // State
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedReportDetails, setSelectedReportDetails] = useState<Report | null>(null);
  
  // Refs
  const mapRef = useRef<any>(null);
  
  // Custom Hooks
  const { reports, loading, fetchReports, getStats } = useReports();
  const {
    filteredReports,
    urgencyFilter,
    setUrgencyFilter,
    statusFilter,
    setStatusFilter,
    searchQuery,
    setSearchQuery,
    mapBounds,
    setMapBounds
  } = useFilters(reports || []); // Pass empty array if undefined

  // console.log("🔍 DEBUG - Reports from useReports:", reports);
  // console.log("🔍 DEBUG - Filtered reports:", filteredReports);
  // console.log("🔍 DEBUG - Is loading:", loading);

  // Handlers
  const handleMarkerClick = (report: Report) => {
    setSelectedReport(report);
    document.getElementById(`report-${report._id}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  };

  const handleReportClick = (report: Report) => {
    setSelectedReport(report);
    if (mapRef.current && report.coordinates) {
      mapRef.current.flyTo([report.coordinates.lat, report.coordinates.lng], 15);
    }
  };

  const handleViewDetails = (report: Report, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedReportDetails(report);
    setShowDetailsModal(true);
  };

  const closeReportDetails = () => {
    setShowDetailsModal(false);
    setSelectedReportDetails(null);
  };

  // Helper functions with safe defaults
  const getUrgencyColor = (urgency: string = "medium") => {
    switch (urgency) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'emergency': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string = "reported") => {
    switch (status) {
      case 'reported': return 'bg-blue-100 text-blue-800';
      case 'under_review': return 'bg-purple-100 text-purple-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = getStats(reports || []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <MapHeader />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <PageHeader />

        {/* DEBUG PANEL - Add this temporarily */}
        {/* <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 rounded">
          <h3 className="font-bold text-yellow-800">Debug Panel</h3>
          <div className="text-sm">
            <p>Total Reports: {reports?.length || 0}</p>
            <p>Filtered Reports: {filteredReports?.length || 0}</p>
            <p>Loading: {loading ? 'Yes' : 'No'}</p>
            <button
              onClick={() => {
                console.log('=== DEBUG DATA ===');
                console.log('Reports:', reports);
                console.log('Filtered:', filteredReports);
                console.log('First Report:', reports?.[0]);
              }}
              className="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-sm"
            >
              Log to Console
            </button>
          </div>
        </div> */}
        
        {/* Stats Cards */}
        <StatsCards stats={stats} />

        {/* Main Content - Map + Side Panel */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <MapContainer
            reports={filteredReports || []}
            loading={loading}
            onRefresh={fetchReports}
            onMapMove={setMapBounds}
            onMarkerClick={handleMarkerClick}
            selectedReport={selectedReport}
            mapRef={mapRef}
          />

          <ReportsSidebar
            reports={filteredReports || []}
            loading={loading}
            selectedReportId={selectedReport?._id || null}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            urgencyFilter={urgencyFilter}
            setUrgencyFilter={setUrgencyFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            onReportClick={handleReportClick}
            onViewDetails={handleViewDetails}
            getUrgencyColor={getUrgencyColor}
            getStatusColor={getStatusColor}
          />
        </div>

        <MapLegend />

        {/* Report Details Modal */}
        {showDetailsModal && selectedReportDetails && (
          <ReportDetailsModal
            report={selectedReportDetails}
            onClose={closeReportDetails}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
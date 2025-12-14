import { useState, useEffect } from 'react';
import { Report } from '../components/types';

export const useReports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      setLoading(true);
      console.log("Fetching reports from API...");
      const response = await fetch("http://localhost:5000/api/reports");
      console.log("🔍 DEBUG - API Response status:", response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log("🔍 DEBUG - Full API result:", result);
      console.log("🔍 DEBUG - Success flag:", result.success);
      console.log("🔍 DEBUG - Data received:", result.data);
      if (result.success) {
        const validReports = result.data.filter((report: Report) => 
          report.coordinates && report.coordinates.lat && report.coordinates.lng
        );
        console.log("🔍 DEBUG - Valid reports after filtering:", validReports);
        setReports(validReports);
      } else {
        console.error("API returned error:", result.message);
      }
    } catch (err) {
      console.error("Failed to fetch reports:", err);
      // For demo, create mock data
      createMockReports();
    } finally {
      setLoading(false);
    }
  };

  const createMockReports = () => {
    const mockReports: Report[] = [
      {
        _id: "1",
        location: "Connaught Place, Delhi",
        description: "Brown stray dog with injured paw near metro station",
        urgency: "high",
        status: "reported",
        dogCount: 1,
        coordinates: { lat: 28.6315, lng: 77.2167 },
        createdAt: new Date().toISOString()
      },
      {
        _id: "2",
        location: "Lodhi Garden",
        description: "Group of 3 friendly dogs near main gate",
        urgency: "low",
        status: "under_review",
        dogCount: 3,
        coordinates: { lat: 28.5933, lng: 77.2197 },
        createdAt: new Date().toISOString()
      },
      {
        _id: "3",
        location: "Sarojini Nagar Market",
        description: "Aggressive dog chasing people near parking area",
        urgency: "emergency",
        status: "reported",
        dogCount: 1,
        coordinates: { lat: 28.5754, lng: 77.1981 },
        createdAt: new Date().toISOString()
      }
    ];
    
    setReports(mockReports);
  };

  const getStats = (reports: Report[]) => {
    return {
      total: reports.length,
      active: reports.filter(r => r.status !== 'resolved').length,
      emergency: reports.filter(r => r.urgency === 'emergency').length,
      resolved: reports.filter(r => r.status === 'resolved').length,
      totalDogs: reports.reduce((sum, report) => sum + (report.dogCount || 1), 0)
    };
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return { reports, loading, fetchReports, getStats };
};
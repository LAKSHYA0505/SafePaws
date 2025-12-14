import Link from "next/link";
import { Report } from "../types";
import ReportCard from "./ReportCard";

interface ReportsListProps {
  reports: Report[];
  loading: boolean;
  selectedReportId: string | null;
  onReportClick: (report: Report) => void;
  onViewDetails: (report: Report, e: React.MouseEvent) => void;
  getUrgencyColor: (urgency: string) => string;
  getStatusColor: (status: string) => string;
}

export default function ReportsList({
  reports,
  loading,
  selectedReportId,
  onReportClick,
  onViewDetails,
  getUrgencyColor,
  getStatusColor
}: ReportsListProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Filter out any undefined/null reports
  const validReports = reports?.filter(report => report && report._id) || [];

  if (validReports.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">🗺️</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Reports Found</h3>
        <p className="text-gray-600 mb-6">Try changing filters or zooming out</p>
        <Link
          href="/report"
          className="inline-block bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition transform hover:scale-105"
        >
          Report First Incident
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {validReports.map((report) => (
        <ReportCard
          key={report._id}
          report={report}
          isSelected={selectedReportId === report._id}
          onClick={() => onReportClick(report)}
          onViewDetails={(e) => onViewDetails(report, e)}
          getUrgencyColor={getUrgencyColor}
          getStatusColor={getStatusColor}
        />
      ))}
    </div>
  );
}
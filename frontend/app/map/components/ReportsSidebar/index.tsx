import Filters from "./Filters";
import ReportsList from "./ReportsList";
import { Report } from "../types";

interface ReportsSidebarProps {
  reports: Report[];
  loading: boolean;
  selectedReportId: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  urgencyFilter: string;
  setUrgencyFilter: (filter: string) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
  onReportClick: (report: Report) => void;
  onViewDetails: (report: Report, e: React.MouseEvent) => void;
  getUrgencyColor: (urgency: string) => string;
  getStatusColor: (status: string) => string;
}

export default function ReportsSidebar({
  reports,
  loading,
  selectedReportId,
  searchQuery,
  setSearchQuery,
  urgencyFilter,
  setUrgencyFilter,
  statusFilter,
  setStatusFilter,
  onReportClick,
  onViewDetails,
  getUrgencyColor,
  getStatusColor
}: ReportsSidebarProps) {
    console.log("🔍 DEBUG - ReportsSidebar received reports:", reports);
  console.log("🔍 DEBUG - Reports length:", reports?.length);
  console.log("🔍 DEBUG - First report:", reports?.[0]);
  console.log("🔍 DEBUG - Is loading:", loading);
  return (
    <div className="lg:w-5/12">
      <div className="bg-white rounded-2xl shadow-xl h-[600px] flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Reports in View</h2>
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {reports.length} reports
            </span>
          </div>

          <Filters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            urgencyFilter={urgencyFilter}
            setUrgencyFilter={setUrgencyFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <ReportsList
            reports={reports}
            loading={loading}
            selectedReportId={selectedReportId}
            onReportClick={onReportClick}
            onViewDetails={onViewDetails}
            getUrgencyColor={getUrgencyColor}
            getStatusColor={getStatusColor}
          />
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <div>
              <span className="font-medium">Tip:</span> Click any report to focus on map
            </div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-blue-600 hover:text-blue-800 font-medium transition"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
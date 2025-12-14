import { Clock, Users, Eye } from "lucide-react";
import { Report } from "../types";

interface ReportCardProps {
  report: Report;
  isSelected: boolean;
  onClick: () => void;
  onViewDetails: (e: React.MouseEvent) => void;
  getUrgencyColor: (urgency: string) => string;
  getStatusColor: (status: string) => string;
}

export default function ReportCard({
  report,
  isSelected,
  onClick,
  onViewDetails,
  getUrgencyColor,
  getStatusColor
}: ReportCardProps) {
  if (!report) {
    return null;
  }
  return (
    <div
      id={`report-${report._id}`}
      className={`border-2 rounded-xl p-5 cursor-pointer transition-all hover:shadow-lg ${
        isSelected
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-bold text-gray-900 text-lg">{report.location}</h3>
            <span className={`text-xs px-2 py-1 rounded-full ${getUrgencyColor(report.urgency)}`}>
              {report.urgency}
            </span>
          </div>
          <p className="text-gray-600 line-clamp-2 mb-3">{report.description}</p>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {new Date(report.createdAt).toLocaleDateString()}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(report.status)}`}>
              {report.status.replace('_', ' ')}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {report.dogCount} dog{report.dogCount > 1 ? 's' : ''}
            </span>
          </div>
        </div>
        <button 
          className="text-gray-400 hover:text-blue-600 transition"
          onClick={onViewDetails}
          title="View full details"
        >
          <Eye className="w-5 h-5" />
        </button>
      </div>

      <div className="mt-3">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
          report.status === 'reported' ? 'bg-blue-100 text-blue-800' :
          report.status === 'under_review' ? 'bg-purple-100 text-purple-800' :
          'bg-green-100 text-green-800'
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            report.status === 'reported' ? 'bg-blue-600' :
            report.status === 'under_review' ? 'bg-purple-600' :
            'bg-green-600'
          }`}></div>
          Status: {report.status.replace('_', ' ')}
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { Report } from "./types";

interface ReportDetailsModalProps {
  report: Report;
  onClose: () => void;
}

export default function ReportDetailsModal({ report, onClose }: ReportDetailsModalProps) {
  const getCloudinaryUrl = () => {
    if (!report.imagePublicId) return report.imageUrl;
    const cleanPublicId = report.imagePublicId?.replace(/,\s*$/, '');
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'drtibzsqb';
    return `https://res.cloudinary.com/${cloudName}/image/upload/w_800,c_limit,q_auto/${cleanPublicId}.jpg`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Report Details</h3>
            <p className="text-gray-600 mt-1">{report.location}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl w-10 h-10 flex items-center justify-center"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <div className="space-y-6">
            {/* Urgency and Status Badges */}
            <div className="flex flex-wrap gap-3">
              <div className={`px-4 py-2 rounded-full font-medium ${
                report.urgency === 'low' ? 'bg-green-100 text-green-800 border border-green-200' :
                report.urgency === 'medium' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                report.urgency === 'high' ? 'bg-orange-100 text-orange-800 border border-orange-200' :
                'bg-red-100 text-red-800 border border-red-200'
              }`}>
                <span className="font-semibold">Priority:</span> {report.urgency.charAt(0).toUpperCase() + report.urgency.slice(1)}
              </div>
              <div className={`px-4 py-2 rounded-full font-medium ${
                report.status === 'reported' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                report.status === 'under_review' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                'bg-green-100 text-green-800 border border-green-200'
              }`}>
                <span className="font-semibold">Status:</span> {report.status.replace('_', ' ')}
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-xl">📝</span>
                Description
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-gray-700 whitespace-pre-line">{report.description}</p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h5 className="text-sm font-medium text-gray-500 mb-1">📍 Location</h5>
                <p className="font-medium text-gray-900">{report.location}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h5 className="text-sm font-medium text-gray-500 mb-1">🐕 Number of Dogs</h5>
                <p className="font-medium text-gray-900">{report.dogCount} dog{report.dogCount > 1 ? 's' : ''}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h5 className="text-sm font-medium text-gray-500 mb-1">📅 Reported On</h5>
                <p className="font-medium text-gray-900">
                  {new Date(report.createdAt).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h5 className="text-sm font-medium text-gray-500 mb-1">🆔 Report ID</h5>
                <p className="font-mono text-sm text-gray-900 break-all">{report._id}</p>
              </div>
            </div>

            {/* Image Section */}
            {report.imageUrl && report.imageUrl.trim() !== '' && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-xl">📸</span>
                  Photo Evidence
                </h4>
                
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <img
                    src={getCloudinaryUrl()}
                    alt="Dog photo from report"
                    className="w-full max-h-[400px] object-contain mx-auto"
                    onError={(e) => {
                      console.log('Optimized URL failed, trying original');
                      e.currentTarget.src = report.imageUrl!;
                    }}
                  />
                  
                  <div className="bg-gray-50 p-3 border-t border-gray-200">
                    <a
                      href={report.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Open original image →
                    </a>
                    <p className="text-xs text-gray-500 mt-1">
                      Public ID: {report.imagePublicId}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* No Image Message */}
            {(!report.imageUrl || report.imageUrl.trim() === '') && (
              <div className="border border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50">
                <div className="text-4xl mb-3">🖼️</div>
                <p className="text-gray-600 font-medium">No photo provided with this report</p>
                <p className="text-gray-500 text-sm mt-1">The reporter did not upload any images</p>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm text-center sm:text-left">
              <span className="font-medium">Note:</span> This report has been submitted to nearby NGOs for review
            </p>
            <div className="flex gap-3">
              <Link
                href="/report"
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition flex items-center gap-2"
              >
                <span>🐕</span>
                Report Similar Issue
              </Link>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
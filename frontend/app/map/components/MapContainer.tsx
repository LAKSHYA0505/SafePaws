import { RefreshCw } from "lucide-react";
import dynamic from 'next/dynamic';
import { Report } from "./types";

const InteractiveMap = dynamic(() => import('./InteractiveMap'), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading map...</p>
      </div>
    </div>
  )
});

interface MapContainerProps {
  reports: Report[];
  loading: boolean;
  onRefresh: () => void;
  onMapMove: (bounds: any) => void;
  onMarkerClick: (report: Report) => void;
  selectedReport: Report | null;
  mapRef: React.MutableRefObject<any>;
}

export default function MapContainer({
  reports,
  loading,
  onRefresh,
  onMapMove,
  onMarkerClick,
  selectedReport,
  mapRef
}: MapContainerProps) {
  return (
    <div className="lg:w-7/12">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-[600px]">
        <div className="p-5 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Interactive Map</h2>
            <p className="text-sm text-gray-600">Click markers for details • Drag to navigate</p>
          </div>
          <button
            onClick={onRefresh}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Data</span>
          </button>
        </div>
        
        <InteractiveMap
          reports={reports}
          onMarkerClick={onMarkerClick}
          onMapMove={onMapMove}
          selectedReport={selectedReport}
          mapRef={mapRef}
        />
      </div>
    </div>
  );
}
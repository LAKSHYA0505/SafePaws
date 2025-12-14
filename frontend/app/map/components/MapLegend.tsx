import { MapPin } from "lucide-react";

export default function MapLegend() {
  const legendItems = [
    { color: "bg-green-500", label: "Low Priority" },
    { color: "bg-yellow-500", label: "Medium Priority" },
    { color: "bg-orange-500", label: "High Priority" },
    { color: "bg-red-500", label: "Emergency" },
    { color: "bg-blue-500 border-4 border-white shadow-lg", label: "Selected Report" }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5" />
        Map Legend
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className={`w-4 h-4 ${item.color} rounded-full border-2 border-white`}></div>
            <span className="text-sm font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
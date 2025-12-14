import { MapPin, AlertCircle, CheckCircle, Users } from "lucide-react";
import { Stats } from "./types";

interface StatsCardsProps {
  stats: Stats;
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const statCards = [
    {
      title: "Total Reports",
      value: stats.total,
      icon: MapPin,
      color: "blue"
    },
    {
      title: "Active Cases",
      value: stats.active,
      icon: AlertCircle,
      color: "orange"
    },
    {
      title: "Emergencies",
      value: stats.emergency,
      icon: AlertCircle,
      color: "red"
    },
    {
      title: "Resolved",
      value: stats.resolved,
      icon: CheckCircle,
      color: "green"
    },
    {
      title: "Total Dogs",
      value: stats.totalDogs,
      icon: Users,
      color: "purple"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-600';
      case 'orange': return 'bg-orange-100 text-orange-600';
      case 'red': return 'bg-red-100 text-red-600';
      case 'green': return 'bg-green-100 text-green-600';
      case 'purple': return 'bg-purple-100 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getTextColor = (color: string) => {
    switch (color) {
      case 'blue': return 'text-blue-600';
      case 'orange': return 'text-orange-600';
      case 'red': return 'text-red-600';
      case 'green': return 'text-green-600';
      case 'purple': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {statCards.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
              <p className={`text-3xl font-bold mt-1 ${getTextColor(stat.color)}`}>
                {stat.value}
              </p>
            </div>
            <div className={`p-3 rounded-full ${getColorClasses(stat.color)}`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
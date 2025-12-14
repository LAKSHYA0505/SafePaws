import Link from "next/link";
import { MapPin } from "lucide-react";

export default function MapHeader() {
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-red-600" />
            <span>SafePaws</span>
            <span className="text-blue-600">Map</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium transition">Home</Link>
            <Link href="/report" className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-semibold transition transform hover:scale-105">
              + Report Incident
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-gray-900 font-medium transition">About</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
'use client';
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [menuOpen,setMenuOpen]=useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navbar - Keep your existing excellent navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            <Link href="/" className="text-2xl font-bold text-gray-900">🐾 SafePaws</Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium">Home</Link>
              <Link href="/report" className="text-red-600 hover:text-red-700 font-medium">Report</Link>
              <Link href="/about" className="text-gray-700 hover:text-gray-900 font-medium">About</Link>
              <Link href="/contact" className="text-gray-700 hover:text-gray-900 font-medium">Contact</Link>
            </div>

            <div className="md:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              </button>
            </div>
          </div>

          {menuOpen && (
            <div className="md:hidden bg-white shadow p-4 space-y-4">
              <Link href="/" className="block">Home</Link>
              <Link href="/report" className="block">Report</Link>
              <Link href="/about" className="block">About</Link>
              <Link href="/contact" className="block">Contact</Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">SafePaws</h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            SafePaws is a community-driven platform dedicated to protecting stray dogs
            and ensuring the safety of both animals and people.
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Together, we can create a safer environment for everyone and ensure that
            our furry friends receive the care and attention they deserve.
          </p>
          
          {/* Updated Button Group */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/report" className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold text-xl px-12 py-4 rounded-lg shadow-lg transition-all transform hover:scale-105 duration-200">
              Report an Issue
            </Link>
            <Link href="/map" className="inline-block border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-bold text-xl px-12 py-4 rounded-lg transition-all duration-200">
              View Live Map
            </Link>
          </div>
        </div>

        {/* Updated Clickable Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          <Link href="/report" className="block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-red-200 hover:transform hover:-translate-y-1">
            <div className="text-4xl mb-4">🐕</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Report Stray Dogs</h3>
            <p className="text-gray-600">Report incidents involving stray dogs that need help or are causing concerns.</p>
          </Link>

          <Link href="/ngos" className="block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200 hover:transform hover:-translate-y-1">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">NGO Collaboration</h3>
            <p className="text-gray-600">Connect with NGOs actively working to address street dog issues.</p>
          </Link>

          <Link href="/map" className="block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-green-200 hover:transform hover:-translate-y-1">
            <div className="text-4xl mb-4">📍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Live Reports Map</h3>
            <p className="text-gray-600">See issues reported in your area and join community solutions.</p>
          </Link>

          <Link href="/safety" className="block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-purple-200 hover:transform hover:-translate-y-1">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Safety & Awareness</h3>
            <p className="text-gray-600">Learn safe practices and how to contribute to their well-being.</p>
          </Link>
        </div>

        {/* Stats Section */}
        <section className="mt-20 py-12 bg-gradient-to-r from-red-50 to-blue-50 rounded-2xl">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-12">Making a Difference Together</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div><div className="text-2xl font-bold text-red-600 mb-2">Reports Resolved</div><div className="text-gray-600 font-medium">coming soon</div></div>
              <div><div className="text-2xl font-bold text-blue-600 mb-2">NGO    Partners</div><div className="text-gray-600 font-medium">coming soon</div></div>
              <div><div className="text-2xl font-bold text-green-600 mb-2">Lives Impacted</div><div className="text-gray-600 font-medium">coming soon</div></div>
              <div><div className="text-2xl font-bold text-purple-600 mb-2">Active Volunteers</div><div className="text-gray-600 font-medium">coming soon</div></div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer - Keep your existing footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-400">© 2024 SafePaws. All rights reserved. Making our streets safer for everyone.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
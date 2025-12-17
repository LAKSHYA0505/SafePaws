'use client';

import Link from "next/link";
import { useState } from "react";
import { 
  Target, 
  AlertTriangle, 
  HeartHandshake, 
  Scale, 
  Eye, 
  Users,
  Shield,
  Globe,
  Stethoscope,
  Syringe,
  BookOpen,
  Award
} from "lucide-react";

export default function About() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navbar - Consistent with Homepage */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-gray-900">🐾 SafePaws</Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium">Home</Link>
              <Link href="/report" className="text-red-600 hover:text-red-700 font-medium">Report</Link>
              <Link href="/about" className="text-gray-700 hover:text-gray-900 font-medium">About</Link>
              <Link href="/map" className="text-gray-700 hover:text-gray-900 font-medium">Map</Link>
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
              <Link href="/map" className="block">Map</Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
            <Target className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">About SafePaws</h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A community-driven platform dedicated to protecting stray dogs and 
            ensuring the safety of both animals and people through humane, 
            legal, and effective street dog management.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-3xl p-8 md:p-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-white p-3 rounded-xl">
                <Target className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              SafePaws is a community-driven platform dedicated to protecting stray dogs 
              and ensuring the safety of both animals and people through humane, legal, 
              and effective street dog management.
            </p>
          </div>
        </section>

        {/* The Problem Section */}
        <section className="mb-20">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="lg:w-1/3">
              <div className="bg-red-100 rounded-2xl p-6 inline-flex">
                <AlertTriangle className="w-16 h-16 text-red-600" />
              </div>
            </div>
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">The Problem We're Solving</h2>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  India has an estimated <span className="font-bold text-red-600">70 million stray dogs</span>, and every year approximately 
                  <span className="font-bold text-red-600"> 17 million people are bitten by dogs</span>. Traditional approaches like culling 
                  or relocation have proven ineffective and are now illegal.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Communities need a better way to report concerns and connect with 
                  organizations that can help — that's where SafePaws comes in.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <HeartHandshake className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How SafePaws Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We bridge the gap between citizens, NGOs, and volunteers through technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
              <div className="text-3xl mb-4">📱</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Report Incidents</h3>
              <p className="text-gray-600">Users report stray dog incidents with location, photos, and details</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:border-green-200 hover:shadow-xl transition-all duration-300">
              <div className="text-3xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">NGO Connection</h3>
              <p className="text-gray-600">Reports are automatically sent to nearby animal welfare organizations</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:border-purple-200 hover:shadow-xl transition-all duration-300">
              <div className="text-3xl mb-4">📍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Transparent Tracking</h3>
              <p className="text-gray-600">Track resolution progress on our interactive map in real-time</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300">
              <div className="text-3xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Awareness</h3>
              <p className="text-gray-600">Build understanding about humane dog management practices</p>
            </div>
          </div>
        </section>

        {/* Legal & Humane Approach */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-white p-3 rounded-xl">
                <Scale className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Our Approach: Legal & Humane</h2>
            </div>
            
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              SafePaws operates in full compliance with the <span className="font-semibold">Animal Birth Control (ABC) Rules 2001</span> 
              and the <span className="font-semibold">Prevention of Cruelty to Animals Act 1960</span>. We facilitate humane solutions:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Stethoscope className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Animal Birth Control</h4>
                <p className="text-sm text-gray-600">Sterilization programs</p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Syringe className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Anti-Rabies Vaccination</h4>
                <p className="text-sm text-gray-600">ARV programs</p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Medical Treatment</h4>
                <p className="text-sm text-gray-600">For injured dogs</p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Community Education</h4>
                <p className="text-sm text-gray-600">Humane practices</p>
              </div>
            </div>

            <div className="mt-10 p-6 bg-white/50 rounded-xl border border-green-200">
              <p className="text-gray-700 font-medium">
                <span className="text-green-600 font-bold">✓ Important:</span> All dogs are returned to their original territories after treatment, 
                as mandated by Indian law. We do not support or facilitate relocation or culling of animals.
              </p>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
              <Eye className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We envision safer streets for everyone—where stray dogs are healthy, 
              vaccinated, and sterilized, and where communities coexist peacefully 
              with street animals through understanding and proper management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-8">
              <div className="text-4xl mb-4">🏙️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Safer Communities</h3>
              <p className="text-gray-600">Reduced dog bites and rabies cases through proper management</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8">
              <div className="text-4xl mb-4">🐕</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Healthier Animals</h3>
              <p className="text-gray-600">Sterilized, vaccinated, and medically treated stray dog populations</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Compassionate India</h3>
              <p className="text-gray-600">A nation that respects and cares for all living beings</p>
            </div>
          </div>
        </section>

        {/* Join Us Section */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6">
              <Users className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Our Movement</h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
              Whether you're reporting an incident, volunteering your time, or partnering as 
              an NGO, you're part of the solution. Together, we can create a more compassionate 
              India for both people and animals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link 
                href="/report" 
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-8 py-3 rounded-lg shadow-lg transition-all transform hover:scale-105 duration-200"
              >
                Report an Incident
              </Link>
              <Link 
                href="/map" 
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-3 rounded-lg shadow-lg transition-all transform hover:scale-105 duration-200"
              >
                View Live Map
              </Link>
              <button 
                className="inline-block border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-bold text-lg px-8 py-3 rounded-lg transition-all duration-200"
                onClick={() => alert("NGO Partnership form coming soon!")}
              >
                Partner as NGO
              </button>
            </div>
          </div>
        </section>

        {/* Beta Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Award className="w-6 h-6 text-yellow-600" />
            <span className="text-yellow-800 font-semibold">Beta Phase</span>
          </div>
          <p className="text-gray-700">
            SafePaws is currently in beta. We're working with NGOs and communities across 
            India to build a comprehensive street dog management network.
          </p>
        </div>
      </main>

      {/* Footer - Consistent with Homepage */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="text-2xl font-bold text-white mb-2 inline-block">🐾 SafePaws</Link>
              <p className="text-gray-400">Making our streets safer for everyone.</p>
            </div>
            <div className="flex space-x-6">
              <Link href="/" className="text-gray-400 hover:text-white transition">Home</Link>
              <Link href="/about" className="text-gray-400 hover:text-white transition">About</Link>
              <Link href="/report" className="text-gray-400 hover:text-white transition">Report</Link>
              <Link href="/map" className="text-gray-400 hover:text-white transition">Map</Link>
            </div>
          </div>
          <div className="text-center mt-8 pt-8 border-t border-gray-800">
            <p className="text-gray-400">© 2024 SafePaws. All rights reserved.</p>
            <p className="text-gray-500 text-sm mt-2">
              Committed to humane street dog management in compliance with Indian law.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
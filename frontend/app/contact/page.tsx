'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ContactPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900">🐾 SafePaws</Link>

          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-gray-900">Home</Link>
            <Link href="/report" className="text-red-600 font-medium">Report</Link>
            <Link href="/about" className="text-gray-700 hover:text-gray-900">About</Link>
            <Link href="/contact" className="text-gray-900 font-semibold">Contact</Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>☰</button>
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
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-16 space-y-16">

        {/* Header */}
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">
            Have questions, suggestions, or want to partner with us? We'd love to hear from you!
          </p>
        </section>

        {/* Contact Info */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">📩 General Inquiries</h2>
              <p className="text-gray-600">Email: contact@safepaws.org</p>
              <p className="text-gray-600">Support: support@safepaws.org</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">🤝 NGO Partnerships</h2>
              <p className="text-gray-600">Email: partnerships@safepaws.org</p>
              <p className="text-gray-600">Phone: +91-XXXX-XXXXXX</p>
              <p className="text-sm text-gray-500">Mon–Fri, 10 AM – 6 PM IST</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">📰 Media & Press</h2>
              <p className="text-gray-600">Email: media@safepaws.org</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">🛠 Technical Support</h2>
              <p className="text-gray-600">Email: tech@safepaws.org</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white shadow-lg rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full border p-3 rounded-lg" />
              <input type="email" placeholder="Email Address" className="w-full border p-3 rounded-lg" />
              <input type="tel" placeholder="Phone (optional)" className="w-full border p-3 rounded-lg" />

              <select className="w-full border p-3 rounded-lg">
                <option>General Inquiry</option>
                <option>NGO Partnership</option>
                <option>Technical Issue</option>
                <option>Other</option>
              </select>

              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full border p-3 rounded-lg"
              />

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
              >
                Submit Message
              </button>
            </form>
          </div>
        </section>

        {/* Emergency Section */}
        <section className="bg-red-50 border border-red-200 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-red-700 mb-4">🚨 Report an Emergency</h2>
          <ol className="list-decimal ml-6 space-y-2 text-gray-700">
            <li>Call your local municipal corporation immediately</li>
            <li>Submit a report on SafePaws with <b>Emergency</b> priority</li>
            <li>Contact local animal rescue services</li>
          </ol>

          <div className="mt-6">
            <h3 className="font-semibold">Emergency Contacts</h3>
            <ul className="mt-2 text-gray-600">
              <li>Delhi: 155304, 155305</li>
              <li>Mumbai: 1916</li>
              
            </ul>
          </div>
        </section>

        {/* Social Media */}
        <section className="text-center">
          <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
          <p className="text-gray-600 mb-4">Stay updated with our work and success stories</p>
          <div className="flex justify-center gap-6 text-blue-600 font-medium">
            <span>Twitter: @SafePawsIndia</span>
            <span>Instagram: @safepaws.india</span>
            <span>Facebook: /SafePawsIndia</span>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center space-y-4">
          <p className="text-gray-400">
            SafePaws © 2024 | Making our streets safer for everyone 🐾
          </p>
          <div className="flex justify-center gap-6 text-sm text-gray-400">
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/faq">FAQ</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

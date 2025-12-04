"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CldUploadWidget, CldImage } from 'next-cloudinary';

interface ReportFormData {
  location: string;
  description: string;
  dogCount: number;
  urgency: "low" | "medium" | "high" | "emergency";
  imageUrl?: string;
  imagePublicId?: string;
}

export default function ReportPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [reportId, setReportId] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [uploadResult, setUploadResult] = useState<any>(null);

  const [formData, setFormData] = useState<ReportFormData>({
    location: "",
    description: "",
    dogCount: 1,
    urgency: "medium",
    imageUrl: "",
    imagePublicId: ""
  });

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "dogCount" ? parseInt(value) || 1 : value
    }));
  };

  // Handle Cloudinary upload success
  const handleUploadSuccess = (result: any) => {
    console.log("Cloudinary upload success:", result);
    setUploadResult(result);
    
    if (result.info?.secure_url) {
      setFormData(prev => ({
        ...prev,
        imageUrl: result.info.secure_url,
        imagePublicId: result.info.public_id
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.location.trim() || !formData.description.trim()) {
      alert("Please fill in location and description");
      setLoading(false);
      return;
    }

    try {
      const reportData = {
        location: formData.location.trim(),
        description: formData.description.trim(),
        dogCount: formData.dogCount,
        urgency: formData.urgency,
        imageUrl: formData.imageUrl || "",
        imagePublicId: formData.imagePublicId || ""
      };

      console.log("Submitting report:", reportData);

      const response = await fetch("http://localhost:5000/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reportData),
      });

      const result = await response.json();

      if (result.success) {
        setReportId(result.reportId);
        setSubmitSuccess(true);
        
        setTimeout(() => {
          resetForm();
        }, 5000);
      } else {
        alert(`❌ Error: ${result.message}`);
      }
    } catch (error: any) {
      alert(`⚠️ Error: ${error.message || "Please try again"}`);
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      location: "",
      description: "",
      dogCount: 1,
      urgency: "medium",
      imageUrl: "",
      imagePublicId: ""
    });
    setUploadResult(null);
    setSubmitSuccess(false);
    setReportId("");
  };

  // Success modal
  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Navbar */}
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
                <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700">☰</button>
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

        {/* Success Modal */}
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">✅</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Report Submitted Successfully! 🎉</h1>
            <p className="text-gray-600 mb-6">
              Your report has been saved{formData.imageUrl && " with Cloudinary image"}.
            </p>
            
            {formData.imageUrl && (
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2">Uploaded Image:</p>
                <CldImage
                  src={formData.imagePublicId || formData.imageUrl}
                  width="200"
                  height="150"
                  alt="Uploaded dog photo"
                  className="rounded-lg mx-auto shadow-md"
                />
              </div>
            )}
            
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-500 mb-2">Report ID:</p>
              <p className="text-xl font-mono font-bold text-gray-800 bg-gray-100 p-3 rounded-lg">
                {reportId}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => router.push("/map")}
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition"
              >
                View on Map
              </button>
              <button
                onClick={resetForm}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-lg font-semibold transition"
              >
                Report Another
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navbar */}
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
              <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700">☰</button>
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

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Location Section */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">📍</span>
                    <label className="text-lg font-semibold text-gray-900">Location Details</label>
                  </div>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-lg"
                    placeholder="Where did you see the dog? (Street, park, area)"
                  />
                </div>

                {/* Description Section */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">📝</span>
                    <label className="text-lg font-semibold text-gray-900">Dog Description</label>
                  </div>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition resize-none"
                    placeholder="Describe the dog's appearance, condition, behavior, and any visible injuries..."
                  />
                </div>

                {/* Dog Count & Urgency */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">🐕</span>
                      <label className="text-lg font-semibold text-gray-900">Number of Dogs</label>
                    </div>
                    <select
                      name="dogCount"
                      value={formData.dogCount}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "dog" : "dogs"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">⚠️</span>
                      <label className="text-lg font-semibold text-gray-900">Urgency Level</label>
                    </div>
                    <select
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                    >
                      <option value="low">🟢 Low Priority - Just sighted</option>
                      <option value="medium">🟡 Medium Priority - Needs attention</option>
                      <option value="high">🔴 High Priority - Injured/Sick</option>
                      <option value="emergency">🚨 Emergency - Dangerous situation</option>
                    </select>
                  </div>
                </div>

                {/* Cloudinary Upload Widget */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">📸</span>
                    <label className="text-lg font-semibold text-gray-900">Photo Evidence</label>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Cloudinary</span>
                  </div>
                  
                  <CldUploadWidget
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                    options={{
                      sources: ['local', 'camera'],
                      multiple: false,
                      maxFiles: 1,
                      resourceType: 'image',
                      clientAllowedFormats: ['jpg', 'png', 'jpeg', 'webp'],
                      maxFileSize: 5000000, // 5MB
                      folder: 'safepaws/reports',
                      cropping: true,
                      croppingAspectRatio: 1,
                      showPoweredBy: false,
                      styles: {
                        palette: {
                          window: "#FFFFFF",
                          windowBorder: "#90A0B3",
                          tabIcon: "#0078FF",
                          menuIcons: "#5A616A",
                          textDark: "#000000",
                          textLight: "#FFFFFF",
                          link: "#0078FF",
                          action: "#FF620C",
                          inactiveTabIcon: "#0E2F5A",
                          error: "#F44235",
                          inProgress: "#0078FF",
                          complete: "#20B832",
                          sourceBg: "#E4EBF1"
                        }
                      }
                    }}
                    onSuccess={handleUploadSuccess}
                    onError={(error) => {
                      console.error('Cloudinary upload error:', error);
                      alert('Image upload failed. Please try again.');
                    }}
                  >
                    {({ open }) => {
                      return (
                        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 transition cursor-pointer bg-gray-50">
                          <button
                            type="button"
                            onClick={() => open()}
                            className="w-full h-full"
                          >
                            <div className="text-5xl mb-4">☁️</div>
                            <p className="text-gray-700 font-medium">Click to upload photo</p>
                            <p className="text-gray-500 text-sm mt-2">JPG, PNG up to 5MB</p>
                            <p className="text-gray-400 text-xs mt-1">Secure Cloudinary storage</p>
                          </button>
                          
                          {uploadResult && (
                            <div className="mt-6">
                              <p className="text-sm font-medium text-gray-700 mb-3">Uploaded Image:</p>
                              <CldImage
                                src={uploadResult.info.public_id}
                                width="200"
                                height="150"
                                alt="Uploaded preview"
                                className="rounded-lg mx-auto shadow-md"
                              />
                              <p className="text-green-600 text-sm mt-2">
                                ✓ Uploaded successfully! ({Math.round(uploadResult.info.bytes / 1024)}KB)
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    }}
                  </CldUploadWidget>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 transform hover:scale-[1.02] shadow-lg hover:shadow-xl text-white"
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Submitting Report...
                    </div>
                  ) : (
                    "🚨 Submit Report"
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column - Guidelines */}
          <div className="space-y-6">
            {/* Cloudinary Benefits */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg p-6 border border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">☁️</span> Powered by Cloudinary
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span className="text-gray-700">Automatic image optimization</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span className="text-gray-700">Fast global CDN delivery</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span className="text-gray-700">Secure cloud storage</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span className="text-gray-700">Built-in image editor</span>
                </li>
              </ul>
            </div>

            {/* Tips Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">📝</span> Photo Tips
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="mr-3">📱</span>
                  <span className="text-gray-700">Use good lighting for clear photos</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">🎯</span>
                  <span className="text-gray-700">Focus on the dog's face and injuries</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">🌳</span>
                  <span className="text-gray-700">Include landmarks for location context</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">⚠️</span>
                  <span className="text-gray-700">Keep safe distance if dog seems aggressive</span>
                </li>
              </ul>
            </div>

            {/* What Happens Next */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg p-6 border border-green-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">🔄</span> What Happens Next?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">1</div>
                  <div>
                    <p className="font-medium text-gray-800">Image Uploaded</p>
                    <p className="text-sm text-gray-600">Photo stored securely on Cloudinary</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">2</div>
                  <div>
                    <p className="font-medium text-gray-800">Report Created</p>
                    <p className="text-sm text-gray-600">Details saved to our database</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">3</div>
                  <div>
                    <p className="font-medium text-gray-800">NGO Alert</p>
                    <p className="text-sm text-gray-600">Nearby NGOs notified with photo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <div className="text-center text-gray-500 text-sm">
          <p>Images are securely stored on Cloudinary and optimized for fast loading.</p>
          <p className="mt-1">Thank you for helping stray dogs in need! 🐾</p>
        </div>
      </div>
    </div>
  );
}
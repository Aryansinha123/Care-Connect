/**
 * Page: /homes/[id]
 * 
 * User-facing page to view home details and all its requests
 * This page is for donors/users to see what each home needs
 */

'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";

export default function HomeDetailsPage({ params }) {
  const { id } = params;
  const [requests, setRequests] = useState([]);
  const [home, setHome] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch home details and requests
  useEffect(() => {
    async function fetchData() {
      try {
        const resHome = await fetch(`/api/homes/${id}`);
        const homeData = await resHome.json();
        setHome(homeData);

        const resReq = await fetch(`/api/homes/${id}/requests`);
        const reqData = await resReq.json();
        if (reqData.success) {
          setRequests(reqData.requests || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600 mx-auto mb-4"></div>
          <p className="text-xl font-medium text-purple-700">Loading home details...</p>
        </div>
      </div>
    );
  }

  if (!home) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Home Not Found</h2>
          <p className="text-gray-600 mb-4">The home you&apos;re looking for doesn&apos;t exist.</p>
          <button
            onClick={() => router.push("/")}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* <Navbar /> */}
      
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            {home.name}
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Home Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/20">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-xl text-white">🏡</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">About {home.name}</h2>
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-6">{home.description || "Providing care and support to those in need."}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                  <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                    <span className="text-white">📍</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-600">Location</p>
                    <p className="font-semibold text-gray-800">{home.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl border border-green-100">
                  <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                    <span className="text-white">📞</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-600">Contact</p>
                    <p className="font-semibold text-gray-800">{home.contact}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* All Requests List */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-xl text-white">📋</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Current Requests</h2>
                </div>
                <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                  {requests.length} {requests.length === 1 ? 'Request' : 'Requests'}
                </span>
              </div>
              
              {requests.length > 0 ? (
                <div className="space-y-4">
                  {requests.map((req) => (
                    <div
                      key={req._id}
                      className="group p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl border-2 border-purple-100 hover:border-purple-300 transition-all duration-200 hover:shadow-lg"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-purple-800 text-lg group-hover:text-purple-900">
                          {req.title}
                        </h3>
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            req.status === "active"
                              ? "bg-green-100 text-green-700 border border-green-200"
                              : "bg-gray-200 text-gray-600 border border-gray-300"
                          }`}
                        >
                          {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{req.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl text-gray-400">📝</span>
                  </div>
                  <p className="text-gray-500 text-lg mb-2">No requests yet</p>
                  <p className="text-gray-400 text-sm">Check back soon for updates</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/20 sticky top-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-xl text-white">💝</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800">Support Us</h2>
              </div>
              
              <div className="space-y-4">
                <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-2xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 hover:shadow-xl transform hover:-translate-y-0.5">
                  💰 Donate Money
                </button>
                
                <button 
                  onClick={() => router.push(`/homes/${id}/donate-item`)}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 rounded-2xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  📦 Donate Items
                </button>
                
                <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-2xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 hover:shadow-xl transform hover:-translate-y-0.5">
                  🤝 Volunteer
                </button>
              </div>
              
              <p className="text-center text-xs text-gray-500 mt-6">
                Every contribution makes a difference ✨
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

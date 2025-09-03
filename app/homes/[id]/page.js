// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";

// export default function HomeDetailsPage() {
//   const { id } = useParams();
//   const [home, setHome] = useState(null);
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         // Fetch home details
//         const homeRes = await fetch(`/api/homes/${id}`);
//         if (!homeRes.ok) throw new Error("Failed to fetch home");
//         const homeData = await homeRes.json();
//         setHome(homeData);

//         // Fetch requests for this home
//         const reqRes = await fetch(`/api/homes/${id}/requests`);
//         if (!reqRes.ok) throw new Error("Failed to fetch requests");
//         const reqData = await reqRes.json();
//         setRequests(reqData.requests || []);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     if (id) fetchData();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen text-lg text-gray-600">
//         Loading home details...
//       </div>
//     );
//   }

//   if (!home) {
//     return (
//       <div className="flex items-center justify-center min-h-screen text-red-500">
//         Home not found
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white py-10 px-6">
//       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
//         {/* Left Sidebar - Requests */}
//         <aside className="lg:col-span-1 bg-white shadow-md rounded-2xl p-6 border border-purple-100">
//           <h2 className="text-xl font-bold text-purple-700 mb-4">🌟 Featured Requests</h2>
//           {requests.length > 0 ? (
//             <ul className="space-y-4">
//               {requests.map((req, i) => (
//                 <li
//                   key={i}
//                   className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl shadow-sm border border-purple-100"
//                 >
//                   <p className="text-sm font-semibold text-purple-800">{req.title}</p>
//                   <p className="text-xs text-gray-600 mt-1">{req.description}</p>
//                   <span
//                     className={`mt-2 inline-block text-xs px-3 py-1 rounded-full ${
//                       req.status === "active"
//                         ? "bg-green-100 text-green-700"
//                         : "bg-gray-200 text-gray-600"
//                     }`}
//                   >
//                     {req.status}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-sm text-gray-500">No requests yet.</p>
//           )}
//         </aside>

//         {/* Main Content */}
//         <main className="lg:col-span-3 bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
//           <div className="flex flex-col lg:flex-row gap-8">
//             <div className="relative w-full lg:w-1/2 h-64 rounded-2xl overflow-hidden shadow-md">
//               <img
//                 src={home.imageUrl || "/default-home.jpg"}
//                 alt={home.name}
//                 className="w-full h-64 lg:h-80 rounded-2xl object-cover shadow-md"
//               />
//             </div>
//             <div className="flex-1">
//               <h1 className="text-3xl font-bold text-gray-800 mb-2">{home.name}</h1>
//               <p className="text-gray-600 mb-3">{home.description}</p>
//               <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
//                 <p>📍 <span className="font-semibold">{home.location}</span></p>
//                 <p>👥 Capacity: <span className="font-semibold">{home.capacity || "N/A"}</span></p>
//                 <p>📞 Contact: <span className="font-semibold">{home.contact}</span></p>
//               </div>
//             </div>
//           </div>

//           {/* Donation Section */}
//           <div className="mt-10">
//             <h2 className="text-2xl font-bold text-purple-700 mb-4">💝 Support {home.name}</h2>
//             <p className="text-gray-600 mb-6">
//               Your contributions make a real difference. Choose how you’d like to help:
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4">
//               <button className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-md">
//                 Donate Money
//               </button>
//               <button className="flex-1 py-3 bg-gradient-to-r from-green-400 to-teal-500 text-white rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-md">
//                 Donate Items
//               </button>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function HomeDetailsPage() {
  const { id } = useParams();
  const [home, setHome] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch home details
        const homeRes = await fetch(`/api/homes/${id}`);
        if (!homeRes.ok) throw new Error("Failed to fetch home");
        const homeData = await homeRes.json();
        setHome(homeData);

        // Fetch requests for this home
        const reqRes = await fetch(`/api/homes/${id}/requests`);
        if (!reqRes.ok) throw new Error("Failed to fetch requests");
        const reqData = await reqRes.json();
        setRequests(reqData.requests || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-violet-200 border-t-violet-600 mx-auto mb-4"></div>
          <p className="text-xl font-medium text-violet-700">Loading home details...</p>
        </div>
      </div>
    );
  }

  if (!home) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-3xl p-8 shadow-xl border border-red-100">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🏠</span>
          </div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">Home Not Found</h2>
          <p className="text-gray-600">The home you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            {home.name}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-violet-400 to-pink-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Left Sidebar - Requests */}
          <aside className="xl:col-span-1 order-2 xl:order-1">
            <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-6 border border-white/20 sticky top-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center mr-3">
                  <span className="text-white text-lg">🌟</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800">Featured Requests</h2>
              </div>
              
              {requests.length > 0 ? (
                <div className="space-y-4">
                  {requests.map((req, i) => (
                    <div
                      key={i}
                      className="group p-4 bg-gradient-to-br from-white to-violet-50/50 rounded-2xl shadow-sm border border-violet-100/60 hover:shadow-lg hover:border-violet-200 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-800 group-hover:text-violet-700 transition-colors">{req.title}</h3>
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-medium ${
                            req.status === "active"
                              ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                              : "bg-gray-100 text-gray-600 border border-gray-200"
                          }`}
                        >
                          {req.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{req.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📋</span>
                  </div>
                  <p className="text-gray-500 font-medium">No requests yet</p>
                  <p className="text-sm text-gray-400 mt-1">Check back soon for updates</p>
                </div>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <main className="xl:col-span-3 order-1 xl:order-2">
            <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl overflow-hidden border border-white/20">
              {/* Image and Basic Info */}
              <div className="p-8 pb-0">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Image */}
                  <div className="relative lg:w-1/2">
                    <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/50">
                      <img
                        src={home.imageUrl || "/default-home.jpg"}
                        alt={home.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-r from-violet-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl">
                      <span className="text-white text-2xl">🏠</span>
                    </div>
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1 lg:pt-4">
                    <p className="text-lg text-gray-700 leading-relaxed mb-6 font-medium">{home.description}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                        <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                          <span className="text-white">📍</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-blue-600">Location</p>
                          <p className="font-semibold text-gray-800">{home.location}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
                        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                          <span className="text-white">👥</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-emerald-600">Capacity</p>
                          <p className="font-semibold text-gray-800">{home.capacity || "N/A"}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-100 sm:col-span-2">
                        <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
                          <span className="text-white">📞</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-amber-600">Contact</p>
                          <p className="font-semibold text-gray-800">{home.contact}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Donation Section */}
              <div className="p-8 pt-12">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center">
                      <span className="text-white text-xl">💝</span>
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                      Support {home.name}
                    </h2>
                  </div>
                  <p className="text-gray-600 text-lg font-medium max-w-2xl mx-auto">
                    Your contributions make a real difference in people's lives. Choose how you'd like to help make an impact.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-6 max-w-2xl mx-auto">
                  <button className="group flex-1 relative overflow-hidden bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white rounded-3xl p-6 font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-white/20">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center space-x-3">
                      <span className="text-2xl">💰</span>
                      <span>Donate Money</span>
                    </div>
                  </button>
                  
                  <button className="group flex-1 relative overflow-hidden bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white rounded-3xl p-6 font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-white/20">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center space-x-3">
                      <span className="text-2xl">📦</span>
                      <span>Donate Items</span>
                    </div>
                  </button>
                </div>
                
                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-500 font-medium">
                    Every contribution, no matter the size, helps create positive change ✨
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
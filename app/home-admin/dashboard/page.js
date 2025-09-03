// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function HomeAdminDashboard() {
//     const [admin, setAdmin] = useState(null);
//     const [requests, setRequests] = useState([]);
//     const [newRequest, setNewRequest] = useState({ title: "", description: "" });
//     const router = useRouter();

//     //   useEffect(() => {
//     //     const storedAdmin = localStorage.getItem("homeAdmin");
//     //     if (!storedAdmin) {
//     //       router.push("/home-admin/login");
//     //     } else {
//     //       const adminData = JSON.parse(storedAdmin);
//     //       setAdmin(adminData);

//     //       fetchRequests(adminData.home._id);
//     //     }
//     //   }, []);

//     //   async function fetchRequests(id) {
//     //     const res = await fetch(`/api/homes/${id}/requests`);
//     //     const data = await res.json();
//     //     if (data.success) setRequests(data.requests);
//     //   }

//     //   async function handleCreateRequest(e) {
//     //     e.preventDefault();
//     //     const res = await fetch(`/api/homes/${admin.home._id}/requests`, {
//     //       method: "POST",
//     //       headers: { "Content-Type": "application/json" },
//     //       body: JSON.stringify({ ...newRequest, homeAdmin: admin.id }),
//     //     });
//     //     const data = await res.json();
//     //     if (data.success) {
//     //       setRequests((prev) => [...prev, data.request]);
//     //       setNewRequest({ title: "", description: "" });
//     //     }
//     //   }

//     async function fetchRequests(id, token) {
//         const res = await fetch(`/api/homes/${id}/requests`, {
//             headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await res.json();
//         if (data.success) setRequests(data.requests);
//     }

//     useEffect(() => {
//         const storedAdmin = localStorage.getItem("homeAdmin");
//         const token = localStorage.getItem("homeAdminToken");

//         if (!storedAdmin || !token) {
//             router.push("/home-admin/login");
//         } else {
//             const adminData = JSON.parse(storedAdmin);
//             setAdmin(adminData);

//             fetchRequests(adminData.home._id, token);
//         }
//     }, []);

//     async function handleCreateRequest(e) {
//         e.preventDefault();
//         const token = localStorage.getItem("homeAdminToken");

//         const res = await fetch(`/api/homes/${admin.home._id}/requests`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({ ...newRequest }),
//         });
//         const data = await res.json();
//         if (data.success) {
//             setRequests((prev) => [...prev, data.request]);
//             setNewRequest({ title: "", description: "" });
//         }
//     }

//     if (!admin) return null;

//     return (
//         <div className="min-h-screen bg-gray-50 p-8">
//             <h1 className="text-3xl font-bold text-purple-700 mb-6">🏠 HomeAdmin Dashboard</h1>

//             {/* Admin Details */}
//             <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
//                 <h2 className="text-xl font-semibold">{admin.name}</h2>
//                 <p className="text-gray-600">{admin.email}</p>
//             </div>

//             {/* Home Details */}
//             <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
//                 <h2 className="text-xl font-semibold">{admin.home.name}</h2>
//                 <p className="text-gray-600">{admin.home.description}</p>
//                 <p className="text-sm mt-2">📍 {admin.home.location}</p>
//             </div>

//             {/* Create Request */}
//             <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
//                 <h3 className="text-lg font-semibold mb-4">➕ Create New Request</h3>
//                 <form onSubmit={handleCreateRequest} className="space-y-4">
//                     <input
//                         type="text"
//                         placeholder="Request title"
//                         value={newRequest.title}
//                         onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
//                         className="w-full p-3 border rounded-xl"
//                         required
//                     />
//                     <textarea
//                         placeholder="Request description"
//                         value={newRequest.description}
//                         onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
//                         className="w-full p-3 border rounded-xl"
//                         required
//                     />
//                     <button
//                         type="submit"
//                         className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700"
//                     >
//                         Create Request
//                     </button>
//                 </form>
//             </div>

//             {/* Requests List */}
//             <div className="bg-white p-6 rounded-2xl shadow-md">
//                 <h3 className="text-lg font-semibold mb-4">📋 Your Requests</h3>
//                 {requests.length > 0 ? (
//                     <ul className="space-y-3">
//                         {requests.map((req) => (
//                             <li
//                                 key={req._id}
//                                 className="p-4 bg-purple-50 rounded-xl border border-purple-100"
//                             >
//                                 <p className="font-semibold text-purple-800">{req.title}</p>
//                                 <p className="text-sm text-gray-600">{req.description}</p>
//                                 <span
//                                     className={`text-xs px-2 py-1 mt-2 inline-block rounded-full ${req.status === "active"
//                                             ? "bg-green-100 text-green-700"
//                                             : "bg-gray-200 text-gray-600"
//                                         }`}
//                                 >
//                                     {req.status}
//                                 </span>
//                             </li>
//                         ))}
//                     </ul>
//                 ) : (
//                     <p className="text-sm text-gray-500">No requests yet.</p>
//                 )}
//             </div>
//         </div>
//     );
// }
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomeAdminDashboard() {
    const [admin, setAdmin] = useState(null);
    const [requests, setRequests] = useState([]);
    const [newRequest, setNewRequest] = useState({ title: "", description: "" });
    const router = useRouter();

    async function fetchRequests(id, token) {
        const res = await fetch(`/api/homes/${id}/requests`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) setRequests(data.requests);
    }

    useEffect(() => {
        const storedAdmin = localStorage.getItem("homeAdmin");
        const token = localStorage.getItem("homeAdminToken");

        if (!storedAdmin || !token) {
            router.push("/home-admin/login");
        } else {
            const adminData = JSON.parse(storedAdmin);
            setAdmin(adminData);

            fetchRequests(adminData.home._id, token);
        }
    }, []);

    async function handleCreateRequest(e) {
        e.preventDefault();
        const token = localStorage.getItem("homeAdminToken");

        const res = await fetch(`/api/homes/${admin.home._id}/requests`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ ...newRequest }),
        });
        const data = await res.json();
        if (data.success) {
            setRequests((prev) => [...prev, data.request]);
            setNewRequest({ title: "", description: "" });
        }
    }

    if (!admin) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                        🏠 HomeAdmin Dashboard
                    </h1>
                    <p className="text-gray-600 text-lg">Manage your home and service requests</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Admin & Home Info */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Admin Profile Card */}
                        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                                    <span className="text-2xl text-white font-bold">
                                        {admin.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">{admin.name}</h2>
                                    <p className="text-gray-500 text-sm">Administrator</p>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-xl">
                                <p className="text-gray-600 text-sm flex items-center">
                                    <span className="mr-2">✉️</span>
                                    {admin.email}
                                </p>
                            </div>
                        </div>

                        {/* Home Details Card */}
                        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center mr-4">
                                    <span className="text-xl">🏡</span>
                                </div>
                                <h2 className="text-xl font-bold text-gray-800">Property Details</h2>
                            </div>
                            <div className="space-y-3">
                                <h3 className="font-semibold text-lg text-gray-800">{admin.home.name}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{admin.home.description}</p>
                                <div className="flex items-center text-sm text-gray-500 bg-gray-50 p-3 rounded-xl">
                                    <span className="mr-2">📍</span>
                                    {admin.home.location}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Requests */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Create Request Card */}
                        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/20">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mr-4">
                                    <span className="text-xl text-white">➕</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">Create New Request</h3>
                            </div>
                            <form onSubmit={handleCreateRequest} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Request Title</label>
                                    <input
                                        type="text"
                                        placeholder="Enter request title..."
                                        value={newRequest.title}
                                        onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
                                        className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none transition-colors duration-200 bg-white/50 backdrop-blur-sm"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        placeholder="Describe your request in detail..."
                                        value={newRequest.description}
                                        onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                                        className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none transition-colors duration-200 bg-white/50 backdrop-blur-sm min-h-[120px] resize-none"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                >
                                    Create Request
                                </button>
                            </form>
                        </div>

                        {/* Requests List Card */}
                        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/20">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                                        <span className="text-xl text-white">📋</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800">Your Requests</h3>
                                </div>
                                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                                    {requests.length} {requests.length === 1 ? 'Request' : 'Requests'}
                                </span>
                            </div>
                            
                            {requests.length > 0 ? (
                                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                                    {requests.map((req, index) => (
                                        <div
                                            key={req._id}
                                            className="group p-5 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl border-2 border-purple-100 hover:border-purple-300 transition-all duration-200 hover:shadow-lg"
                                        >
                                            <div className="flex justify-between items-start mb-3">
                                                <h4 className="font-bold text-purple-800 text-lg group-hover:text-purple-900">
                                                    {req.title}
                                                </h4>
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
                                            <p className="text-gray-700 text-sm leading-relaxed mb-3">{req.description}</p>
                                            <div className="flex justify-between items-center text-xs text-gray-500">
                                                <span>Request #{index + 1}</span>
                                                <div className="flex items-center">
                                                    <div className={`w-2 h-2 rounded-full mr-2 ${
                                                        req.status === "active" ? "bg-green-400" : "bg-gray-400"
                                                    }`}></div>
                                                    {req.status === "active" ? "Active" : "Inactive"}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-3xl text-gray-400">📝</span>
                                    </div>
                                    <p className="text-gray-500 text-lg mb-2">No requests yet</p>
                                    <p className="text-gray-400 text-sm">Create your first request to get started</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
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
import { verifyHomeAdminToken } from "@/lib/authUtils";
import { LogOut } from "lucide-react";

export default function HomeAdminDashboard() {
    const [admin, setAdmin] = useState(null);
    const [requests, setRequests] = useState([]);
    const [donations, setDonations] = useState([]);
    const [newRequest, setNewRequest] = useState({ title: "", description: "" });
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [donationsLoading, setDonationsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('requests'); // 'requests' or 'donations'
    const router = useRouter();

    async function fetchRequests(id, token) {
        const res = await fetch(`/api/homes/${id}/requests`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) setRequests(data.requests);
    }

    async function fetchDonations(token) {
        setDonationsLoading(true);
        try {
            const res = await fetch(`/api/donations`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.success) setDonations(data.donations || []);
        } catch (error) {
            console.error("Error fetching donations:", error);
        } finally {
            setDonationsLoading(false);
        }
    }

    async function updateDonationStatus(donationId, newStatus) {
        try {
            const token = localStorage.getItem("homeAdminToken");
            const res = await fetch(`/api/donations/${donationId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });
            const data = await res.json();
            if (data.success) {
                // Update local state
                setDonations((prev) =>
                    prev.map((donation) =>
                        donation._id === donationId
                            ? { ...donation, status: newStatus }
                            : donation
                    )
                );
            } else {
                alert(data.message || "Failed to update donation status");
            }
        } catch (error) {
            console.error("Error updating donation status:", error);
            alert("An error occurred while updating donation status");
        }
    }

    useEffect(() => {
        // Verify token validity
        if (!verifyHomeAdminToken()) {
            router.push("/home-admin/login");
            return;
        }

        const storedAdmin = localStorage.getItem("homeAdmin");
        const token = localStorage.getItem("homeAdminToken");

        if (!storedAdmin || !token) {
            router.push("/home-admin/login");
            return;
        }

        try {
            const adminData = JSON.parse(storedAdmin);
            setAdmin(adminData);
            setIsAuthenticated(true);
            fetchRequests(adminData.home._id, token);
        } catch (error) {
            console.error("Error parsing admin data:", error);
            router.push("/home-admin/login");
        }
    }, [router]);

    // Fetch donations when donations tab is active
    useEffect(() => {
        if (isAuthenticated && activeTab === 'donations') {
            const token = localStorage.getItem("homeAdminToken");
            if (token) {
                fetchDonations(token);
            }
        }
    }, [isAuthenticated, activeTab]);

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

    const handleLogout = () => {
        localStorage.removeItem("homeAdminToken");
        localStorage.removeItem("homeAdmin");
        router.push("/home-admin/login");
    };

    // Show loading state while checking authentication
    if (!isAuthenticated || !admin) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Verifying authentication...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Header */}
                <div className="relative text-center mb-10">
                    <button
                        onClick={handleLogout}
                        className="absolute top-0 right-0 flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm md:text-base"
                    >
                        <LogOut className="w-4 h-4" />
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4 pr-20 md:pr-0">
                        🏠 HomeAdmin Dashboard
                    </h1>
                    <p className="text-gray-600 text-base md:text-lg">Manage your home and service requests</p>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-6 border-b border-purple-200">
                    <button
                        onClick={() => setActiveTab('requests')}
                        className={`px-6 py-3 font-semibold transition-colors duration-200 ${
                            activeTab === 'requests'
                                ? 'text-purple-600 border-b-2 border-purple-600'
                                : 'text-gray-600 hover:text-gray-800'
                        }`}
                    >
                        Requests
                    </button>
                    <button
                        onClick={() => setActiveTab('donations')}
                        className={`px-6 py-3 font-semibold transition-colors duration-200 ${
                            activeTab === 'donations'
                                ? 'text-purple-600 border-b-2 border-purple-600'
                                : 'text-gray-600 hover:text-gray-800'
                        }`}
                    >
                        Donations
                    </button>
                </div>

                {activeTab === 'requests' ? (
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
                                        className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none transition-colors duration-200 bg-white/50 backdrop-blur-sm text-black"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        placeholder="Describe your request in detail..."
                                        value={newRequest.description}
                                        onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                                        className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none transition-colors duration-200 bg-white/50 backdrop-blur-sm min-h-[120px] resize-none text-black"
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
                ) : (
                    /* Donations Tab */
                    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/20">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center mr-4">
                                    <span className="text-xl text-white">🎁</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">Item Donations</h3>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => {
                                        const token = localStorage.getItem("homeAdminToken");
                                        if (token) {
                                            fetchDonations(token);
                                        }
                                    }}
                                    disabled={donationsLoading}
                                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
                                >
                                    <svg 
                                        className={`w-5 h-5 ${donationsLoading ? 'animate-spin' : ''}`} 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    {donationsLoading ? 'Refreshing...' : 'Refresh'}
                                </button>
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                    {donations.length} {donations.length === 1 ? 'Donation' : 'Donations'}
                                </span>
                            </div>
                        </div>

                        {donationsLoading ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                <p className="text-gray-600">Loading donations...</p>
                            </div>
                        ) : donations.length > 0 ? (
                            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                                {donations.map((donation) => (
                                    <div
                                        key={donation._id}
                                        className="group p-5 bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl border-2 border-green-100 hover:border-green-300 transition-all duration-200 hover:shadow-lg"
                                    >
                                        <div className="flex items-start gap-4">
                                            {donation.imageUrl && (
                                                <img
                                                    src={donation.imageUrl}
                                                    alt={donation.itemName}
                                                    className="w-20 h-20 object-cover rounded-xl border-2 border-green-200"
                                                />
                                            )}
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div>
                                                        <h4 className="font-bold text-green-800 text-lg group-hover:text-green-900">
                                                            {donation.itemName}
                                                        </h4>
                                                        <p className="text-sm text-gray-600 mt-1">
                                                            Category: <span className="font-medium">{donation.category}</span> • 
                                                            Quantity: <span className="font-medium">{donation.quantity}</span>
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-col items-end gap-2">
                                                        <select
                                                            value={donation.status}
                                                            onChange={(e) => updateDonationStatus(donation._id, e.target.value)}
                                                            className={`px-3 py-1 text-xs font-semibold rounded-full border-2 ${
                                                                donation.status === 'Completed'
                                                                    ? 'bg-green-100 text-green-700 border-green-200'
                                                                    : donation.status === 'Accepted'
                                                                    ? 'bg-blue-100 text-blue-700 border-blue-200'
                                                                    : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                                                            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                                                        >
                                                            <option value="Pending">Pending</option>
                                                            <option value="Accepted">Accepted</option>
                                                            <option value="Completed">Completed</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <p className="text-gray-700 text-sm leading-relaxed mb-3">{donation.description}</p>
                                                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                                                    <span className="flex items-center">
                                                        <span className="mr-1">📍</span>
                                                        {donation.pickupAddress}
                                                    </span>
                                                    {donation.donorName && (
                                                        <span className="flex items-center">
                                                            <span className="mr-1">👤</span>
                                                            {donation.donorName}
                                                        </span>
                                                    )}
                                                    <span className="flex items-center">
                                                        <span className="mr-1">📅</span>
                                                        {new Date(donation.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl text-gray-400">🎁</span>
                                </div>
                                <p className="text-gray-500 text-lg mb-2">No donations yet</p>
                                <p className="text-gray-400 text-sm">Donations for your home will appear here</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
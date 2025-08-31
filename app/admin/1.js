// // // "use client";
// // // import { useEffect, useState } from "react";

// // // export default function AdminDashboard() {
// // //   const [homes, setHomes] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);

// // //   const [newHome, setNewHome] = useState({ name: "", location: "", description: "" });
// // //   const [editingHome, setEditingHome] = useState(null);

// // //   // 🔹 Fetch all homes
// // //   const fetchHomes = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const res = await fetch("/api/admin/homes");
// // //       if (!res.ok) throw new Error("Failed to fetch homes");
// // //       const data = await res.json();

// // //       // Ensure data is always an array
// // //       setHomes(Array.isArray(data) ? data : []);
// // //     } catch (err) {
// // //       setError(err.message);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // 🔹 Add a new home
// // //   const addHome = async () => {
// // //     try {
// // //       const res = await fetch("/api/admin/homes", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify(newHome),
// // //       });
// // //       if (!res.ok) throw new Error("Failed to add home");
// // //       setNewHome({ name: "", location: "", description: "" });
// // //       fetchHomes();
// // //     } catch (err) {
// // //       alert(err.message);
// // //     }
// // //   };

// // //   // 🔹 Update an existing home
// // //   const updateHome = async (id) => {
// // //     try {
// // //       const res = await fetch(`/api/admin/homes/${id}`, {
// // //         method: "PUT",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify(editingHome),
// // //       });
// // //       if (!res.ok) throw new Error("Failed to update home");
// // //       setEditingHome(null);
// // //       fetchHomes();
// // //     } catch (err) {
// // //       alert(err.message);
// // //     }
// // //   };

// // //   // 🔹 Delete a home
// // //   const deleteHome = async (id) => {
// // //     if (!confirm("Are you sure you want to delete this home?")) return;
// // //     try {
// // //       const res = await fetch(`/api/admin/homes/${id}`, { method: "DELETE" });
// // //       if (!res.ok) throw new Error("Failed to delete home");
// // //       fetchHomes();
// // //     } catch (err) {
// // //       alert(err.message);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchHomes();
// // //   }, []);

// // //   if (loading) return <p className="p-4">Loading homes...</p>;
// // //   if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

// // //   return (
// // //     <div className="p-6 max-w-4xl mx-auto">
// // //       <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

// // //       {/* 🔹 Add new home form */}
// // //       <div className="mb-8 p-4 border rounded-lg shadow">
// // //         <h2 className="text-xl font-semibold mb-3">Add New Home</h2>
// // //         <input
// // //           type="text"
// // //           placeholder="Name"
// // //           value={newHome.name}
// // //           onChange={(e) => setNewHome({ ...newHome, name: e.target.value })}
// // //           className="border p-2 mr-2 rounded"
// // //         />
// // //         <input
// // //           type="text"
// // //           placeholder="Location"
// // //           value={newHome.location}
// // //           onChange={(e) => setNewHome({ ...newHome, location: e.target.value })}
// // //           className="border p-2 mr-2 rounded"
// // //         />
// // //         <input
// // //           type="text"
// // //           placeholder="Description"
// // //           value={newHome.description}
// // //           onChange={(e) => setNewHome({ ...newHome, description: e.target.value })}
// // //           className="border p-2 mr-2 rounded"
// // //         />
// // //         <button
// // //           onClick={addHome}
// // //           className="bg-blue-500 text-white px-4 py-2 rounded"
// // //         >
// // //           Add Home
// // //         </button>
// // //       </div>

// // //       {/* 🔹 Homes list */}
// // //       <h2 className="text-2xl font-semibold mb-4">All Homes</h2>
// // //       <div className="grid gap-4">
// // //         {homes.map((home) => (
// // //           <div key={home._id} className="p-4 border rounded-lg shadow">
// // //             {editingHome && editingHome._id === home._id ? (
// // //               // 🔹 Edit mode
// // //               <div>
// // //                 <input
// // //                   type="text"
// // //                   value={editingHome.name}
// // //                   onChange={(e) =>
// // //                     setEditingHome({ ...editingHome, name: e.target.value })
// // //                   }
// // //                   className="border p-2 mr-2 rounded"
// // //                 />
// // //                 <input
// // //                   type="text"
// // //                   value={editingHome.location}
// // //                   onChange={(e) =>
// // //                     setEditingHome({ ...editingHome, location: e.target.value })
// // //                   }
// // //                   className="border p-2 mr-2 rounded"
// // //                 />
// // //                 <input
// // //                   type="text"
// // //                   value={editingHome.description}
// // //                   onChange={(e) =>
// // //                     setEditingHome({ ...editingHome, description: e.target.value })
// // //                   }
// // //                   className="border p-2 mr-2 rounded"
// // //                 />
// // //                 <button
// // //                   onClick={() => updateHome(home._id)}
// // //                   className="bg-green-500 text-white px-3 py-1 rounded mr-2"
// // //                 >
// // //                   Save
// // //                 </button>
// // //                 <button
// // //                   onClick={() => setEditingHome(null)}
// // //                   className="bg-gray-400 text-white px-3 py-1 rounded"
// // //                 >
// // //                   Cancel
// // //                 </button>
// // //               </div>
// // //             ) : (
// // //               // 🔹 Display mode
// // //               <div>
// // //                 <h3 className="text-lg font-bold">{home.name}</h3>
// // //                 <p>{home.location}</p>
// // //                 <p>{home.description}</p>
// // //                 <div className="mt-2">
// // //                   <button
// // //                     onClick={() => setEditingHome(home)}
// // //                     className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
// // //                   >
// // //                     Edit
// // //                   </button>
// // //                   <button
// // //                     onClick={() => deleteHome(home._id)}
// // //                     className="bg-red-500 text-white px-3 py-1 rounded"
// // //                   >
// // //                     Delete
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             )}
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // "use client"
// // import { useEffect, useState } from "react";
// // import { Plus, Edit2, Trash2, Save, X, Home, MapPin, FileText, Check, AlertCircle, Info } from "lucide-react";

// // // Toast Component
// // const Toast = ({ message, type, onClose }) => {
// //   useEffect(() => {
// //     const timer = setTimeout(onClose, 3000);
// //     return () => clearTimeout(timer);
// //   }, [onClose]);

// //   const getToastStyles = () => {
// //     switch (type) {
// //       case 'success':
// //         return 'bg-green-500 border-green-400';
// //       case 'error':
// //         return 'bg-red-500 border-red-400';
// //       case 'info':
// //         return 'bg-blue-500 border-blue-400';
// //       default:
// //         return 'bg-gray-500 border-gray-400';
// //     }
// //   };

// //   const getIcon = () => {
// //     switch (type) {
// //       case 'success':
// //         return <Check className="w-5 h-5" />;
// //       case 'error':
// //         return <AlertCircle className="w-5 h-5" />;
// //       case 'info':
// //         return <Info className="w-5 h-5" />;
// //       default:
// //         return <Info className="w-5 h-5" />;
// //     }
// //   };

// //   return (
// //     <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 text-white px-4 py-3 rounded-lg shadow-lg border ${getToastStyles()} transform transition-all duration-300 ease-in-out`}>
// //       {getIcon()}
// //       <span>{message}</span>
// //       <button onClick={onClose} className="ml-2 hover:opacity-70">
// //         <X className="w-4 h-4" />
// //       </button>
// //     </div>
// //   );
// // };

// // // Mock API functions (replace with actual API calls)
// // const mockAPI = {
// //   async getHomes() {
// //     // Simulate API delay
// //     await new Promise(resolve => setTimeout(resolve, 800));
    
// //     // Mock data - replace with actual API call
// //     return [
// //       {
// //         _id: "1",
// //         name: "Sunset Villa",
// //         location: "Malibu, CA",
// //         description: "Luxurious beachfront property with stunning ocean views and modern amenities."
// //       },
// //       {
// //         _id: "2", 
// //         name: "Mountain Lodge",
// //         location: "Aspen, CO",
// //         description: "Cozy mountain retreat perfect for ski enthusiasts and nature lovers."
// //       },
// //       {
// //         _id: "3",
// //         name: "Urban Loft",
// //         location: "New York, NY", 
// //         description: "Modern downtown loft with city skyline views and premium finishes."
// //       }
// //     ];
// //   },

// //   async addHome(homeData) {
// //     await new Promise(resolve => setTimeout(resolve, 500));
// //     // Simulate successful creation
// //     return {
// //       _id: Date.now().toString(),
// //       ...homeData
// //     };
// //   },

// //   async updateHome(id, homeData) {
// //     await new Promise(resolve => setTimeout(resolve, 500));
// //     // Simulate successful update
// //     return { _id: id, ...homeData };
// //   },

// //   async deleteHome(id) {
// //     await new Promise(resolve => setTimeout(resolve, 500));
// //     // Simulate successful deletion
// //     return { success: true };
// //   }
// // };

// // export default function AdminDashboard() {
// //   const [homes, setHomes] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [actionLoading, setActionLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [toasts, setToasts] = useState([]);

// //   const [newHome, setNewHome] = useState({ name: "", location: "", description: "" });
// //   const [editingHome, setEditingHome] = useState(null);
// //   const [showAddForm, setShowAddForm] = useState(false);

// //   // Toast management
// //   const addToast = (message, type = 'info') => {
// //     const id = Date.now();
// //     setToasts(prev => [...prev, { id, message, type }]);
// //   };

// //   const removeToast = (id) => {
// //     setToasts(prev => prev.filter(toast => toast.id !== id));
// //   };

// //   // Fetch all homes
// //   const fetchHomes = async () => {
// //     try {
// //       setLoading(true);
// //       setError(null);
      
// //       // Replace this with actual API call: const res = await fetch("/api/admin/homes");
// //       const data = await mockAPI.getHomes();
// //       setHomes(Array.isArray(data) ? data : []);
      
// //     } catch (err) {
// //       setError(err.message);
// //       addToast('Failed to fetch homes', 'error');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Add a new home
// //   const addHome = async () => {
// //     if (!newHome.name.trim() || !newHome.location.trim()) {
// //       addToast('Name and location are required', 'error');
// //       return;
// //     }

// //     try {
// //       setActionLoading(true);
      
// //       // Replace with actual API call:
// //       // const res = await fetch("/api/admin/homes", {
// //       //   method: "POST",
// //       //   headers: { "Content-Type": "application/json" },
// //       //   body: JSON.stringify(newHome),
// //       // });
// //       // if (!res.ok) throw new Error("Failed to add home");
      
// //       await mockAPI.addHome(newHome);
      
// //       setNewHome({ name: "", location: "", description: "" });
// //       setShowAddForm(false);
// //       addToast('Home added successfully!', 'success');
// //       fetchHomes();
// //     } catch (err) {
// //       addToast(`Error adding home: ${err.message}`, 'error');
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   // Update an existing home
// //   const updateHome = async (id) => {
// //     if (!editingHome.name.trim() || !editingHome.location.trim()) {
// //       addToast('Name and location are required', 'error');
// //       return;
// //     }

// //     try {
// //       setActionLoading(true);
      
// //       // Replace with actual API call:
// //       // const res = await fetch(`/api/admin/homes/${id}`, {
// //       //   method: "PUT", 
// //       //   headers: { "Content-Type": "application/json" },
// //       //   body: JSON.stringify(editingHome),
// //       // });
// //       // if (!res.ok) throw new Error("Failed to update home");
      
// //       await mockAPI.updateHome(id, editingHome);
      
// //       setEditingHome(null);
// //       addToast('Home updated successfully!', 'success');
// //       fetchHomes();
// //     } catch (err) {
// //       addToast(`Error updating home: ${err.message}`, 'error');
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   // Delete a home
// //   const deleteHome = async (id) => {
// //     try {
// //       setActionLoading(true);
      
// //       // Replace with actual API call:
// //       // const res = await fetch(`/api/admin/homes/${id}`, { method: "DELETE" });
// //       // if (!res.ok) throw new Error("Failed to delete home");
      
// //       await mockAPI.deleteHome(id);
      
// //       addToast('Home deleted successfully!', 'success');
// //       fetchHomes();
// //     } catch (err) {
// //       addToast(`Error deleting home: ${err.message}`, 'error');
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   const handleDeleteClick = (id, name) => {
// //     if (window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
// //       deleteHome(id);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchHomes();
// //   }, []);

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* Toast Container */}
// //       <div className="fixed top-0 right-0 z-50 p-4 space-y-2">
// //         {toasts.map(toast => (
// //           <Toast
// //             key={toast.id}
// //             message={toast.message}
// //             type={toast.type}
// //             onClose={() => removeToast(toast.id)}
// //           />
// //         ))}
// //       </div>

// //       {/* Header */}
// //       <div className="bg-white shadow-sm border-b">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex justify-between items-center py-6">
// //             <div className="flex items-center gap-3">
// //               <div className="p-2 bg-blue-600 rounded-lg">
// //                 <Home className="w-6 h-6 text-white" />
// //               </div>
// //               <div>
// //                 <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
// //                 <p className="text-sm text-gray-500">Manage your property listings</p>
// //               </div>
// //             </div>
            
// //             <button
// //               onClick={() => setShowAddForm(!showAddForm)}
// //               className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 shadow-sm"
// //             >
// //               <Plus className="w-4 h-4" />
// //               Add New Home
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //         {/* Add New Home Form */}
// //         {showAddForm && (
// //           <div className="bg-white rounded-xl shadow-sm border mb-8 overflow-hidden">
// //             <div className="bg-gray-50 px-6 py-4 border-b">
// //               <h2 className="text-lg font-semibold text-gray-900">Add New Home</h2>
// //             </div>
// //             <div className="p-6">
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Home Name *
// //                   </label>
// //                   <input
// //                     type="text"
// //                     placeholder="Enter home name"
// //                     value={newHome.name}
// //                     onChange={(e) => setNewHome({ ...newHome, name: e.target.value })}
// //                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Location *
// //                   </label>
// //                   <input
// //                     type="text"
// //                     placeholder="Enter location"
// //                     value={newHome.location}
// //                     onChange={(e) => setNewHome({ ...newHome, location: e.target.value })}
// //                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
// //                   />
// //                 </div>
// //               </div>
// //               <div className="mb-4">
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Description
// //                 </label>
// //                 <textarea
// //                   placeholder="Enter description"
// //                   value={newHome.description}
// //                   onChange={(e) => setNewHome({ ...newHome, description: e.target.value })}
// //                   rows={3}
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
// //                 />
// //               </div>
// //               <div className="flex gap-3">
// //                 <button
// //                   onClick={addHome}
// //                   disabled={actionLoading}
// //                   className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg transition-colors duration-200"
// //                 >
// //                   {actionLoading ? (
// //                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
// //                   ) : (
// //                     <Plus className="w-4 h-4" />
// //                   )}
// //                   {actionLoading ? 'Adding...' : 'Add Home'}
// //                 </button>
// //                 <button
// //                   onClick={() => {
// //                     setShowAddForm(false);
// //                     setNewHome({ name: "", location: "", description: "" });
// //                   }}
// //                   className="inline-flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
// //                 >
// //                   <X className="w-4 h-4" />
// //                   Cancel
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* Loading State */}
// //         {loading ? (
// //           <div className="bg-white rounded-xl shadow-sm border p-8">
// //             <div className="flex items-center justify-center">
// //               <div className="flex items-center gap-3">
// //                 <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
// //                 <span className="text-gray-600">Loading homes...</span>
// //               </div>
// //             </div>
// //           </div>
// //         ) : error ? (
// //           <div className="bg-white rounded-xl shadow-sm border p-8">
// //             <div className="flex items-center justify-center">
// //               <div className="text-center">
// //                 <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
// //                 <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Homes</h3>
// //                 <p className="text-gray-600 mb-4">{error}</p>
// //                 <button
// //                   onClick={fetchHomes}
// //                   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
// //                 >
// //                   Try Again
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         ) : (
// //           <>
// //             {/* Stats Cards */}
// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
// //               <div className="bg-white rounded-xl shadow-sm border p-6">
// //                 <div className="flex items-center justify-between">
// //                   <div>
// //                     <p className="text-sm font-medium text-gray-600">Total Homes</p>
// //                     <p className="text-2xl font-bold text-gray-900">{homes.length}</p>
// //                   </div>
// //                   <div className="p-3 bg-blue-100 rounded-lg">
// //                     <Home className="w-6 h-6 text-blue-600" />
// //                   </div>
// //                 </div>
// //               </div>
              
// //               <div className="bg-white rounded-xl shadow-sm border p-6">
// //                 <div className="flex items-center justify-between">
// //                   <div>
// //                     <p className="text-sm font-medium text-gray-600">Active Listings</p>
// //                     <p className="text-2xl font-bold text-gray-900">{homes.length}</p>
// //                   </div>
// //                   <div className="p-3 bg-green-100 rounded-lg">
// //                     <Check className="w-6 h-6 text-green-600" />
// //                   </div>
// //                 </div>
// //               </div>
              
// //               <div className="bg-white rounded-xl shadow-sm border p-6">
// //                 <div className="flex items-center justify-between">
// //                   <div>
// //                     <p className="text-sm font-medium text-gray-600">Locations</p>
// //                     <p className="text-2xl font-bold text-gray-900">{new Set(homes.map(h => h.location)).size}</p>
// //                   </div>
// //                   <div className="p-3 bg-purple-100 rounded-lg">
// //                     <MapPin className="w-6 h-6 text-purple-600" />
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Homes List */}
// //             <div className="bg-white rounded-xl shadow-sm border">
// //               <div className="px-6 py-4 border-b bg-gray-50">
// //                 <h2 className="text-lg font-semibold text-gray-900">Property Listings</h2>
// //                 <p className="text-sm text-gray-600">Manage all your property listings</p>
// //               </div>
              
// //               {homes.length === 0 ? (
// //                 <div className="p-12 text-center">
// //                   <Home className="w-12 h-12 text-gray-400 mx-auto mb-4" />
// //                   <h3 className="text-lg font-medium text-gray-900 mb-2">No homes found</h3>
// //                   <p className="text-gray-600 mb-4">Get started by adding your first property listing.</p>
// //                   <button
// //                     onClick={() => setShowAddForm(true)}
// //                     className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
// //                   >
// //                     <Plus className="w-4 h-4" />
// //                     Add Your First Home
// //                   </button>
// //                 </div>
// //               ) : (
// //                 <div className="divide-y divide-gray-200">
// //                   {homes.map((home) => (
// //                     <div key={home._id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
// //                       {editingHome && editingHome._id === home._id ? (
// //                         // Edit Mode
// //                         <div className="space-y-4">
// //                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                             <div>
// //                               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                                 Home Name *
// //                               </label>
// //                               <input
// //                                 type="text"
// //                                 value={editingHome.name}
// //                                 onChange={(e) =>
// //                                   setEditingHome({ ...editingHome, name: e.target.value })
// //                                 }
// //                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
// //                               />
// //                             </div>
// //                             <div>
// //                               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                                 Location *
// //                               </label>
// //                               <input
// //                                 type="text"
// //                                 value={editingHome.location}
// //                                 onChange={(e) =>
// //                                   setEditingHome({ ...editingHome, location: e.target.value })
// //                                 }
// //                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
// //                               />
// //                             </div>
// //                           </div>
// //                           <div>
// //                             <label className="block text-sm font-medium text-gray-700 mb-2">
// //                               Description
// //                             </label>
// //                             <textarea
// //                               value={editingHome.description}
// //                               onChange={(e) =>
// //                                 setEditingHome({ ...editingHome, description: e.target.value })
// //                               }
// //                               rows={3}
// //                               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
// //                             />
// //                           </div>
// //                           <div className="flex gap-3 pt-2">
// //                             <button
// //                               onClick={() => updateHome(home._id)}
// //                               disabled={actionLoading}
// //                               className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded-lg transition-colors duration-200"
// //                             >
// //                               {actionLoading ? (
// //                                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
// //                               ) : (
// //                                 <Save className="w-4 h-4" />
// //                               )}
// //                               {actionLoading ? 'Saving...' : 'Save Changes'}
// //                             </button>
// //                             <button
// //                               onClick={() => setEditingHome(null)}
// //                               disabled={actionLoading}
// //                               className="inline-flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
// //                             >
// //                               <X className="w-4 h-4" />
// //                               Cancel
// //                             </button>
// //                           </div>
// //                         </div>
// //                       ) : (
// //                         // Display Mode
// //                         <div>
// //                           <div className="flex justify-between items-start mb-3">
// //                             <div className="flex-1">
// //                               <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
// //                                 <Home className="w-5 h-5 text-gray-600" />
// //                                 {home.name}
// //                               </h3>
// //                               <div className="flex items-center gap-2 text-gray-600 mb-2">
// //                                 <MapPin className="w-4 h-4" />
// //                                 <span>{home.location}</span>
// //                               </div>
// //                               {home.description && (
// //                                 <div className="flex items-start gap-2 text-gray-700">
// //                                   <FileText className="w-4 h-4 mt-0.5 text-gray-500" />
// //                                   <p className="leading-relaxed">{home.description}</p>
// //                                 </div>
// //                               )}
// //                             </div>
// //                           </div>
                          
// //                           <div className="flex gap-3 pt-4 border-t border-gray-100">
// //                             <button
// //                               onClick={() => setEditingHome(home)}
// //                               disabled={actionLoading}
// //                               className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white px-3 py-2 rounded-lg transition-colors duration-200 text-sm"
// //                             >
// //                               <Edit2 className="w-4 h-4" />
// //                               Edit
// //                             </button>
// //                             <button
// //                               onClick={() => handleDeleteClick(home._id, home.name)}
// //                               disabled={actionLoading}
// //                               className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-3 py-2 rounded-lg transition-colors duration-200 text-sm"
// //                             >
// //                               <Trash2 className="w-4 h-4" />
// //                               Delete
// //                             </button>
// //                           </div>
// //                         </div>
// //                       )}
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //             </div>
// //           </>
// //         )}
// //       </div>

// //       {/* Loading Overlay */}
// //       {actionLoading && (
// //         <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-40">
// //           <div className="bg-white rounded-lg p-6 shadow-xl">
// //             <div className="flex items-center gap-3">
// //               <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
// //               <span className="text-gray-700">Processing...</span>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
// "use client";

// import { useState, useEffect } from "react";
// import { Pencil, Trash2, Plus } from "lucide-react";

// export default function AdminHomesPage() {
//   const [homes, setHomes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [form, setForm] = useState({
//     name: "",
//     type: "orphanage",
//     location: "",
//     contact: "",
//     description: "",
//     imageUrl: "",
//   });

//   // Fetch all homes
//   const fetchHomes = async () => {
//     try {
//       const res = await fetch("/api/admin/homes");
//       const data = await res.json();
//       if (data.success) {
//         setHomes(data.data);
//       }
//     } catch (error) {
//       console.error("Error fetching homes:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchHomes();
//   }, []);

//   // Handle form input change
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Add home
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("/api/admin/homes", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       const data = await res.json();
//       if (data.success) {
//         setForm({
//           name: "",
//           type: "orphanage",
//           location: "",
//           contact: "",
//           description: "",
//           imageUrl: "",
//         });
//         fetchHomes();
//       } else {
//         alert("Error adding home: " + data.error);
//       }
//     } catch (error) {
//       console.error("Error adding home:", error);
//     }
//   };

//   // Delete home
//   const handleDelete = async (id) => {
//     if (!confirm("Are you sure you want to delete this home?")) return;
//     try {
//       const res = await fetch(`/api/admin/homes/${id}`, { method: "DELETE" });
//       const data = await res.json();
//       if (data.success) {
//         fetchHomes();
//       } else {
//         alert("Error deleting home: " + data.error);
//       }
//     } catch (error) {
//       console.error("Error deleting home:", error);
//     }
//   };

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Admin Homes Management</h1>

//       {/* Add Home Form */}
//       <form
//         onSubmit={handleSubmit}
//         className="bg-orange-600 shadow-md rounded p-4 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
//       >
//         <input
//           type="text"
//           name="name"
//           placeholder="Home Name"
//           value={form.name}
//           onChange={handleChange}
//           className="border p-2 rounded w-full"
//           required
//         />
//         <select
//           name="type"
//           value={form.type}
//           onChange={handleChange}
//           className="border p-2 rounded w-full"
//           required
//         >
//           <option value="orphanage">Orphanage</option>
//           <option value="oldage">Old Age Home</option>
//         </select>
//         <input
//           type="text"
//           name="location"
//           placeholder="Location"
//           value={form.location}
//           onChange={handleChange}
//           className="border p-2 rounded w-full"
//           required
//         />
//         <input
//           type="text"
//           name="contact"
//           placeholder="Contact"
//           value={form.contact}
//           onChange={handleChange}
//           className="border p-2 rounded w-full"
//           required
//         />
//         <input
//           type="text"
//           name="imageUrl"
//           placeholder="Image URL"
//           value={form.imageUrl}
//           onChange={handleChange}
//           className="border p-2 rounded w-full"
//         />
//         <textarea
//           name="description"
//           placeholder="Description"
//           value={form.description}
//           onChange={handleChange}
//           className="border p-2 rounded col-span-1 md:col-span-2"
//           rows={3}
//         ></textarea>
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded col-span-1 md:col-span-2 flex items-center justify-center"
//         >
//           <Plus className="w-5 h-5 mr-2" /> Add Home
//         </button>
//       </form>

//       {/* Homes List */}
//       {loading ? (
//         <p>Loading homes...</p>
//       ) : (
//         <div className="grid gap-4">
//           {homes.map((home) => (
//             <div
//               key={home._id}
//               className="border rounded-lg shadow-sm p-4 flex items-center gap-4 bg-white"
//             >
//               {home.imageUrl && (
//                 <img
//                   src={home.imageUrl}
//                   alt={home.name}
//                   className="w-24 h-24 object-cover rounded"
//                 />
//               )}
//               <div className="flex-1">
//                 <h2 className="font-semibold text-lg">{home.name}</h2>
//                 <p className="text-gray-600">Type: {home.type}</p>
//                 <p className="text-gray-600">{home.location}</p>
//                 <p className="text-gray-600">{home.contact}</p>
//                 <p className="text-sm text-gray-500">{home.description}</p>
//               </div>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => alert("Edit functionality coming soon!")}
//                   className="p-2 text-blue-600 hover:bg-blue-100 rounded"
//                 >
//                   <Pencil />
//                 </button>
//                 <button
//                   onClick={() => handleDelete(home._id)}
//                   className="p-2 text-red-600 hover:bg-red-100 rounded"
//                 >
//                   <Trash2 />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";

export default function AdminHomesPage() {
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null); // track edit mode
  const [form, setForm] = useState({
    name: "",
    type: "orphanage",
    location: "",
    contact: "",
    description: "",
    imageUrl: "",
  });

  // Fetch all homes
  const fetchHomes = async () => {
    try {
      const res = await fetch("/api/admin/homes");
      const data = await res.json();
      if (data.success) {
        setHomes(data.data);
      }
    } catch (error) {
      console.error("Error fetching homes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomes();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Update home
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/admin/homes/${editingId}` : "/api/admin/homes";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success || data._id) {
        setForm({
          name: "",
          type: "orphanage",
          location: "",
          contact: "",
          description: "",
          imageUrl: "",
        });
        setEditingId(null);
        fetchHomes();
      } else {
        alert("Error saving home: " + data.error);
      }
    } catch (error) {
      console.error("Error saving home:", error);
    }
  };

  // Start editing a home
  const handleEdit = (home) => {
    setEditingId(home._id);
    setForm({
      name: home.name,
      type: home.type,
      location: home.location,
      contact: home.contact,
      description: home.description,
      imageUrl: home.imageUrl,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setForm({
      name: "",
      type: "orphanage",
      location: "",
      contact: "",
      description: "",
      imageUrl: "",
    });
  };

  // Delete home
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this home?")) return;
    try {
      const res = await fetch(`/api/admin/homes/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        fetchHomes();
      } else {
        alert("Error deleting home: " + data.error);
      }
    } catch (error) {
      console.error("Error deleting home:", error);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Homes Management</h1>

      {/* Add/Edit Home Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-whit shadow-md rounded p-4 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Home Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        >
          <option value="orphanage">Orphanage</option>
          <option value="oldage">Old Age Home</option>
        </select>
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact"
          value={form.contact}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 rounded col-span-1 md:col-span-2"
          rows={3}
        ></textarea>
        <div className="flex gap-2 col-span-1 md:col-span-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center"
          >
            {editingId ? (
              <>
                <Pencil className="w-5 h-5 mr-2" /> Update Home
              </>
            ) : (
              <>
                <Plus className="w-5 h-5 mr-2" /> Add Home
              </>
            )}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="bg-gray-400 text-white px-4 py-2 rounded flex items-center justify-center"
            >
              <X className="w-5 h-5 mr-2" /> Cancel
            </button>
          )}
        </div>
      </form>

      {/* Homes List */}
      {loading ? (
        <p>Loading homes...</p>
      ) : (
        <div className="grid gap-4">
          {homes.map((home) => (
            <div
              key={home._id}
              className="border rounded-lg shadow-sm p-4 flex items-center gap-4 bg-white"
            >
              {home.imageUrl && (
                <img
                  src={home.imageUrl}
                  alt={home.name}
                  className="w-24 h-24 object-cover rounded"
                />
              )}
              <div className="flex-1">
                <h2 className="font-semibold text-lg">{home.name}</h2>
                <p className="text-gray-600">Type: {home.type}</p>
                <p className="text-gray-600">{home.location}</p>
                <p className="text-gray-600">{home.contact}</p>
                <p className="text-sm text-gray-500">{home.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(home)}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded"
                >
                  <Pencil />
                </button>
                <button
                  onClick={() => handleDelete(home._id)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded"
                >
                  <Trash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

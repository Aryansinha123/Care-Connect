
// // "use client";
// // import { useState, useEffect } from "react";
// // import { useRouter } from "next/navigation";

// // export default function HomePage() {
// //   const [search, setSearch] = useState("");
// //   const [homes, setHomes] = useState([]);
// //   const [isLoaded, setIsLoaded] = useState(false);
// //   const [user, setUser] = useState(null);
// //   const router = useRouter();

// //   useEffect(() => {
// //     async function fetchHomes() {
// //       try {
// //         const res = await fetch("/api/homes");
// //         const data = await res.json();
// //         if (data.success) setHomes(data.data);
// //       } catch (err) {
// //         console.error("Error fetching homes:", err);
// //       }
// //     }

// //     fetchHomes();
// //     setIsLoaded(true);

// //     // Check for logged-in user
// //     const token = localStorage.getItem("token");
// //     const userData = localStorage.getItem("user");
// //     if (token && userData) setUser(JSON.parse(userData));
// //   }, []);

// //   const handleLogout = () => {
// //     localStorage.removeItem("token");
// //     localStorage.removeItem("user");
// //     setUser(null);
// //     router.push("/");
// //   };

// //   const filteredHomes = homes.filter(
// //     (home) =>
// //       home.name.toLowerCase().includes(search.toLowerCase()) ||
// //       home.location.toLowerCase().includes(search.toLowerCase()) ||
// //       home.type.toLowerCase().includes(search.toLowerCase())
// //   );

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
// //       {/* Animated Background Elements */}
// //       <div className="absolute inset-0 overflow-hidden pointer-events-none">
// //         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
// //         <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
// //         <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
// //       </div>

// //       <div className="relative z-10 p-6">
// //         {/* Navbar */}
// //         <nav
// //           className={`flex items-center justify-between bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl px-8 py-5 shadow-2xl mb-12 transition-all duration-1000 ${
// //             isLoaded ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
// //           }`}
// //         >
// //           <div className="flex items-center space-x-3">
// //             <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center">
// //               <span className="text-white font-bold text-lg">C</span>
// //             </div>
// //             <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
// //               CareConnect
// //             </h1>
// //           </div>
// //           <div className="hidden md:flex items-center space-x-8">
// //             <a
// //               href="#"
// //               className="text-white/80 hover:text-white transition-all duration-300 hover:scale-105 relative group"
// //             >
// //               Home
// //               <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
// //             </a>
// //             <a
// //               href="#"
// //               className="text-white/80 hover:text-white transition-all duration-300 hover:scale-105 relative group"
// //             >
// //               About
// //               <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
// //             </a>
// //             <a
// //               href="#"
// //               className="text-white/80 hover:text-white transition-all duration-300 hover:scale-105 relative group"
// //             >
// //               Contact
// //               <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
// //             </a>

// //             {/* Login/Register or User Info */}
// //             {user ? (
// //               <div className="flex items-center space-x-4">
// //                 <span className="text-white font-medium">Hi, {user.name}</span>
// //                 <button
// //                   onClick={handleLogout}
// //                   className="bg-red-500 text-white px-4 py-2 rounded-2xl hover:bg-red-600 transition-all duration-300"
// //                 >
// //                   Logout
// //                 </button>
// //               </div>
// //             ) : (
// //               <div className="flex space-x-4">
// //                 <button
// //                   onClick={() => router.push("/user/login")}
// //                   className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2.5 rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
// //                 >
// //                   Login
// //                 </button>
// //                 <button
// //                   onClick={() => router.push("/user/register")}
// //                   className="bg-white/20 text-white px-6 py-2.5 rounded-2xl hover:bg-white/30 transition-all duration-300 hover:scale-105"
// //                 >
// //                   Register
// //                 </button>
// //               </div>
// //             )}
// //           </div>
// //         </nav>

// //         {/* Hero Section */}
// //         <div
// //           className={`text-center mb-16 transition-all duration-1000 delay-300 ${
// //             isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
// //           }`}
// //         >
// //           <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
// //             Connect with
// //             <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent block">
// //               Communities in Need
// //             </span>
// //           </h2>
// //           <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
// //             Discover orphanages and old age homes where your generosity can make a real difference
// //           </p>
// //         </div>

// //         {/* Search Bar */}
// //         <div
// //           className={`max-w-2xl mx-auto mb-16 transition-all duration-1000 delay-500 ${
// //             isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
// //           }`}
// //         >
// //           <div className="relative group">
// //             <input
// //               type="text"
// //               placeholder="Search by name, location, or type..."
// //               className="w-full px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all duration-300 text-lg group-hover:bg-white/15"
// //               value={search}
// //               onChange={(e) => setSearch(e.target.value)}
// //             />
// //             <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
// //               <svg
// //                 className="w-6 h-6 text-white/60"
// //                 fill="none"
// //                 stroke="currentColor"
// //                 viewBox="0 0 24 24"
// //               >
// //                 <path
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   strokeWidth={2}
// //                   d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
// //                 />
// //               </svg>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Stats Section */}
// //         <div
// //           className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16 transition-all duration-1000 delay-700 ${
// //             isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
// //           }`}
// //         >
// //           <div className="text-center bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
// //             <div className="text-4xl font-bold text-purple-300 mb-2 group-hover:scale-110 transition-transform duration-300">
// //               {homes.reduce((total, home) => {
// //                 const capacity = home.capacity || "0";
// //                 const number = parseInt(capacity.replace(/\D/g, "")) || 0;
// //                 return total + number;
// //               }, 0)}
// //               +
// //             </div>
// //             <div className="text-white/80">Lives Impacted</div>
// //           </div>
// //           <div className="text-center bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
// //             <div className="text-4xl font-bold text-pink-300 mb-2 group-hover:scale-110 transition-transform duration-300">{homes.length}</div>
// //             <div className="text-white/80">Care Homes</div>
// //           </div>
// //           <div className="text-center bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
// //             <div className="text-4xl font-bold text-blue-300 mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
// //             <div className="text-white/80">Support Available</div>
// //           </div>
// //         </div>

// //         {/* Homes Grid */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
// //           {filteredHomes.map((home, index) => (
// //             <div
// //               key={home._id}
// //               className={`group bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 ${
// //                 isLoaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
// //               }`}
// //               style={{ transitionDelay: `${900 + index * 100}ms` }}
// //             >
// //               <div className="relative h-56 overflow-hidden">
// //                 <img
// //                   src={home.imageUrl || "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop"}
// //                   alt={home.name}
// //                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
// //                 />
// //                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
// //                 <div className="absolute top-4 right-4">
// //                   <span className="bg-white/20 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full border border-white/30">
// //                     {home.type}
// //                   </span>
// //                 </div>
// //               </div>

// //               <div className="p-6">
// //                 <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
// //                   {home.name}
// //                 </h3>

// //                 <div className="flex items-center text-white/70 mb-3">
// //                   <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
// //                   </svg>
// //                   {home.location}
// //                 </div>

// //                 <p className="text-white/80 text-sm mb-4 leading-relaxed">
// //                   {home.description || "Providing care and support to those in need."}
// //                 </p>

// //                 <div className="flex justify-between items-center mb-4 text-sm text-white/60">
// //                   <span>{home.capacity || "Contact for details"}</span>
// //                   <span>{home.contact && `📞 ${home.contact}`}</span>
// //                 </div>

// //                 <button
// //                   onClick={() => !user && router.push("/user/login")}
// //                   className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-2xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 group-hover:animate-pulse"
// //                 >
// //                   Donate Now
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Loading State */}
// //         {homes.length === 0 && (
// //           <div className="text-center py-16">
// //             <div className="text-6xl mb-4">⏳</div>
// //             <h3 className="text-2xl font-bold text-white mb-2">Loading Care Homes...</h3>
// //             <p className="text-white/70">Please wait while we fetch the latest information</p>
// //           </div>
// //         )}

// //         {/* No Results */}
// //         {homes.length > 0 && filteredHomes.length === 0 && (
// //           <div className="text-center py-16">
// //             <div className="text-6xl mb-4">🔍</div>
// //             <h3 className="text-2xl font-bold text-white mb-2">No Results Found</h3>
// //             <p className="text-white/70">Try adjusting your search criteria</p>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function HomePage() {
//   const [search, setSearch] = useState("");
//   const [homes, setHomes] = useState([]);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [user, setUser] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     // Fetch homes
//     async function fetchHomes() {
//       try {
//         const res = await fetch("/api/homes");
//         const data = await res.json();
//         if (data.success) setHomes(data.data);
//       } catch (err) {
//         console.error(err);
//       }
//     }
//     fetchHomes();
//     setIsLoaded(true);

//     // Load user from localStorage
//     const token = localStorage.getItem("token");
//     const userData = localStorage.getItem("user");
//     if (token && userData) setUser(JSON.parse(userData));
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//     router.push("/");
//   };

//   const filteredHomes = homes.filter(
//     (home) =>
//       home.name.toLowerCase().includes(search.toLowerCase()) ||
//       home.location.toLowerCase().includes(search.toLowerCase()) ||
//       home.type.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
//       {/* Navbar */}
//       <nav className="flex items-center justify-between bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl px-6 py-4 mb-12">
//         <h1 className="text-2xl font-bold text-white">CareConnect</h1>
//         <div className="flex items-center gap-4">
//           {user ? (
//             <>
//               <span className="text-white font-medium">Hi, {user.name}</span>
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-500 px-4 py-2 rounded-2xl text-white hover:bg-red-600 transition-all"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <button
//                 onClick={() => router.push("/user/login")}
//                 className="bg-purple-500 px-4 py-2 rounded-2xl text-white hover:bg-purple-600 transition-all"
//               >
//                 Login
//               </button>
//               <button
//                 onClick={() => router.push("/user/register")}
//                 className="bg-white/20 px-4 py-2 rounded-2xl text-white hover:bg-white/30 transition-all"
//               >
//                 Register
//               </button>
//             </>
//           )}
//         </div>
//       </nav>

//       {/* Search */}
//       <input
//         type="text"
//         placeholder="Search homes..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="w-full px-4 py-3 rounded-2xl bg-white/10 text-white placeholder-white/60 mb-8 focus:outline-none focus:ring-2 focus:ring-purple-400"
//       />

//       {/* Homes Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//         {filteredHomes.length === 0 ? (
//           <p className="text-white/70 col-span-full text-center">
//             {homes.length === 0 ? "Loading homes..." : "No homes found."}
//           </p>
//         ) : (
//           filteredHomes.map((home) => (
//             <div
//               key={home._id}
//               className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 text-white border border-white/20"
//             >
//               <h3 className="text-xl font-bold mb-2">{home.name}</h3>
//               <p className="text-white/70 mb-2">{home.location}</p>
//               <p className="text-white/60 text-sm mb-2">{home.type}</p>
//               <button
//                 onClick={() => !user && router.push("/user/login")}
//                 className="w-full bg-purple-500 py-2 rounded-2xl hover:bg-purple-600 transition-all mt-2"
//               >
//                 Donate Now
//               </button>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [homes, setHomes] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch homes
    async function fetchHomes() {
      try {
        const res = await fetch("/api/homes");
        const data = await res.json();
        if (data.success) setHomes(data.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchHomes();
    setIsLoaded(true);

    // Load user from localStorage
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) setUser(JSON.parse(userData));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  const filteredHomes = homes.filter(
    (home) =>
      home.name.toLowerCase().includes(search.toLowerCase()) ||
      home.location.toLowerCase().includes(search.toLowerCase()) ||
      home.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 p-6">
        {/* Navbar */}
        <nav
          className={`flex items-center justify-between bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl px-8 py-5 shadow-2xl mb-12 transition-all duration-1000 ${
            isLoaded ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              CareConnect
            </h1>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-white/80 hover:text-white transition-all duration-300 hover:scale-105 relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#" className="text-white/80 hover:text-white transition-all duration-300 hover:scale-105 relative group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#" className="text-white/80 hover:text-white transition-all duration-300 hover:scale-105 relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
            </a>

            {/* User Info / Login */}
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-white font-medium">Hi, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-2xl hover:bg-red-600 transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <button
                  onClick={() => router.push("/user/login")}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2.5 rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                >
                  Login
                </button>
                {/* <button
                  onClick={() => router.push("/user/register")}
                  className="bg-white/20 text-white px-6 py-2.5 rounded-2xl hover:bg-white/30 transition-all duration-300 hover:scale-105"
                >
                  Register
                </button> */}
              </div>
            )}
          </div>
        </nav>

        {/* Hero */}
        <div className={`text-center mb-16 transition-all duration-1000 delay-300 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Connect with
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent block">
              Communities in Need
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
            Discover orphanages and old age homes where your generosity can make a real difference
          </p>
        </div>

        {/* Search */}
        <div className={`max-w-2xl mx-auto mb-16 transition-all duration-1000 delay-500 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <div className="relative group">
            <input
              type="text"
              placeholder="Search by name, location, or type..."
              className="w-full px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all duration-300 text-lg group-hover:bg-white/15"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Homes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredHomes.length === 0 ? (
            <p className="text-white/70 col-span-full text-center">{homes.length === 0 ? "Loading homes..." : "No homes found."}</p>
          ) : (
            filteredHomes.map((home, index) => (
              <div
                key={home._id}
                className={`group bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 ${
                  isLoaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
                }`}
                style={{ transitionDelay: `${900 + index * 100}ms` }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={home.imageUrl || "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop"}
                    alt={home.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/20 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full border border-white/30">
                      {home.type}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                    {home.name}
                  </h3>
                  <div className="flex items-center text-white/70 mb-3">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {home.location}
                  </div>
                  <p className="text-white/80 text-sm mb-4 leading-relaxed">{home.description || "Providing care and support to those in need."}</p>
                  <div className="flex justify-between items-center mb-4 text-sm text-white/60">
                    <span>{home.capacity || "Contact for details"}</span>
                    <span>{home.contact && `📞 ${home.contact}`}</span>
                  </div>
                  <button
                    onClick={() => !user && router.push("/user/login")}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-2xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 group-hover:animate-pulse"
                  >
                    Donate Now
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}


// // "use client";

// // import { useState } from "react";
// // import { useRouter } from "next/navigation";

// // export default function LoginPage() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState("");
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [showPassword, setShowPassword] = useState(false);
// //   const router = useRouter();

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     setIsLoading(true);
// //     setError("");
    
// //     try {
// //       const res = await fetch("/api/auth/login", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ email, password }),
// //       });
// //       const data = await res.json();
      
// //       if (res.ok) {
// //         // Note: localStorage not supported in artifacts - use your preferred storage method
// //         router.push("/");
// //       } else {
// //         setError(data.error);
// //       }
// //     } catch (err) {
// //       setError("An error occurred. Please try again.");
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden">
// //       {/* Background Pattern */}
     
      
// //       {/* Floating Elements */}
// //       <div className="absolute top-20 left-10 w-20 h-20 bg-pink-500/10 rounded-full blur-xl"></div>
// //       <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>
// //       <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-indigo-500/10 rounded-full blur-xl"></div>

// //       {/* Navigation Header */}
// //       <nav className="relative z-10 flex items-center justify-between p-6">
// //         <div className="flex items-center gap-3">
// //           <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
// //             <span className="text-white font-bold text-lg">C</span>
// //           </div>
// //           <span className="text-white text-xl font-bold">CareConnect</span>
// //         </div>
// //         <div className="hidden md:flex items-center gap-6">
// //           <button 
// //             onClick={() => router.push("/")}
// //             className="text-white/80 hover:text-white transition-colors duration-200"
// //           >
// //             Home
// //           </button>
// //           <button className="text-white/80 hover:text-white transition-colors duration-200">About</button>
// //           <button className="text-white/80 hover:text-white transition-colors duration-200">Contact</button>
// //         </div>
// //       </nav>

// //       {/* Main Content */}
// //       <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-100px)] p-3  ">
// //         <div className="w-2xl max-w-m ">
// //           {/* Welcome Section */}
// //           <div className="text-center mb-8">
// //             <h1 className="text-4xl font-bold text-white mb-3">Welcome Back</h1>
// //             <p className="text-purple-200/80 text-lg">
// //               Continue your journey of making a difference
// //             </p>
// //           </div>

// //           {/* Login Card */}
// //           <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden">
// //             {/* Card Glow Effect */}
// //             <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-purple-500/5 rounded-3xl"></div>
            
// //             <div className="relative z-10">
// //               <div className="space-y-6">
// //                 {/* Email Input */}
// //                 <div className="space-y-2">
// //                   <label htmlFor="email" className="block text-white/90 text-sm font-medium">
// //                     Email Address
// //                   </label>
// //                   <div className="relative group">
// //                     <input
// //                       id="email"
// //                       type="email"
// //                       value={email}
// //                       onChange={(e) => setEmail(e.target.value)}
// //                       placeholder="your.email@example.com"
// //                       className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all duration-300 backdrop-blur-sm group-hover:border-white/30"
// //                       required
// //                     />
// //                     <div className="absolute inset-y-0 right-0 flex items-center pr-4">
// //                       <svg className="w-5 h-5 text-white/30 group-focus-within:text-purple-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
// //                       </svg>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Password Input */}
// //                 <div className="space-y-2">
// //                   <label htmlFor="password" className="block text-white/90 text-sm font-medium">
// //                     Password
// //                   </label>
// //                   <div className="relative group">
// //                     <input
// //                       id="password"
// //                       type={showPassword ? "text" : "password"}
// //                       value={password}
// //                       onChange={(e) => setPassword(e.target.value)}
// //                       placeholder="Enter your password"
// //                       className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all duration-300 backdrop-blur-sm group-hover:border-white/30"
// //                       required
// //                     />
// //                     <button
// //                       type="button"
// //                       onClick={() => setShowPassword(!showPassword)}
// //                       className="absolute inset-y-0 right-0 flex items-center pr-4 text-white/30 hover:text-white/60 transition-colors duration-300"
// //                     >
// //                       {showPassword ? (
// //                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
// //                         </svg>
// //                       ) : (
// //                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
// //                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
// //                         </svg>
// //                       )}
// //                     </button>
// //                   </div>
// //                 </div>

// //                 {/* Error Message */}
// //                 {error && (
// //                   <div className="bg-red-500/20 border border-red-400/30 rounded-2xl p-4 text-red-200 text-sm backdrop-blur-sm animate-pulse">
// //                     <div className="flex items-center gap-2">
// //                       <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
// //                       </svg>
// //                       {error}
// //                     </div>
// //                   </div>
// //                 )}

// //                 {/* Forgot Password */}
// //                 <div className="text-right">
// //                   <button
// //                     type="button"
// //                     className="text-purple-300 hover:text-white text-sm transition-colors duration-200 underline-offset-4 hover:underline"
// //                   >
// //                     Forgot your password?
// //                   </button>
// //                 </div>

// //                 {/* Login Button */}
// //                 <button
// //                   onClick={handleLogin}
// //                   disabled={isLoading || !email || !password}
// //                   className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
// //                 >
// //                   {/* Button Glow Effect */}
// //                   <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl blur-xl"></div>
                  
// //                   <div className="relative z-10">
// //                     {isLoading ? (
// //                       <div className="flex items-center justify-center gap-2">
// //                         <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
// //                         Signing you in...
// //                       </div>
// //                     ) : (
// //                       <div className="flex items-center justify-center gap-2">
// //                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
// //                         </svg>
// //                         Sign In to CareConnect
// //                       </div>
// //                     )}
// //                   </div>
// //                 </button>

// //                 {/* Divider */}
// //                 <div className="flex items-center my-8">
// //                   <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
// //                   <span className="px-4 text-white/50 text-sm font-medium">or continue with</span>
// //                   <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
// //                 </div>

// //                 {/* Social Login */}
// //                 <div className="grid grid-cols-2 gap-4">
// //                   <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white py-3 px-4 rounded-2xl transition-all duration-300 backdrop-blur-sm hover:scale-105 group">
// //                     <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24">
// //                       <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
// //                       <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
// //                       <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
// //                       <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
// //                     </svg>
// //                     <span className="text-sm font-medium">Google</span>
// //                   </button>
                  
// //                   <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white py-3 px-4 rounded-2xl transition-all duration-300 backdrop-blur-sm hover:scale-105 group">
// //                     <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
// //                       <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
// //                     </svg>
// //                     <span className="text-sm font-medium">Facebook</span>
// //                   </button>
// //                 </div>
// //               </div>

// //               {/* Register Link */}
// //               <div className="text-center mt-8 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
// //                 <p className="text-white/70 text-sm mb-3">
// //                   New to CareConnect?
// //                 </p>
// //                 <button
// //                   onClick={() => router.push("/user/register")}
// //                   className="inline-flex items-center gap-2 text-purple-300 hover:text-white font-medium transition-all duration-200 hover:underline underline-offset-4 group"
// //                 >
// //                   <span>Create your account</span>
// //                   <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
// //                   </svg>
// //                 </button>
// //                 <p className="text-white/50 text-xs mt-2">
// //                   Join thousands making a difference in care communities
// //                 </p>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Bottom Stats - Matching Homepage */}
// //           <div className="mt-12 grid grid-cols-3 gap-4">
// //             <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10 group hover:bg-white/10 transition-all duration-300">
// //               <div className="text-2xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300">150k+</div>
// //               <div className="text-purple-200 text-xs">Lives Impacted</div>
// //             </div>
// //             <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10 group hover:bg-white/10 transition-all duration-300">
// //               <div className="text-2xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300">500+</div>
// //               <div className="text-purple-200 text-xs">Care Homes</div>
// //             </div>
// //             <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10 group hover:bg-white/10 transition-all duration-300">
// //               <div className="text-2xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300">24/7</div>
// //               <div className="text-purple-200 text-xs">Support</div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const router = useRouter();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         // Save token and user info in localStorage
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("user", JSON.stringify(data.user));

//         // Redirect to homepage
//         router.push("/");
//       } else {
//         setError(data.error || "Invalid credentials");
//       }
//     } catch (err) {
//       setError("An error occurred. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center p-3">
//       <div className="w-full max-w-md">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
//           <p className="text-purple-200/80 text-lg">Continue your journey of making a difference</p>
//         </div>

//         <form
//           onSubmit={handleLogin}
//           className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden"
//         >
//           <div className="space-y-6">
//             {/* Email */}
//             <div>
//               <label className="block text-white/90 text-sm font-medium mb-2">Email Address</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="your.email@example.com"
//                 className="w-full px-4 py-3 rounded-2xl bg-white/5 text-white placeholder-white/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400"
//                 required
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label className="block text-white/90 text-sm font-medium mb-2">Password</label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="Enter your password"
//                   className="w-full px-4 py-3 rounded-2xl bg-white/5 text-white placeholder-white/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/80"
//                 >
//                   {showPassword ? "Hide" : "Show"}
//                 </button>
//               </div>
//             </div>

//             {/* Error */}
//             {error && <p className="text-red-500 text-sm">{error}</p>}

//             {/* Login Button */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-gradient-to-r from-pink-500 to-purple-500 py-3 rounded-2xl font-semibold text-white hover:from-pink-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50"
//             >
//               {isLoading ? "Signing In..." : "Sign In"}
//             </button>
//           </div>

//           {/* Register Link */}
//           <p className="text-white/70 text-center mt-6">
//             New to CareConnect?{" "}
//             <span
//               onClick={() => router.push("/user/register")}
//               className="text-purple-300 hover:underline cursor-pointer"
//             >
//               Create an account
//             </span>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/");
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden flex items-center justify-center p-3">

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-pink-500/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-indigo-500/10 rounded-full blur-xl"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Welcome */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-purple-200/80 text-lg">Continue your journey of making a difference</p>
        </div>

        {/* Login Card */}
        <form
          onSubmit={handleLogin}
          className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-purple-500/5 rounded-3xl"></div>
          <div className="relative z-10 space-y-6">

            {/* Email */}
            <div>
              <label className="block text-white/90 text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 rounded-2xl bg-white/5 text-white placeholder-white/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-white/90 text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 text-white placeholder-white/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/80"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/20 border border-red-400/30 rounded-2xl p-4 text-red-200 text-sm backdrop-blur-sm animate-pulse">
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 py-3 rounded-2xl font-semibold text-white transition-all duration-300 disabled:opacity-50 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl blur-xl"></div>
              <span className="relative z-10">{isLoading ? "Signing In..." : "Sign In"}</span>
            </button>

            {/* Social Login */}
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              <span className="px-4 text-white/50 text-sm">or continue with</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white py-3 px-4 rounded-2xl transition-all duration-300 backdrop-blur-sm hover:scale-105">
                {/* Google SVG Icon */}
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-sm font-medium">Google</span>
              </button>
            </div>

            {/* Register Link */}
            <p className="text-white/70 text-center mt-6">
              New to CareConnect?{" "}
              <span
                onClick={() => router.push("/user/register")}
                className="text-purple-300 hover:underline cursor-pointer"
              >
                Create an account
              </span>
            </p>
          </div>
        </form>

        {/* Bottom Stats */}
        <div className="mt-12 grid grid-cols-3 gap-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10 group hover:bg-white/10 transition-all duration-300">
            <div className="text-2xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300">150k+</div>
            <div className="text-purple-200 text-xs">Lives Impacted</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10 group hover:bg-white/10 transition-all duration-300">
            <div className="text-2xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300">500+</div>
            <div className="text-purple-200 text-xs">Care Homes</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10 group hover:bg-white/10 transition-all duration-300">
            <div className="text-2xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300">24/7</div>
            <div className="text-purple-200 text-xs">Support</div>
          </div>
        </div>
      </div>
    </div>
  );
}

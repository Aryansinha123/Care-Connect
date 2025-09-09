"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Home, UserPlus, LayoutDashboard } from "lucide-react";

export default function AdminLayout({ children }) {
  const [adminName, setAdminName] = useState("Admin");

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      try {
        // If token is JWT → decode it (for simplicity, mock name)
        const decoded = JSON.parse(atob(token.split(".")[1]));
        setAdminName(decoded.name || "Admin");
      } catch {
        setAdminName("Admin");
      }
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-blue-600">CareConnect</h2>
          <p className="text-sm text-gray-500">Admin Dashboard</p>
        </div>
        <nav className="p-4 space-y-2">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-100 text-gray-700"
          >
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link
            href="/admin/create-home"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-100 text-gray-700"
          >
            <Home className="w-5 h-5" /> Manage Homes
          </Link>
          <Link
            href="/admin/create-admin"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-100 text-gray-700"
          >
            <UserPlus className="w-5 h-5" /> Create Admin
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow-sm border-b">
          <div className="px-6 py-4 flex justify-between items-center">
            <h1 className="text-lg font-semibold text-gray-800">Welcome</h1>
            <span className="text-sm font-medium text-blue-600">
              {adminName}
            </span>
          </div>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

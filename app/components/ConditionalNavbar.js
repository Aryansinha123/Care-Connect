"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();
  
  // Exclude navbar from admin and home-admin pages
  const isAdminRoute = pathname?.startsWith("/admin");
  const isHomeAdminRoute = pathname?.startsWith("/home-admin");
  
  if (isAdminRoute || isHomeAdminRoute) {
    return null;
  }
  
  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
      <Navbar />
    </div>
  );
}


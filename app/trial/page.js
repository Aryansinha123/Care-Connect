"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";

export default function Navbar() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      localStorage.setItem("user", JSON.stringify(session.user));
    } else {
      localStorage.removeItem("user");
    }
  }, [session]);

  const storedUser =
    typeof window !== "undefined" && localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;

  return (
    <nav className="p-4 bg-blue-800 flex justify-between items-center">
      <h1 className="font-bold">Care Connect</h1>
      <div>
        {storedUser ? (
          <div className="flex items-center gap-4">
            <span>Hi, {storedUser.name}</span>
            <button
              className="px-3 py-1 bg-red-500 text-white rounded"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </div>
        ) : (
          <a href="/user/login" className="px-3 py-1 bg-blue-500 text-white rounded">
            Login
          </a>
        )}
      </div>
    </nav>
  );
}

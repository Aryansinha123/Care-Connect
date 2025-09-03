
"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h2 className="text-2xl font-bold">Login</h2>

      <button
        onClick={() => signIn("google")}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Sign in with Google
      </button>

      <button
        onClick={() => signIn("credentials", { email: "test@test.com", password: "123456" })}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Test Manual Login
      </button>
    </div>
  );
}

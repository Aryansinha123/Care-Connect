"use client";
import { useEffect, useState } from "react";

export default function AddHomeAdminPage() {
  const [homes, setHomes] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "", // ✅ added password
    homeId: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Fetch homes
  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const res = await fetch("/api/admin/homes");
        if (!res.ok) throw new Error("Failed to fetch homes");
        const data = await res.json();
        setHomes(data.data || []);
      } catch (error) {
        console.error("Error fetching homes:", error);
        setHomes([]);
      }
    };
    fetchHomes();
  }, []);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/home-admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: "Admin registered successfully!" });
        setFormData({ name: "", email: "", password: "", homeId: "" }); // reset form
      } else {
        setMessage({
          type: "error",
          text: data.error || "Failed to register admin",
        });
      }
    } catch (error) {
      console.error("Error registering admin:", error);
      setMessage({ type: "error", text: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-white shadow rounded-lg max-w-md mx-auto"
    >
      <h2 className="text-xl font-bold">Register New Home Admin</h2>

      {/* Inline Message */}
      {message && (
        <div
          className={`p-2 rounded ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Name */}
      <input
        type="text"
        placeholder="Admin Name"
        className="border p-2 rounded w-full"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />

      {/* Email */}
      <input
        type="email"
        placeholder="Admin Email"
        className="border p-2 rounded w-full"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />

      {/* Password */}
      <input
        type="password"
        placeholder="Admin Password"
        className="border p-2 rounded w-full"
        value={formData.password}
        onChange={(e) =>
          setFormData({ ...formData, password: e.target.value })
        }
        required
      />

      {/* Home Selection */}
      <select
        className="border p-2 rounded w-full"
        value={formData.homeId}
        onChange={(e) => setFormData({ ...formData, homeId: e.target.value })}
        required
      >
        <option value="">Select a Home</option>
        {homes.map((home) => (
          <option key={home._id} value={home._id}>
            {home.name}
          </option>
        ))}
      </select>

      {/* Submit */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}

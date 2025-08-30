"use client";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [homes, setHomes] = useState([]);
  const [form, setForm] = useState({ name: "", type: "orphanage", location: "", contact: "" });

  useEffect(() => {
    fetch("/api/admin/homes")
      .then((res) => res.json())
      .then((data) => setHomes(data.data || []));
  }, []);

  const addHome = async () => {
    await fetch("/api/admin/homes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    window.location.reload();
  };

  const deleteHome = async (id) => {
    await fetch(`/api/admin/homes/${id}`, { method: "DELETE" });
    window.location.reload();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Add Home Form */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 m-1"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <select
          className="border p-2 m-1"
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="orphanage">Orphanage</option>
          <option value="oldage">Old Age Home</option>
        </select>
        <input
          type="text"
          placeholder="Location"
          className="border p-2 m-1"
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <input
          type="text"
          placeholder="Contact"
          className="border p-2 m-1"
          onChange={(e) => setForm({ ...form, contact: e.target.value })}
        />
        <button onClick={addHome} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Home
        </button>
      </div>

      {/* List of Homes */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Location</th>
            <th className="p-2 border">Contact</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {homes.map((home) => (
            <tr key={home._id}>
              <td className="p-2 border">{home.name}</td>
              <td className="p-2 border">{home.type}</td>
              <td className="p-2 border">{home.location}</td>
              <td className="p-2 border">{home.contact}</td>
              <td className="p-2 border">
                <button
                  onClick={() => deleteHome(home._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
                {/* Later: Add Edit Functionality */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

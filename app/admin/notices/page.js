"use client";

import { useEffect, useState } from "react";

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    id: null,
    title: "",
    body: "",
    startDate: "",
    endDate: "",
    enabled: true,
    displayType: "every_visit",
    dismissible: true,
    priority: 0,
  });

  const token =
    typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;

  const fetchNotices = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/notices", {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch notices");
      }
      setNotices(data.notices || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetForm = () => {
    setForm({
      id: null,
      title: "",
      body: "",
      startDate: "",
      endDate: "",
      enabled: true,
      displayType: "every_visit",
      dismissible: true,
      priority: 0,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = {
        title: form.title,
        body: form.body,
        startDate: form.startDate,
        endDate: form.endDate,
        enabled: form.enabled,
        displayType: form.displayType,
        dismissible: form.dismissible,
        priority: Number(form.priority) || 0,
      };

      const method = form.id ? "PUT" : "POST";
      const url = form.id
        ? `/api/admin/notices/${form.id}`
        : "/api/admin/notices";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save notice");
      }

      resetForm();
      fetchNotices();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (notice) => {
    setForm({
      id: notice._id || notice.id,
      title: notice.title,
      body: notice.body,
      startDate: notice.startDate
        ? new Date(notice.startDate).toISOString().slice(0, 16)
        : "",
      endDate: notice.endDate
        ? new Date(notice.endDate).toISOString().slice(0, 16)
        : "",
      enabled: notice.enabled,
      displayType: notice.displayType,
      dismissible: notice.dismissible,
      priority: notice.priority ?? 0,
    });
  };

  const handleToggleEnabled = async (notice) => {
    try {
      const res = await fetch(`/api/admin/notices/${notice._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ enabled: !notice.enabled }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update status");
      }
      fetchNotices();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (notice) => {
    if (!window.confirm("Are you sure you want to delete this notice?")) return;
    try {
      const res = await fetch(`/api/admin/notices/${notice._id}`, {
        method: "DELETE",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to delete notice");
      }
      fetchNotices();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex-1 p-6 md:p-10">
      <h1 className="text-2xl font-bold mb-4">Site Notices</h1>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mb-8 space-y-4 rounded-lg bg-white p-4 shadow-sm border border-gray-200"
      >
        <h2 className="text-lg font-semibold">
          {form.id ? "Edit Notice" : "Create Notice"}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority (lower = higher priority)
            </label>
            <input
              type="number"
              value={form.priority}
              onChange={(e) =>
                setForm((f) => ({ ...f, priority: e.target.value }))
              }
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Body (HTML allowed)
          </label>
          <textarea
            value={form.body}
            onChange={(e) =>
              setForm((f) => ({ ...f, body: e.target.value }))
            }
            required
            rows={4}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="datetime-local"
              value={form.startDate}
              onChange={(e) =>
                setForm((f) => ({ ...f, startDate: e.target.value }))
              }
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="datetime-local"
              value={form.endDate}
              onChange={(e) =>
                setForm((f) => ({ ...f, endDate: e.target.value }))
              }
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Display Type
            </label>
            <select
              value={form.displayType}
              onChange={(e) =>
                setForm((f) => ({ ...f, displayType: e.target.value }))
              }
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="every_visit">Every Visit</option>
              <option value="one_time">One Time per User</option>
            </select>
          </div>
          <div className="flex items-end space-x-4">
            <label className="inline-flex items-center text-sm text-gray-700">
              <input
                type="checkbox"
                checked={form.enabled}
                onChange={(e) =>
                  setForm((f) => ({ ...f, enabled: e.target.checked }))
                }
                className="mr-2"
              />
              Enabled
            </label>
            <label className="inline-flex items-center text-sm text-gray-700">
              <input
                type="checkbox"
                checked={form.dismissible}
                onChange={(e) =>
                  setForm((f) => ({ ...f, dismissible: e.target.checked }))
                }
                className="mr-2"
              />
              Dismissible
            </label>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 disabled:opacity-60"
          >
            {saving ? "Saving..." : form.id ? "Update Notice" : "Create Notice"}
          </button>
          {form.id && (
            <button
              type="button"
              onClick={resetForm}
              className="text-sm text-gray-600 hover:underline"
            >
              Cancel edit
            </button>
          )}
        </div>
      </form>

      <div className="rounded-lg bg-white p-4 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Existing Notices</h2>
          {loading && (
            <span className="text-xs text-gray-500">Loading...</span>
          )}
        </div>
        {notices.length === 0 && !loading && (
          <p className="text-sm text-gray-500">No notices configured yet.</p>
        )}
        <ul className="divide-y divide-gray-100">
          {notices.map((n) => (
            <li key={n._id} className="py-3 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">
                    {n.title}
                  </span>
                  <span className="text-xs rounded-full px-2 py-0.5 bg-gray-100 text-gray-600">
                    {n.displayType === "one_time"
                      ? "One time per user"
                      : "Every visit"}
                  </span>
                  <span className="text-xs text-gray-400">
                    Priority: {n.priority ?? 0}
                  </span>
                  <span
                    className={`text-xs rounded-full px-2 py-0.5 ${
                      n.enabled
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {n.enabled ? "Enabled" : "Disabled"}
                  </span>
                </div>
                <p className="mt-1 max-w-xl text-xs text-gray-600 line-clamp-2">
                  {n.body}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  {n.startDate
                    ? new Date(n.startDate).toLocaleString()
                    : ""}{" "}
                  —{" "}
                  {n.endDate ? new Date(n.endDate).toLocaleString() : ""}
                </p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button
                  type="button"
                  onClick={() => handleEdit(n)}
                  className="text-xs px-2 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleToggleEnabled(n)}
                  className="text-xs px-2 py-1 rounded-md border border-indigo-300 text-indigo-700 hover:bg-indigo-50"
                >
                  {n.enabled ? "Disable" : "Enable"}
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(n)}
                  className="text-xs px-2 py-1 rounded-md border border-red-300 text-red-700 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}



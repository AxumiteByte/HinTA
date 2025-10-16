import { useEffect, useState } from "react";
import api from "../api/api";
import { motion } from "framer-motion";

export default function AdminApplicationsPage({ jobId }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        const url = jobId ? `/applications?jobId=${jobId}` : "/applications";
        const res = await api.get(url);
        setApplications(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch applications");
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, [jobId]);

  const filteredApplications = applications
    .filter(app =>
      app.name.toLowerCase().includes(search.toLowerCase()) ||
      app.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "desc"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-[#f9fafa] rounded-2xl border shadow-lg mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Applicants</h1>

      {/* Search & Sort */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="desc">Latest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

      {loading && <p className="text-center">Loading applicants...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {filteredApplications.length > 0 ? (
        <div className="grid gap-4">
          {filteredApplications.map((app) => (
            <motion.div
              key={app._id}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">{app.name}</h2>
                <p className="text-gray-600">{app.email}</p>
                {app.coverLetter && <p className="mt-1 text-gray-700">{app.coverLetter}</p>}
                <p className="text-gray-400 text-sm mt-1">
                  Applied on: {new Date(app.createdAt).toLocaleString()}
                  {app.updatedAt && app.updatedAt !== app.createdAt && " (Updated)"}
                </p>
              </div>
              <a
                href={`http://localhost:5000/${app.resumePath}`}
                target="_blank"
                rel="noreferrer"
                className="mt-2 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded hover:opacity-90 transition"
              >
                Download Resume
              </a>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No applicants yet.</p>
      )}
    </div>
  );
}

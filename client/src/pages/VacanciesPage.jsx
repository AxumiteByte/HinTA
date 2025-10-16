import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, MapPin, Clock } from "lucide-react";
import { useJobStore } from "../store/jobStore";
import api from "../api/api";

export default function VacanciesPage() {
  const { jobs, fetchActiveJobs, loading, error } = useJobStore();
  const [search, setSearch] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [appForm, setAppForm] = useState({
    name: "",
    email: "",
    coverLetter: "",
    resume: null,
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchActiveJobs();
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleAppChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume")
      setAppForm((prev) => ({ ...prev, resume: files[0] }));
    else setAppForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAppSubmit = async (e) => {
    e.preventDefault();
    if (!selectedJob) return;

    const data = new FormData();
    data.append("name", appForm.name);
    data.append("email", appForm.email);
    data.append("coverLetter", appForm.coverLetter);
    data.append("resume", appForm.resume);
    data.append("jobId", selectedJob._id);

    try {
      await api.post("/applications", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Application submitted successfully!");
      setAppForm({ name: "", email: "", coverLetter: "", resume: null });
      setShowForm(false);
      setSelectedJob(null);
    } catch (err) {
      setMessage("Failed to submit application.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-tr from-[#255876] to-[#f2b143] text-white py-24 text-center">
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-3xl md:text-5xl font-extrabold">
          Shape the Future With Us
        </motion.h1>
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-4 text-lg sm:text-base md:text-lg max-w-2xl mx-auto">
          Join our innovative team and build impactful products. Opportunities
          across engineering, design, and more.
        </motion.p>
      </section>

      {/* Perks Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid gap-8 sm:grid-cols-1 md:grid-cols-3">
        {[
          {
            title: "Growth",
            text: "Advance quickly with mentorship & training.",
          },
          {
            title: "Flexibility",
            text: "Hybrid work options with balance in mind.",
          },
          { title: "Innovation", text: "Contribute to cutting-edge projects." },
        ].map((perk, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="bg-white/70 backdrop-blur shadow-lg rounded-2xl p-6 text-center border">
            <h3 className="text-xl font-semibold text-gray-800">
              {perk.title}
            </h3>
            <p className="text-gray-600 mt-2">{perk.text}</p>
          </motion.div>
        ))}
      </section>

      {/* Search */}
      <div className="sticky top-0 bg-white/80 backdrop-blur shadow-sm p-4 z-40">
        <div className="max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Search jobs..."
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Jobs Grid */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p className="text-center col-span-full">Loading jobs...</p>
        ) : error ? (
          <p className="text-center text-red-500 col-span-full">{error}</p>
        ) : filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <motion.div
              key={job._id}
              whileHover={{
                scale: 1.03,
                y: -3,
                boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
              }}
              className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all duration-300 border border-gray-100 hover:border-blue-500"
              onClick={() => {
                setSelectedJob(job);
                setShowForm(false);
              }} // ensure details open first
            >
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Briefcase size={16} /> {job.department}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                {job.title}
              </h2>
              <div className="flex gap-4 text-gray-500 text-sm mb-3">
                <span className="flex items-center gap-1">
                  <MapPin size={16} /> {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={16} /> {job.type}
                </span>
              </div>
              <p className="text-gray-600">{job.shortDescription}</p>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No jobs available.
          </p>
        )}
      </section>

      {/* Job Detail Modal */}
      <AnimatePresence>
        {selectedJob && !showForm && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white/90 backdrop-blur rounded-2xl shadow-xl max-w-lg w-full p-8 relative">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={() => setSelectedJob(null)}>
                ✕
              </button>
              <h2 className="text-3xl font-bold mb-3">{selectedJob.title}</h2>
              <div className="flex gap-4 text-gray-500 text-sm mb-4">
                <span className="flex items-center gap-1">
                  <Briefcase size={16} /> {selectedJob.department}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={16} /> {selectedJob.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={16} /> {selectedJob.type}
                </span>
              </div>
              <p className="text-gray-600 mb-6">{selectedJob.details}</p>
              <button
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
                onClick={() => setShowForm(true)}>
                Apply Now
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Application Form Modal */}
      <AnimatePresence>
        {showForm && selectedJob && (
          <motion.form
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleAppSubmit}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white/90 backdrop-blur rounded-2xl shadow-xl max-w-lg w-full p-8 relative">
              <button
                type="button"
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={() => setShowForm(false)}>
                ✕
              </button>
              <h2 className="text-2xl font-bold mb-6">
                Apply for {selectedJob.title}
              </h2>

              {message && <p className="text-green-600 mb-4">{message}</p>}

              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={appForm.name}
                  onChange={handleAppChange}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={appForm.email}
                  onChange={handleAppChange}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <textarea
                  name="coverLetter"
                  rows="4"
                  placeholder="Cover Letter"
                  value={appForm.coverLetter}
                  onChange={handleAppChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <input
                  type="file"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleAppChange}
                  required
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg w-full font-semibold hover:opacity-90 transition">
                Submit Application
              </button>
            </motion.div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

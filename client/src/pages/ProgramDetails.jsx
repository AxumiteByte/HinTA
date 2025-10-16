// src/pages/ProgramDetails.jsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function ProgramDetails() {
  const { id } = useParams();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/programs/${id}`);
        setProgram(res.data);
      } catch (err) {
        console.error("Error fetching program:", err);
        setError("Could not load program details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProgram();
  }, [id]);

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "Unknown";

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-[#255876] bg-[#f9fafb]">
        Loading program...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 bg-[#f9fafb]">
        {error}
      </div>
    );

  if (!program)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 bg-[#f9fafb]">
        Program not found.
      </div>
    );

  return (
    <div className="min-h-screen w-full bg-[#f9fafb] text-[#253864] py-12">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link
          to="/programs"
          className="text-[#f2b143] hover:text-[#FFA500] font-medium mb-6 inline-block"
        >
          ← Back to Programs
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
        >
          {program.image && (
            <img
              src={program.image}
              alt={program.title}
              className="w-full h-64 object-cover"
              onError={(e) =>
                (e.currentTarget.src =
                  "https://via.placeholder.com/800x300?text=No+Image")
              }
            />
          )}

          <div className="p-8 space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-[#255876]">
                {program.title}
              </h1>
              <span className="px-3 py-1 bg-[#f2b143]/20 text-[#f2b143] rounded-full text-sm border border-[#f2b143]/30">
                {program.category || "Uncategorized"}
              </span>
            </div>

            <p className="text-gray-700">{program.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#f9fafb] p-4 rounded-xl border border-gray-200 flex flex-col">
                <span className="text-sm text-gray-500">Status</span>
                <span className="text-lg font-semibold text-[#255876]">
                  {program.status || "N/A"}
                </span>
              </div>
              <div className="bg-[#f9fafb] p-4 rounded-xl border border-gray-200 flex flex-col">
                <span className="text-sm text-gray-500">Start Date</span>
                <span className="text-lg font-semibold">
                  {formatDate(program.startDate)}
                </span>
              </div>
              <div className="bg-[#f9fafb] p-4 rounded-xl border border-gray-200 flex flex-col">
                <span className="text-sm text-gray-500">End Date</span>
                <span className="text-lg font-semibold">
                  {formatDate(program.endDate)}
                </span>
              </div>
              {program.location && (
                <div className="bg-[#f9fafb] p-4 rounded-xl border border-gray-200 flex flex-col">
                  <span className="text-sm text-gray-500">Location</span>
                  <span className="text-lg font-semibold">
                    {program.location}
                  </span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}

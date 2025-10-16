// src/pages/Directorate.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import api from "../api/api.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

export default function Directorate() {
  const { t } = useTranslation();
  const [directors, setDirectors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/directorate")
      .then((res) => {
        if (res.data?.success) {
          setDirectors(res.data.data);
        }
      })
      .catch((err) => console.error("Error fetching directorates:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] text-[#253864] px-4 flex flex-col py-12">
      <div className="max-w-screen-xl mx-auto py-12">
        <h1 className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-[#253864] to-[#FFA500] text-transparent bg-clip-text">
          {t("directorate.pageTitle", "Directorate")}
        </h1>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {directors.map((director, index) => (
            <motion.div
              key={director._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="bg-white p-6 rounded-2xl shadow-lg border border-[#E5E7EB] flex flex-col items-center text-center hover:shadow-[#FFA500]/30 transition-shadow duration-300"
            >
              <img
                src={director.image}
                alt={director.name}
                className="w-32 h-32 rounded-full object-cover mb-4"
              />
              <h2 className="text-2xl font-semibold text-[#253864] mb-1">
                {director.name}
              </h2>
              <p className="text-[#4B5563] text-sm mb-2">{director.role}</p>
              <p className="text-[#4B5563] mb-4 text-sm">{director.bio}</p>
              <a
                href={`mailto:${director.email}`}
                className="text-[#FFA500] hover:text-[#ffb347] font-medium"
              >
                {t("directorate.contact", "Contact")}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

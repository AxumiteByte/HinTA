import { useEffect } from "react";
import { motion } from "framer-motion";
import { useProgramStore } from "../store/programStore";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import { useTranslation } from "react-i18next";

export default function Programs() {
  const { t } = useTranslation();
  const { programs, fetchPrograms, loading, error } = useProgramStore();

  useEffect(() => {
    fetchPrograms();
  }, []);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="w-full min-h-screen bg-[#f9fafb] text-[#253864] px-4 py-12">
      <div className="max-w-screen-xl mx-auto py-12">
        <h1 className="text-4xl font-bold mb-10 text-center bg-[#255876] bg-clip-text">
          {t("programs.page.pageTitle")}{" "}
          <span className="text-[#FFA500]">
            {t("programs.page.programsText")}
          </span>
        </h1>

        {programs.length === 0 ? (
          <p className="text-center text-gray-500">
            {t("programs.page.noPrograms")}
          </p>
        ) : (
          <div className="grid gap-6">
            {programs.map((program, index) => (
              <motion.div
                key={program._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-transform duration-200 flex flex-col md:flex-row">
                <div className="w-full md:w-60 h-48 md:h-auto flex-shrink-0 relative">
                  <img
                    src={
                      program.image ||
                      "https://via.placeholder.com/192x192?text=No+Image"
                    }
                    alt={program.title}
                    className="w-full h-full object-cover"
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://via.placeholder.com/192x192?text=No+Image")
                    }
                  />
                </div>

                <div className="flex flex-col p-6 justify-between flex-1">
                  <div>
                    <h2 className="text-2xl font-semibold text-[#255876] mb-2">
                      {program.title}
                    </h2>
                    <p className="text-gray-700 mb-3">{program.description}</p>
                    <p className="text-sm text-gray-500">
                      <strong className="text-[#f2b143]">
                        {t("programs.page.category")}:
                      </strong>{" "}
                      {program.category}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong className="text-[#f2b143]">
                        {t("programs.page.status")}:
                      </strong>{" "}
                      {program.status}
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4 gap-2">
                    <div className="text-sm text-gray-500">
                      <p>
                        <strong className="text-[#255876]">
                          {t("programs.page.start")}:
                        </strong>{" "}
                        {new Date(program.startDate).toLocaleDateString()}
                      </p>
                      <p>
                        <strong className="text-[#255876]">
                          {t("programs.page.end")}:
                        </strong>{" "}
                        {new Date(program.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <Link
                      to={`/programs/${program._id}`}
                      className="text-[#f2b143] hover:text-[#FFA500] font-semibold mt-2 md:mt-0">
                      {t("programs.page.readMore")} →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

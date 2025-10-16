import { Link } from "react-router-dom";
import { Rocket, Laptop, Coins } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useProgramStore } from "../../store/programStore";
import { useEffect } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";



export default function ProgramsSection() {
  const { t } = useTranslation();
  const { programs, fetchPrograms, loading } = useProgramStore();

  // Fetch programs if not loaded
  useEffect(() => {
    if (programs.length === 0) fetchPrograms();
  }, [fetchPrograms, programs.length]);

  if (loading) return <LoadingSpinner />;

  const latestPrograms = programs.slice(0, 3);

  if (latestPrograms.length === 0) {
    return (
      <section className="px-4 sm:px-6 md:px-16 py-16 bg-[#ffffff] text-[#255876]">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-10">
            {t("programs.section.heading", "Our Programs")}
          </h2>
          <p className="text-gray-500">
            {t("programs.section.noPrograms", "No programs available")}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 sm:px-6 md:px-16 py-16 bg-[#ffffff] text-[#255876]">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-10 text-center">
          {t("programs.section.heading", "Our Programs")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {latestPrograms.map((program, index) => (
            <motion.div
              key={program._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                delay: index * 0.15,
                type: "spring",
                stiffness: 80,
                damping: 12,
              }}
              className="bg-[#FBF2E0] rounded-xl shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-1 flex flex-col items-center text-center overflow-hidden">
              {/* Program Image */}
              <div className="w-full h-48">
                <img
                  src={
                    program.image ||
                    "https://via.placeholder.com/400x200?text=No+Image"
                  }
                  alt={program.title}
                  className="w-full h-full object-cover"
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://via.placeholder.com/400x200?text=No+Image")
                  }
                />
              </div>

              {/* Title & Description */}
              <div className="p-6 flex flex-col items-center">
                <h3 className="text-xl sm:text-lg md:text-xl font-semibold mb-2 text-[#255876]">
                  {program.title}
                </h3>
                <p className="text-[#255876]/80 text-sm sm:text-base mb-4">
                  {program.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/programs"
            className="inline-block px-6 py-3 bg-[#FFA500] text-[#02587d] font-semibold rounded-lg shadow-md hover:bg-[#f2b143] transition transform hover:scale-105">
            {t("programs.section.cta", "View All Programs")}
          </Link>
        </div>
      </div>
    </section>
  );
}

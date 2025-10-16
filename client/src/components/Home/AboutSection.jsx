import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function AboutSection() {
  const { t } = useTranslation();

  return (
    <section className="relative bg-[#025d7a] text-[#ffffff] overflow-hidden ">
      {/* Top curved divider */}
      <div className="absolute top-0 w-full overflow-hidden leading-[0] pointer-events-none">
        <svg
          className="w-full h-32 block"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none">
          <defs>
            <linearGradient
              id="curveGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>
          <path
            fill="url(#curveGradient)"
            d="M0,224L48,202.7C96,181,192,139,288,138.7C384,139,480,181,576,197.3C672,213,768,203,864,186.7C960,171,1056,149,1152,138.7C1248,128,1344,128,1392,128L1440,128L1440,0L0,0Z"></path>
        </svg>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-20 sm:py-24 md:py-28 relative z-10">
        {/* Heading */}
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 text-center md:text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}>
          {t("about.missionTitle")}
        </motion.h2>

        {/* Paragraph */}
        <motion.p
          className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-full md:max-w-3xl mx-auto md:mx-0 text-center md:text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}>
          {t("about.missionDescription")}
        </motion.p>
      </div>
    </section>
  );
}

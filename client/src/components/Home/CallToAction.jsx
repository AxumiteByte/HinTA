import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function CallToAction() {
  const { t } = useTranslation();

  return (
    <motion.section
      className="text-center bg-gradient-to-tr from-[#255876] to-[#f2b143] py-16 rounded-3xl shadow-2xl relative z-20 mx-6 md:mx-16 -mb-10 md:-mb-22"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        borderBottomLeftRadius: "3rem",
        borderBottomRightRadius: "3rem",
      }}>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        {t("callToAction.title")}
      </h2>
      <p className="text-lg text-white max-w-2xl mx-auto mb-6">
        {t("callToAction.description")}
      </p>
      <Link
        to="/signup"
        className="inline-block px-8 py-3 bg-[#FFA500] text-[#255876] font-semibold rounded-xl shadow-xl hover:shadow-2xl hover:bg-[#f2b143] transition transform duration-300">
        {t("callToAction.cta")}
      </Link>
      <a
        href="/contact"
        className="inline-block ml-6 px-8 py-3 bg-[#FFA500] text-[#255876] font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:bg-[#f2b143] transition transform duration-300">
        {t("aboutPage.cta.button", "Contact Us")}
      </a>
    </motion.section>
  );
}

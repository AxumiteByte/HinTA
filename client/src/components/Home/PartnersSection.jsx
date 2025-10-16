import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function PartnersSection() {
  const { t } = useTranslation();

  const partners = [
    { src: "/partners/INTELEGENCEpng.png", alt: t("partners.partner1") },
    { src: "/partners/INSA-1874410537.jpg", alt: t("partners.partner2") },
    { src: "/partners/Eta.png", alt: t("partners.partner3") },
  ];

  return (
    <section className="px-6 md:px-16 py-16 bg-[#ffffff] text-center">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-3xl font-semibold mb-10 text-[#02587d]">
          {t("partners.heading")}
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-10">
          {partners.map((partner, index) => (
            <motion.img
              key={index}
              src={partner.src}
              alt={partner.alt}
              title={partner.alt}
              className="h-12 md:h-16 grayscale hover:grayscale-0 hover:scale-105 cursor-pointer transition-transform duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

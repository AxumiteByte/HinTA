import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import api from "../../api/api.js";

export default function NewsSection() {
  const { t } = useTranslation();
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    api.get("/news").then((res) => {
      if (res.data?.data) setNewsList(res.data.data.slice(0, 3)); // show latest 3
    });
  }, []);

  return (
    <section className="px-6 md:px-16 py-16 bg-white text-[#02587d]">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-3xl font-semibold mb-10 text-center">
          {t("news.heading")}
          <span className="block mx-auto mt-2 w-16 h-1 bg-[#FFA500] rounded"></span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {newsList.map((news, index) => (
            <motion.div
              key={news._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.2,
                type: "spring",
                stiffness: 80,
                damping: 12,
              }}
              className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden transition transform hover:-translate-y-2"
            >
              {news.image && (
                <div className="h-40 md:h-48 overflow-hidden">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{news.title}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  {news.author} | {new Date(news.publishedAt).toLocaleDateString()}
                </p>
                <p className="text-gray-700">{news.summary}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/news"
            className="inline-block px-6 py-3 bg-[#FFA500] text-[#02587d] font-semibold rounded-lg shadow-md hover:bg-[#e59400] transition transform hover:scale-105"
          >
            {t("news.cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../api/api.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

export default function News() {
  const { t } = useTranslation();
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/news")
      .then((res) => {
        if (!res.data || !Array.isArray(res.data.data)) {
          throw new Error("Unexpected API response format");
        }
        setNewsList(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError(t("news.page.noNews"));
        setLoading(false);
      });
  }, [t]);

  const formatDate = (dateString) => {
    if (!dateString) return t("news.page.unknownDate", "Unknown date");
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] text-[#253864] px-4 flex flex-col py-12">
      <div className="max-w-screen-xl mx-auto py-12">
        {/* Page Heading */}
        <h1 className="text-4xl font-extrabold mb-10 text-center">
          {t("news.page.innovation")}{" "}
          <span className="text-[#FFA500]">{t("news.page.news")}</span>
        </h1>

        {newsList.length === 0 ? (
          <p className="text-center text-[#4B5563]">{t("news.page.noNews")}</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {newsList.map((news, index) => (
              <motion.article
                key={news._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-transform duration-300">
                {/* Image */}
                {news.image && (
                  <div className="relative w-full aspect-video overflow-hidden">
                    <img
                      src={news.image}
                      alt={news.title || t("news.page.noTitle", "News Image")}
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                      onError={(e) =>
                        (e.currentTarget.src =
                          "https://via.placeholder.com/400x200?text=No+Image")
                      }
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Title with underline accent */}
                  <h2 className="text-2xl font-bold text-[#253864] mb-3 relative inline-block line-clamp-2">
                    {news.title || t("news.page.noTitle", "Untitled")}
                    <span className="absolute left-0 -bottom-1 w-12 h-1 bg-[#FFA500] rounded"></span>
                  </h2>

                  {/* Date */}
                  <p className="text-[#4B5563] text-sm mb-3">
                    {formatDate(news.publishedAt)}
                  </p>

                  {/* Summary */}
                  <p className="text-[#4B5563] text-sm mb-6 line-clamp-3">
                    {news.summary ||
                      (news.content
                        ? news.content.slice(0, 150) + "..."
                        : t("news.page.noSummary", "No summary available"))}
                  </p>

                  {/* Read More */}
                  <Link
                    to={`/news/${news._id}`}
                    className="mt-auto inline-block px-4 py-2 bg-[#FFA500] text-[#253864] rounded-lg font-semibold hover:bg-[#ffb347] transition-colors text-center">
                    {t("news.page.readMore", "Read More")} →
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

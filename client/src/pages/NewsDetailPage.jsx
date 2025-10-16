import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api.js";
import Navbar from "../components/Navbar.jsx";

export default function NewsDetailPage() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get(`/news/${id}`)
      .then((res) => {
        if (!res.data || !res.data.data) {
          throw new Error("News not found");
        }
        setNews(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load news. Please try again later.");
        setLoading(false);
      });
  }, [id]);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-[#253864] bg-[#f8fafc]">
        Loading news...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 bg-[#f8fafc]">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] text-[#253864] px-4 flex flex-col py-12">
      <Navbar />
      <div className="max-w-4xl mx-auto py-12">
        {/* News Card Style */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-[#253864] relative inline-block mb-2">
            {news.title}
            <span className="absolute left-0 -bottom-1 w-12 h-1 bg-[#FFA500] rounded"></span>
          </h1>

          <p className="text-[#4B5563] text-sm">
            {formatDate(news.publishedAt)}
          </p>

          {news.image && (
            <img
              src={news.image}
              alt={news.title}
              className="w-full rounded-xl object-cover max-h-96"
            />
          )}

          <div className="text-[#4B5563] space-y-4 mt-4">
            <p>{news.content}</p>
          </div>

          <Link
            to="/news"
            className="inline-block mt-6 px-4 py-2 bg-[#FFA500] text-[#253864] font-semibold rounded-lg hover:bg-[#ffb347] transition-colors">
            ← Back to News
          </Link>
        </div>
      </div>
    </div>
  );
}

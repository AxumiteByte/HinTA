import { useEffect, useState } from "react";
import { useNewsStore } from "../store/newsStore";
import AdminNewsForm from "../components/AdminNewsForm";
import AdminNewsList from "../components/AdminNewsList";
import toast from "react-hot-toast";

export default function AdminNewsPage() {
  const { news, fetchNews, error } = useNewsStore();
  const [editingNews, setEditingNews] = useState(null);

  // Fetch news on mount
  useEffect(() => {
    fetchNews();
  }, []);

  // Show errors
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  // Reset editing & refresh after save
  const handleNewsSaved = () => {
    setEditingNews(null);
    fetchNews();
  };

  useEffect(() => {
    console.log("News in Admin page:", news);
  }, [news]);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-[#f9fafa] rounded-2xl border shadow-lg mt-8 text-[#f2b143] ">
      <h1 className="text-3xl font-bold text-[#255876] mb-6 text-center">
        Admin Dashboard - News
      </h1>

      <AdminNewsForm
        editingNews={editingNews}
        setEditingNews={setEditingNews}
        onNewsSaved={handleNewsSaved}
      />

      <p className="text-gray-400 text-center mt-2">
        Total news: {news?.length ?? 0}
      </p>

      {news && news.length > 0 ? (
        <AdminNewsList news={news} setEditingNews={setEditingNews} />
      ) : (
        <p className="text-gray-400 text-center mt-4">No news available</p>
      )}
    </div>
  );
}

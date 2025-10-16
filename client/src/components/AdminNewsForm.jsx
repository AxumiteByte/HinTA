import { useState, useEffect } from "react";
import api from "../api/api";
import toast from "react-hot-toast";

const categories = ["Technology", "Innovation", "Research", "Science", "Other"];

export default function AdminNewsForm({ editingNews, setEditingNews, onNewsSaved }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("Other");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingNews) {
      setTitle(editingNews.title || "");
      setContent(editingNews.content || "");
      setImage(editingNews.image || "");
      setCategory(editingNews.category || "Other");
    } else {
      resetForm();
    }
  }, [editingNews]);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setImage("");
    setCategory("Other");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required.");
      return;
    }

    setLoading(true);

    try {
      const payload = { title, content, image, category };

      if (editingNews) {
        await api.put(`/news/${editingNews._id}`, payload);
        toast.success("News updated successfully!");
      } else {
        await api.post("/news", payload);
        toast.success("News created successfully!");
      }

      onNewsSaved();
      resetForm();
    } catch (err) {
      console.error("Error saving news:", err);
      toast.error("Failed to save news. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#f9fafa] p-6 rounded-2xl border mb-6 shadow-[0_10px_25px_-5px_rgba(242,177,67,0.4)]
                 hover:shadow-[0_15px_30px_-10px_rgba(242,177,67,0.5)]
                 transition-shadow duration-300 "
    >
      <h2 className="text-xl font-semibold text-[#FFA500] mb-4">
        {editingNews ? "Edit News" : "Add News"}
      </h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full pl-10 pr-3 py-2 
          bg-[#d5d8d9] 
          rounded-lg border border-[#255876] 
          text-[#255876] placeholder-[#255876] 
          focus:outline-none focus:border-[#f2b143] focus:ring-2 focus:ring-[#f2b143] 
          transition duration-200"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className="w-full pl-10 pr-3 py-2 
          bg-[#d5d8d9] 
          rounded-lg border border-[#255876] 
          text-[#255876] placeholder-[#255876] 
          focus:outline-none focus:border-[#f2b143] focus:ring-2 focus:ring-[#f2b143] 
          transition duration-200"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Image URL</label>
        <input
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Optional image URL"
          className="w-full pl-10 pr-3 py-2 
          bg-[#d5d8d9] 
          rounded-lg border border-[#255876] 
          text-[#255876] placeholder-[#255876] 
          focus:outline-none focus:border-[#f2b143] focus:ring-2 focus:ring-[#f2b143] 
          transition duration-200"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full pl-10 pr-3 py-2 
          bg-[#d5d8d9] 
          rounded-lg border border-[#255876] 
          text-[#255876] placeholder-[#255876] 
          focus:outline-none focus:border-[#f2b143] focus:ring-2 focus:ring-[#f2b143] 
          transition duration-200"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center">
        <button
          type="submit"
          className="py-3 px-4 bg-[#f2b143] text-[#255876] font-bold rounded-lg shadow-md
                       hover:bg-[#d5d8d9] hover:text-[#255876] focus:outline-none focus:ring-2
                       focus:ring-[#f2b143] transition duration-200"
          disabled={loading}
        >
          {loading ? "Saving..." : editingNews ? "Update News" : "Add News"}
        </button>

        {editingNews && (
          <button
            type="button"
            onClick={() => setEditingNews(null)}
            className="ml-4 px-4 py-2 rounded bg-red-500 text-gray-200 font-semibold hover:bg-red-600 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

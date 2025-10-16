// import { useNewsStore } from "../store/newsStore";
// import toast from "react-hot-toast";

// export default function AdminNewsList({ news, setEditingNews }) {
//   const { deleteNews, loading } = useNewsStore();

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this news?")) {
//       try {
//         await deleteNews(id);
//         toast.success("News deleted successfully");
//       } catch (error) {
//         toast.error("Failed to delete news");
//         console.error("Error deleting news:", error);
//       }
//     }
//   };

//   if (!news || news.length === 0) {
//     return <p className="text-gray-400 text-center mt-4">No news available</p>;
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       {news.map((item) => (
//         <div
//           key={item._id}
//           className="bg-[#1b2a45] p-6 rounded-2xl shadow-md border border-[#253864] flex flex-col"
//         >
//           <h3 className="text-xl font-semibold text-green-400 mb-2">{item.title || "Untitled"}</h3>

//           <p className="text-gray-400 text-sm mb-2">
//             {item.publishedAt
//               ? new Date(item.publishedAt).toLocaleDateString()
//               : "Unknown date"}
//           </p>

//           <p className="text-gray-300 mb-4 line-clamp-3">
//             {item.summary || (item.content ? item.content.slice(0, 150) + "..." : "No content")}
//           </p>

//           <div className="flex gap-2 mt-auto">
//             <button
//               onClick={() => setEditingNews(item)}
//               disabled={loading}
//               className="px-4 py-2 rounded bg-green-400 text-gray-900 font-semibold hover:bg-green-500 transition"
//             >
//               Edit
//             </button>
//             <button
//               onClick={() => handleDelete(item._id)}
//               disabled={loading}
//               className="px-4 py-2 rounded bg-red-500 text-gray-200 font-semibold hover:bg-red-600 transition"
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

import { useNewsStore } from "../store/newsStore";
import toast from "react-hot-toast";

export default function AdminNewsList({ news, setEditingNews }) {
  const { deleteNews, loading } = useNewsStore();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this news?")) {
      try {
        await deleteNews(id);
        toast.success("News deleted successfully");
      } catch (error) {
        toast.error("Failed to delete news");
      }
    }
  };

  if (!news || news.length === 0) {
    return <p className="text-gray-400 text-center mt-4">No news available</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      {news.map((item) => (
        <div
          key={item._id || item.id}
          className="bg-[#255876] p-6 rounded-2xl shadow-md border border-[#253864] flex flex-col"
        >
          <h3 className="text-xl font-semibold text-[#f2b143] mb-2">
            {item.title || "Untitled"}
          </h3>

          <p className="text-gray-400 text-sm mb-2">
            {item.publishedAt
              ? new Date(item.publishedAt).toLocaleDateString()
              : "Unknown date"}
          </p>

          <p className="text-gray-300 mb-4 line-clamp-3">
            {item.summary ||
              (item.content ? item.content.slice(0, 150) + "..." : "No content")}
          </p>

          <div className="flex gap-2 mt-auto">
            <button
              onClick={() => setEditingNews(item)}
              disabled={loading}
              className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-gray-900 font-semibold transition"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(item._id)}
              disabled={loading}
              className="px-4 py-2 rounded bg-red-500 text-gray-200 font-semibold hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

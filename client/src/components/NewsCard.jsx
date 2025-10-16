import { Link } from "react-router-dom";

export default function NewsCard({ news }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col hover:scale-105 transform">
      {/* News Image */}
      {news.imageUrl && (
        <img
          src={news.imageUrl}
          alt={news.title}
          className="w-full h-56 object-cover"
        />
      )}

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Title with underline accent */}
        <h2 className="text-2xl font-bold text-[#253864] mb-3 relative inline-block line-clamp-2">
          {news.title}
          <span className="absolute left-0 -bottom-1 w-12 h-1 bg-[#FFA500] rounded"></span>
        </h2>

        {/* Description */}
        <p className="text-[#4B5563] text-sm flex-grow line-clamp-3 mb-4">
          {news.description?.slice(0, 150) || "No description available"}...
        </p>

        {/* Read More Button */}
        <Link
          to={`/news/${news._id}`}
          className="inline-block mt-auto px-4 py-2 bg-[#FFA500] text-[#253864] font-semibold rounded-lg text-center hover:bg-[#ffb347] transition-colors duration-300"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
}

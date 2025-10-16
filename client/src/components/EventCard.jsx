import { Link } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";

export default function EventCard({ event }) {
  return (
    <Link to={`/events/${event._id}`} className="block group">
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col">
        {/* Event Image */}
        {event.image && (
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h2 className="text-2xl font-bold text-[#253864] mb-3 line-clamp-2 relative inline-block">
            {event.title}
            <span className="absolute left-0 -bottom-1 w-12 h-1 bg-[#FFA500] rounded"></span>
          </h2>

          <div className="flex items-center text-[#253864]/80 text-sm mb-2">
            <Calendar className="w-4 h-4 mr-2" />
            {new Date(event.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>

          {event.location && (
            <div className="flex items-center text-gray-500 text-sm mb-3">
              <MapPin className="w-4 h-4 mr-2" />
              {event.location}
            </div>
          )}

          <p className="text-gray-600 text-sm flex-grow line-clamp-3">
            {event.description}
          </p>

          {event.status && (
            <span
              className={`inline-block mt-4 px-3 py-1 text-xs font-semibold rounded-full self-start ${
                event.status === "Upcoming"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-600"
              }`}>
              {event.status}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

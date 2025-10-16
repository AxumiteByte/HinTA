import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api.js";
import Navbar from "../components/Navbar.jsx";


export default function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get(`/events/${id}`)
      .then((res) => {
        if (!res.data) {
          throw new Error("Event not found");
        }
        setEvent(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load event. Please try again later.");
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
      <div className="min-h-screen flex items-center justify-center text-[#253864] bg-[#f9fafb]">
        Loading event...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 bg-[#f9fafb]">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen w-full bg-[#f9fafb] text-[#253864] py-12">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-6 text-[#253864] relative inline-block">
          {event.title}
          <span className="absolute left-0 -bottom-2 w-16 h-1 bg-[#FFA500] rounded"></span>
        </h1>

        {/* Date & Location */}
        <p className="text-[#6B7280] mb-2">{formatDate(event.date)}</p>
        {event.location && (
          <p className="text-[#6B7280] mb-4">📍 {event.location}</p>
        )}

        {/* Event Image */}
        {event.image && (
          <img
            src={event.image}
            alt={event.title}
            className="w-full rounded-lg mb-6 object-cover max-h-96 shadow-md"
          />
        )}

        {/* Description */}
        <div className="text-[#374151] space-y-4">
          <p>{event.description}</p>
        </div>

        {/* Status Tag */}
        {event.status && (
          <span
            className={`inline-block mt-4 px-3 py-1 text-xs font-semibold rounded-full ${
              event.status === "Upcoming"
                ? "bg-green-100 text-green-700"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {event.status}
          </span>
        )}

        {/* Back Link */}
        <Link
          to="/events"
          className="block mt-6 text-[#FFA500] hover:text-[#e69500] font-medium"
        >
          ← Back to Events
        </Link>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useEventStore } from "../../store/eventStore";
import { useEffect } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function EventsSection() {
  const { t } = useTranslation();
  const { events, fetchEvents, loading } = useEventStore();

  useEffect(() => {
    if (events.length === 0) fetchEvents();
  }, [fetchEvents, events.length]);

  if (loading) return <LoadingSpinner />;

  const latestEvents = events.slice(0, 3);

  if (latestEvents.length === 0) {
    return (
      <section className="px-6 md:px-16 py-16 bg-white text-[#02587d]">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-10">
            {t("events.upcomingTitle", "Upcoming Events")}
          </h2>
          <p className="text-gray-500">
            {t("events.noEvents", "No events available")}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 md:px-16 py-16 bg-white text-[#02587d]">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-3xl font-semibold mb-10 text-center text-[#02587d]">
          {t("events.upcomingTitle", "Upcoming Events")}
          <span className="block mx-auto mt-2 w-16 h-1 bg-[#FFA500] rounded"></span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {latestEvents.map((event, index) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                delay: index * 0.2,
                type: "spring",
                stiffness: 80,
                damping: 12,
              }}
              className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden transition transform hover:-translate-y-2"
            >
              <div className="h-40 md:h-48 lg:h-56 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://via.placeholder.com/600x400?text=No+Image")
                  }
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-[#253864] relative inline-block">
                  {event.title}
                  <span className="absolute left-0 -bottom-1 w-12 h-1 bg-[#FFA500] rounded"></span>
                </h3>
                <p className="mb-1 text-[#253864]/80">
                  {new Date(event.date).toLocaleDateString()} | {event.location}
                </p>
                <p className="text-[#253864]/80">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/events"
            className="inline-block px-6 py-3 bg-[#FFA500] text-[#02587d] font-semibold rounded-lg shadow-md hover:bg-[#e59400] transition transform hover:scale-105"
          >
            {t("events.viewAllCTA", "View All Events")}
          </Link>
        </div>
      </div>
    </section>
  );
}

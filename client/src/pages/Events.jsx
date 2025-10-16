import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import api from "../api/api.js";
import EventCard from "../components/EventCard";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Events() {
  const { t } = useTranslation();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/events")
      .then((res) => {
        if (!res.data) throw new Error("No events found");
        setEvents(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError(t("events.page.noEvents"));
        setLoading(false);
      });
  }, [t]);

  if (loading) return <LoadingSpinner />;

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] text-red-500">
        {error}
      </div>
    );

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] text-[#253864] flex flex-col py-12">
      {/* Page Header */}
      <div className="max-w-screen-xl mx-auto py-16 px-4 text-center">
        <h1 className="text-4xl font-extrabold text-[#253864]">
          {t("events.page.pageTitle")}{" "}
          <span className="text-[#FFA500]">{t("events.page.halfTitle")}</span>
        </h1>
        {t("events.page.description") && (
          <p className="mt-3 text-[#4B5563] text-lg">
            {t("events.page.description")}
          </p>
        )}
      </div>

      {/* Events */}
      <div className="flex-grow max-w-screen-xl mx-auto px-4 pb-20">
        {events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-[#4B5563]">
            <p className="text-lg">{t("events.page.noEvents")}</p>
            <span className="text-6xl mt-4">📭</span>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


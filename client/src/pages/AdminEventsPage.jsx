import { useEffect, useState } from "react";
import { useEventStore } from "../store/eventStore";
import AdminEventForm from "../components/AdminEventForm";
import AdminEventList from "../components/AdminEventList";
import toast from "react-hot-toast";

export default function AdminEventsPage() {
  const { events, fetchEvents, error } = useEventStore();
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-[#f9fafa] rounded-2xl border  shadow-lg mt-8">
      <h1 className="text-3xl font-bold text-[#255876] mb-6 text-center">
        Admin Dashboard - Events
      </h1>

      <AdminEventForm
        editingEvent={editingEvent}
        setEditingEvent={setEditingEvent}
      />

      <AdminEventList events={events} setEditingEvent={setEditingEvent} />
    </div>
  );
}

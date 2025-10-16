import { useEventStore } from "../store/eventStore";
import { Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminEventList({ events, setEditingEvent }) {
  const { deleteEvent } = useEventStore();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteEvent(id);
        toast.success("Event deleted");
      } catch (error) {
        toast.error("Error deleting event");
        throw error;
      }
    }
  };

  return (
    <div
      className="bg-[#255876] p-6 rounded-2xl border mb-6 shadow-[0_10px_25px_-5px_rgba(242,177,67,0.4)]
                 hover:shadow-[0_15px_30px_-10px_rgba(242,177,67,0.5)]
                 transition-shadow duration-300 ">
      <h2 className="text-xl font-semibold text-[#f2b143] mb-6">Event List</h2>
      {events.length === 0 ? (
        <p className="text-gray-400">No events found</p>
      ) : (
        <table className="w-full text-left ">
          <thead>
            <tr className="text-[#f9fafa] border-b border-[#253864] ">
              <th className="py-2">Title</th>
              <th className="py-2">Location</th>
              <th className="py-2">Dates</th>
              <th className="py-2">Status</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id} className="border-b border-[#253864] ">
                <td className="py-2 text-[#f9fafa] font-medium">
                  {event.title}
                </td>
                <td className="py-2 text-[#f9fafa]/80">{event.location}</td>
                <td className="py-2 text-[#fff]/80">
                  {new Date(event.startDate).toLocaleDateString()} -{" "}
                  {new Date(event.endDate).toLocaleDateString()}
                </td>
                <td
                  className={`py-2 font-semibold ${
                    event.status === "Upcoming"
                      ? "text-green-400"
                      : event.status === "Ongoing"
                      ? "text-yellow-400"
                      : "text-gray-400"
                  }`}>
                  {event.status}
                </td>
                <td className="py-2 flex gap-3">
                  <button
                    onClick={() => setEditingEvent(event)}
                    className="text-[#FFA500] hover:text-[#ffb347] transition-colors">
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="text-red-400 hover:text-red-500 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

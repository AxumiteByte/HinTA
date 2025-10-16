import { useState, useEffect } from "react";
import { useEventStore } from "../store/eventStore";
import toast from "react-hot-toast";

export default function AdminEventForm({ editingEvent, setEditingEvent }) {
  const { createEvent, updateEvent } = useEventStore();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    startDate: "",
    endDate: "",
    category: "Other",
    status: "Upcoming",
    image: "",
  });

  useEffect(() => {
    if (editingEvent) {
      setFormData({
        ...editingEvent,
        startDate: editingEvent.startDate?.slice(0, 10),
        endDate: editingEvent.endDate?.slice(0, 10),
      });
    }
  }, [editingEvent]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEvent) {
        await updateEvent(editingEvent._id, formData);
        toast.success("Event updated");
      } else {
        await createEvent(formData);
        toast.success("Event created");
      }
      setFormData({
        title: "",
        description: "",
        location: "",
        startDate: "",
        endDate: "",
        category: "Other",
        status: "Upcoming",
        image: "",
      });
      setEditingEvent(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error saving event");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#f9fafa] p-6 rounded-2xl border mb-6 shadow-[0_10px_25px_-5px_rgba(242,177,67,0.4)]
                 hover:shadow-[0_15px_30px_-10px_rgba(242,177,67,0.5)]
                 transition-shadow duration-300 ">
      <div className="grid gap-6 md:grid-cols-2">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full pl-10 pr-3 py-2 
          bg-[#d5d8d9] 
          rounded-lg border border-[#255876] 
          text-[#255876] placeholder-[#255876] 
          focus:outline-none focus:border-[#f2b143] focus:ring-2 focus:ring-[#f2b143] 
          transition duration-200"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full pl-10 pr-3 py-2 
          bg-[#d5d8d9] 
          rounded-lg border border-[#255876] 
          text-[#255876] placeholder-[#255876] 
          focus:outline-none focus:border-[#f2b143] focus:ring-2 focus:ring-[#f2b143] 
          transition duration-200"
          required
        />
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="w-full pl-10 pr-3 py-2 
          bg-[#d5d8d9] 
          rounded-lg border border-[#255876] 
          text-[#255876] placeholder-[#255876] 
          focus:outline-none focus:border-[#f2b143] focus:ring-2 focus:ring-[#f2b143] 
          transition duration-200"
          required
        />
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          className="w-full pl-10 pr-3 py-2 
          bg-[#d5d8d9] 
          rounded-lg border border-[#255876] 
          text-[#255876] placeholder-[#255876] 
          focus:outline-none focus:border-[#f2b143] focus:ring-2 focus:ring-[#f2b143] 
          transition duration-200"
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full pl-10 pr-3 py-2 
          bg-[#d5d8d9] 
          rounded-lg border border-[#255876] 
          text-[#255876] placeholder-[#255876] 
          focus:outline-none focus:border-[#f2b143] focus:ring-2 focus:ring-[#f2b143] 
          transition duration-200">
          <option>Conference</option>
          <option>Workshop</option>
          <option>Webinar</option>
          <option>Hackathon</option>
          <option>Other</option>
        </select>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full pl-10 pr-3 py-2 
          bg-[#d5d8d9] 
          rounded-lg border border-[#255876] 
          text-[#255876] placeholder-[#255876] 
          focus:outline-none focus:border-[#f2b143] focus:ring-2 focus:ring-[#f2b143] 
          transition duration-200">
          <option>Upcoming</option>
          <option>Ongoing</option>
          <option>Completed</option>
        </select>
      </div>

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full pl-10 pr-3 py-2 mt-6
          bg-[#d5d8d9] 
          rounded-lg border border-[#255876] 
          text-[#255876] placeholder-[#255876] 
          focus:outline-none focus:border-[#f2b143] focus:ring-2 focus:ring-[#f2b143] 
          transition duration-200"
        required
      />

      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
        className="w-full pl-10 pr-3 py-2 mt-4
          bg-[#d5d8d9] 
          rounded-lg border border-[#255876] 
          text-[#255876] placeholder-[#255876] 
          focus:outline-none focus:border-[#f2b143] focus:ring-2 focus:ring-[#f2b143] 
          transition duration-200"
      />

      <button
        type="submit"
        className="mt-4 py-3 px-4 bg-[#f2b143] text-[#255876] font-bold rounded-lg shadow-md
                       hover:bg-[#d5d8d9] hover:text-[#255876] focus:outline-none focus:ring-2
                       focus:ring-[#f2b143] transition duration-200">
        {editingEvent ? "Update Event" : "Add Event"}
      </button>

      {editingEvent && (
        <button
          type="button"
          onClick={() => setEditingEvent(null)}
          className="flex-1 ml-6 px-6 py-2 bg-red-500 hover:bg-red-600 text-gray-200 font-semibold rounded transition">
          Cancel
        </button>
      )}
    </form>
  );
}

import { useState, useEffect } from "react";
import { useProgramStore } from "../store/programStore";
import toast from "react-hot-toast";

const categories = [
  "Startup",
  "Bootcamp",
  "Challenge",
  "Training",
  "Technology",
  "Education",
  "Health",
  "Business",
  "Environment",
  "Other",
];
const statuses = ["Upcoming", "Ongoing", "Completed"];

export default function AdminProgramForm({
  editingProgram,
  setEditingProgram,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[4]);
  const [status, setStatus] = useState(statuses[0]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [image, setImage] = useState("");

  const { createProgram, updateProgram } = useProgramStore();

  useEffect(() => {
    if (editingProgram) {
      setTitle(editingProgram.title);
      setDescription(editingProgram.description);
      setCategory(editingProgram.category);
      setStatus(editingProgram.status);
      setStartDate(editingProgram.startDate?.slice(0, 10) || "");
      setEndDate(editingProgram.endDate?.slice(0, 10) || "");
      setImage(editingProgram.image || "");
    } else {
      setTitle("");
      setDescription("");
      setCategory(categories[4]);
      setStatus(statuses[0]);
      setStartDate("");
      setEndDate("");
      setImage("");
    }
  }, [editingProgram]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !description ||
      !category ||
      !status ||
      !startDate ||
      !endDate
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const programData = {
      title,
      description,
      category,
      status,
      startDate,
      endDate,
      image,
    };

    try {
      if (editingProgram) {
        await updateProgram(editingProgram._id, programData);
        toast.success("Program updated successfully");
      } else {
        await createProgram(programData);
        toast.success("Program created successfully");
      }
      setEditingProgram(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 py-6 bg-[#f9fafa] p-6 rounded-2xl border mb-6 shadow-[0_10px_25px_-5px_rgba(242,177,67,0.4)]
                 hover:shadow-[0_15px_30px_-10px_rgba(242,177,67,0.5)]
                 transition-shadow duration-300 ">
      <div>
        <label className="block mb-2 font-semibold text-[#f2b143] ">
          Title *
        </label>
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
          placeholder="Program title"
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold text-[#f2b143]">
          Description *
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full pl-10 pr-3 py-2 
          bg-[#d5d8d9] 
          rounded-lg border border-[#255876] 
          text-[#255876] placeholder-[#255876] 
          focus:outline-none focus:border-[#f2b143] focus:ring-2 focus:ring-[#f2b143] 
          transition duration-200"
          placeholder="Program description"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-semibold text-[#f2b143] ">
            Category *
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full pl-10 pr-3 py-2 
          bg-[#d5d8d9] 
          rounded-lg border border-[#255876] 
          text-[#255876] placeholder-[#255876] 
          focus:outline-none focus:border-[#f2b143] focus:ring-2 focus:ring-[#f2b143] 
          transition duration-200"
            required>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-semibold text-[#f2b143] ">
            Status *
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full pl-10 pr-3 py-2 
          bg-[#d5d8d9] 
          rounded-lg border border-[#255876] 
          text-[#255876] placeholder-[#255876] 
          focus:outline-none focus:border-[#f2b143] focus:ring-2 focus:ring-[#f2b143] 
          transition duration-200"
            required>
            {statuses.map((stat) => (
              <option key={stat} value={stat}>
                {stat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-semibold text-[#f2b143] ">
            Start Date *
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full pl-10 pr-3 py-2 
          bg-[#d5d8d9] 
          rounded-lg border border-[#255876] 
          text-[#255876] placeholder-[#255876] 
          focus:outline-none focus:border-[#f2b143] focus:ring-2 focus:ring-[#f2b143] 
          transition duration-200"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-[#f2b143] ">
            End Date *
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full pl-10 pr-3 py-2 
          bg-[#d5d8d9] 
          rounded-lg border border-[#255876] 
          text-[#255876] placeholder-[#255876] 
          focus:outline-none focus:border-[#f2b143] focus:ring-2 focus:ring-[#f2b143] 
          transition duration-200"
            required
          />
        </div>
      </div>

      <div>
        <label className="block mb-2 font-semibold text-[#f2b143] ">
          Image URL
        </label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full pl-10 pr-3 py-2 
          bg-[#d5d8d9] 
          rounded-lg border border-[#255876] 
          text-[#255876] placeholder-[#255876] 
          focus:outline-none focus:border-[#f2b143] focus:ring-2 focus:ring-[#f2b143] 
          transition duration-200"
          placeholder="Program banner image URL"
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          className="py-3 px-4 bg-[#f2b143] text-[#255876] font-bold rounded-lg shadow-md
                       hover:bg-[#d5d8d9] hover:text-[#255876] focus:outline-none focus:ring-2
                       focus:ring-[#f2b143] transition duration-200">
          {editingProgram ? "Update Program" : "Create Program"}
        </button>
        {editingProgram && (
          <button
            type="button"
            onClick={() => setEditingProgram(null)}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-gray-200 font-semibold rounded transition">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

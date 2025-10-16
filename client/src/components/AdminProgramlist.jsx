import { useProgramStore } from "../store/programStore";
import toast from "react-hot-toast";

export default function AdminProgramList({ programs, setEditingProgram }) {
  const { deleteProgram } = useProgramStore();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this program?")) {
      try {
        await deleteProgram(id);
        toast.success("Program deleted");
      } catch {
        toast.error("Failed to delete program");
      }
    }
  };

  if (!programs.length) {
    return <p className="text-gray-400">No programs found.</p>;
  }

  return (
    <ul className="space-y-4">
      {programs.map((program) => (
        <li
          key={program._id}
          className="flex justify-between items-center bg-[#255876] p-4 rounded-2xl border">
          <span className="text-[#f9fafa] font-semibold">{program.title}</span>
          <div className="flex gap-4">
            <button
              onClick={() => setEditingProgram(program)}
              className="text-blue-500 hover:text-blue-600 font-medium transition-colors">
              Edit
            </button>
            <button
              onClick={() => handleDelete(program._id)}
              className="text-red-500 hover:text-red-600 font-medium transition-colors">
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

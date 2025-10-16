import { useEffect, useState } from "react";
import api from "../api/api.js";
import { toast } from "react-hot-toast";

export default function AdminDirectoratePage() {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    position: "",
    bio: "",
    image: "",
    email: "",
    phone: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
    try {
      const res = await api.get("/directorate");
      setMembers(res.data.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load members");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/directorate/${editingId}`, form);
        toast.success("Member updated");
      } else {
        await api.post("/directorate", form);
        toast.success("Member added");
      }
      setForm({
        name: "",
        position: "",
        bio: "",
        image: "",
        email: "",
        phone: "",
      });
      setEditingId(null);
      fetchMembers();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save member");
    }
  };

  const handleEdit = (member) => {
    setForm({
      name: member.name,
      position: member.position,
      bio: member.bio,
      image: member.image,
      email: member.email || "",
      phone: member.phone || "",
    });
    setEditingId(member._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/directorate/${id}`);
      toast.success("Member deleted");
      fetchMembers();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete member");
    }
  };

  if (loading)
    return <p className="text-center mt-20 text-gray-400">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-[#f9fafa] rounded-2xl border  shadow-lg mt-8">
      <h1 className="text-3xl font-bold text-[#255876] mb-8 text-center">
        Admin Dashboard - Directorate
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#f9fafa] p-6 rounded-2xl border mb-6 shadow-[0_10px_25px_-5px_rgba(242,177,67,0.4)]
                 hover:shadow-[0_15px_30px_-10px_rgba(242,177,67,0.5)]
                 transition-shadow duration-300 ">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full pl-10 pr-3 py-2 mb-3
          bg-[#d5d8d9] 
          rounded-lg border border-[#255876] 
          text-[#255876] placeholder-[#255876] 
          focus:outline-none focus:border-[#f2b143] focus:ring-2 focus:ring-[#f2b143] 
          transition duration-200"
          required
        />
        <input
          type="text"
          placeholder="Position"
          value={form.position}
          onChange={(e) => setForm({ ...form, position: e.target.value })}
          className="w-full pl-10 pr-3 py-2 mb-3
          bg-[#d5d8d9] 
          rounded-lg border border-[#255876] 
          text-[#255876] placeholder-[#255876] 
          focus:outline-none focus:border-[#f2b143] focus:ring-2 focus:ring-[#f2b143] 
          transition duration-200"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full pl-10 pr-3 py-2 mb-3
          bg-[#d5d8d9] 
          rounded-lg border border-[#255876] 
          text-[#255876] placeholder-[#255876] 
          focus:outline-none focus:border-[#f2b143] focus:ring-2 focus:ring-[#f2b143] 
          transition duration-200"
        />
        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full pl-10 pr-3 py-2 mb-3
          bg-[#d5d8d9] 
          rounded-lg border border-[#255876] 
          text-[#255876] placeholder-[#255876] 
          focus:outline-none focus:border-[#f2b143] focus:ring-2 focus:ring-[#f2b143] 
          transition duration-200"
        />
        <textarea
          placeholder="Bio"
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
          className="w-full pl-10 pr-3 py-2 mb-3
          bg-[#d5d8d9] 
          rounded-lg border border-[#255876] 
          text-[#255876] placeholder-[#255876] 
          focus:outline-none focus:border-[#f2b143] focus:ring-2 focus:ring-[#f2b143] 
          transition duration-200 "
        />

        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="w-full pl-10 pr-3 py-2 mb-3
          bg-[#d5d8d9] 
          rounded-lg border border-[#255876] 
          text-[#255876] placeholder-[#255876] 
          focus:outline-none focus:border-[#f2b143] focus:ring-2 focus:ring-[#f2b143] 
          transition duration-200"
        />
        <div className="flex gap-4">
          <button
            type="submit"
            className="mt-4 py-3 px-4 bg-[#f2b143] text-[#255876] font-bold rounded-lg shadow-md
                       hover:bg-[#d5d8d9] hover:text-[#255876] focus:outline-none focus:ring-2
                       focus:ring-[#f2b143] transition duration-200">
            {editingId ? "Update Member" : "Add Member"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => setEditingId(null)}
              className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-gray-200 font-semibold rounded transition">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* List */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <div
            key={member._id}
            className="bg-[#255876] p-6 rounded-2xl border border-gray-700 shadow flex flex-col items-center text-center">
            <img
              src={member.image}
              alt={member.name}
              className="w-28 h-28 rounded-full mb-4 object-cover"
            />
            <h2 className="text-lg font-semibold text-[#FFA500]">
              {member.name}
            </h2>
            <p className="text-gray-300">{member.position}</p>
            {member.email && (
              <p className="text-gray-400 text-sm">{member.email}</p>
            )}
            {member.phone && (
              <p className="text-gray-400 text-sm">{member.phone}</p>
            )}
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleEdit(member)}
                className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-gray-100 font-semibold rounded transition">
                Edit
              </button>
              <button
                onClick={() => handleDelete(member._id)}
                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-gray-100 font-semibold rounded transition">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

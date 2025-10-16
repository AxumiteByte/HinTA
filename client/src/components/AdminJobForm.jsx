import { useState, useEffect } from "react";
import { useJobStore } from "../store/jobStore";

export default function AdminJobForm({ editingJob, setEditingJob, onJobSaved }) {
  const { createJob, updateJob } = useJobStore();
  const [form, setForm] = useState({
    title: "",
    department: "",
    location: "",
    type: "",
    shortDescription: "",
    details: "",
    active: true
  });

  useEffect(() => {
    if (editingJob) setForm(editingJob);
  }, [editingJob]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editingJob) await updateJob(editingJob._id, form);
      else await createJob(form);

      setForm({
        title: "",
        department: "",
        location: "",
        type: "",
        shortDescription: "",
        details: "",
        active: true
      });
      setEditingJob(null);
      onJobSaved();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg bg-white shadow space-y-3">
      <h2 className="text-xl font-semibold">{editingJob ? "Edit Job" : "Create Job"}</h2>

      <input
        type="text"
        name="title"
        placeholder="Job Title"
        value={form.title}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        name="department"
        placeholder="Department"
        value={form.department}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        name="type"
        placeholder="Full-time / Part-time"
        value={form.type}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <textarea
        name="shortDescription"
        placeholder="Short Description"
        value={form.shortDescription}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <textarea
        name="details"
        placeholder="Full Details"
        value={form.details}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="active"
          checked={form.active}
          onChange={handleChange}
        />
        <span>Active (visible on vacancy page)</span>
      </label>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {editingJob ? "Update Job" : "Create Job"}
      </button>
    </form>
  );
}

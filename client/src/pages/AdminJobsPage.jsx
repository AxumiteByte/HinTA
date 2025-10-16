import { useEffect, useState } from "react";
import { useJobStore } from "../store/jobStore";
import AdminJobForm from "../components/AdminJobForm";
import AdminJobList from "../components/AdminJobList";
import toast from "react-hot-toast";

export default function AdminJobsPage() {
  const { jobs, fetchJobs, error } = useJobStore();
  const [editingJob, setEditingJob] = useState(null);

  // Fetch jobs on mount
  useEffect(() => {
    fetchJobs();
  }, []);

  // Show errors
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  // Reset editing & refresh after save
  const handleJobSaved = () => {
    setEditingJob(null);
    fetchJobs();
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-[#f9fafa] rounded-2xl border shadow-lg mt-8">
      <h1 className="text-3xl font-bold text-[#255876] mb-6 text-center">
        Admin Dashboard - Jobs
      </h1>

      <AdminJobForm
        editingJob={editingJob}
        setEditingJob={setEditingJob}
        onJobSaved={handleJobSaved}
      />

      <p className="text-gray-400 text-center mt-2">
        Total jobs: {jobs?.length ?? 0}
      </p>

      {jobs && jobs.length > 0 ? (
        <AdminJobList jobs={jobs} setEditingJob={setEditingJob} />
      ) : (
        <p className="text-gray-400 text-center mt-4">No jobs available</p>
      )}
    </div>
  );
}

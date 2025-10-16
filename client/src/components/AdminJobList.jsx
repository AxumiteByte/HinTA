export default function AdminJobList({ jobs, setEditingJob }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {jobs.map(job => (
        <div key={job._id} className="p-4 border rounded-lg shadow flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-lg">{job.title}</h3>
            <p className="text-gray-600">{job.department} • {job.location}</p>
            <p className="text-gray-700 mt-1">{job.shortDescription}</p>
          </div>
          <div className="mt-3 flex space-x-2">
            <button
              onClick={() => setEditingJob(job)}
              className="bg-yellow-400 px-3 py-1 rounded text-white"
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

import Job from "../models/Job.js";

export const listJobs = async (req, res) => {
  const jobs = await Job.find({ active: true }).sort({ createdAt: -1 });
  res.json(jobs);
};

export const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: "Job not found" });
  res.json(job);
};

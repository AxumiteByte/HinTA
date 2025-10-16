import express from "express";
import { Job } from "../models/Job.js";

const router = express.Router();

// Admin: create a new job
router.post("/", async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json({ data: job });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: get all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json({ data: jobs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Public: get only active jobs for Vacancies page
router.get("/active", async (req, res) => {
  try {
    const jobs = await Job.find({ active: true }).sort({ createdAt: -1 });
    res.json({ data: jobs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: update a job
router.put("/:id", async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ data: job });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: delete a job
router.delete("/:id", async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

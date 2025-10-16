import express from "express";
import Application from "../models/Application.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Create or Update application
router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const { name, email, coverLetter, jobId } = req.body;
    if (!req.file) return res.status(400).json({ message: "Resume required" });

    // Check if applicant already applied
    let application = await Application.findOne({ jobId, email });

    const resumePath = `uploads/resumes/${req.file.filename}`;

    if (application) {
      // Update existing application
      application.name = name;
      application.coverLetter = coverLetter;
      application.resumePath = resumePath;
      await application.save();
      return res.status(200).json({ message: "Application updated", data: application });
    }

    // Create new application
    application = new Application({ jobId, name, email, coverLetter, resumePath });
    await application.save();
    res.status(201).json({ message: "Application submitted", data: application });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all applications (admin)
router.get("/", async (req, res) => {
  try {
    const { jobId } = req.query;
    const query = jobId ? { jobId } : {};
    const applications = await Application.find(query).sort({ createdAt: -1 });
    res.json({ data: applications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

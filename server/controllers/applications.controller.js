import Applicant from "../models/Applicant.js";

export const applyJob = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Resume required" });

    const { name, email, coverLetter, jobId } = req.body;

    const application = new Applicant({
      job: jobId || null,
      name,
      email,
      coverLetter,
      resumeUrl: `/uploads/resumes/${req.file.filename}`
    });

    await application.save();
    res.status(201).json({ ok: true, applicationId: application._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

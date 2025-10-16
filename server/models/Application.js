import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    coverLetter: { type: String },
    resumePath: { type: String, required: true },
  },
  { timestamps: true }
);

// Ensure one application per job/email
applicationSchema.index({ jobId: 1, email: 1 }, { unique: true });

export default mongoose.model("Application", applicationSchema);

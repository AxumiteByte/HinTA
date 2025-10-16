import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true }, // Full-time, Part-time, Contract
  shortDescription: { type: String },
  details: { type: String },
  active: { type: Boolean, default: true }, // Only active jobs appear on Vacancies page
}, { timestamps: true });

export const Job = mongoose.model("Job", JobSchema);

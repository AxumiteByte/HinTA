import mongoose from "mongoose";

const programSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Program title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Program description is required"],
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    enum: [
      "Startup",
      "Bootcamp",
      "Challenge",
      "Training",
      "Technology",
      "Education",
      "Health",
      "Business",
      "Environment",
      "Other",
    ],
    default: "Other",
  },
  status: {
    type: String,
    enum: ["Upcoming", "Ongoing", "Completed"],
    default: "Upcoming",
  },
  image: {
    type: String, // URL of program banner
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Program", programSchema);

import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Event title is required"],
    trim: true
  },
  description: {
    type: String,
    required: [true, "Event description is required"]
  },
  location: {
    type: String,
    required: [true, "Event location is required"]
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    enum: ["Conference", "Workshop", "Webinar", "Hackathon", "Other"],
    default: "Other"
  },
  status: {
    type: String,
    enum: ["Upcoming", "Ongoing", "Completed"],
    default: "Upcoming"
  },
  image: {
    type: String, // URL for event banner
    default: ""
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Event", eventSchema);



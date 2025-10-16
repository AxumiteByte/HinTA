import mongoose from "mongoose";

const DirectorateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true }, // changed from title to position
  bio: { type: String },
  image: { type: String }, // URL to image
  email: { type: String },
  phone: { type: String },
}, { timestamps: true });

export default mongoose.model("Directorate", DirectorateSchema);

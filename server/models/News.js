import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a news title"],
    },
    content: {
      type: String,
      required: [true, "Please provide the news content"],
    },
    image: {
      type: String, // URL for the image
      default: "",
    },
    author: {
      type: String,
      default: "Admin",
    },
    category: {
      type: String,
      enum: ["Technology", "Innovation", "Research", "Science", "Other"],
      default: "Other",
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Virtual for summary (first 150 characters of content)
newsSchema.virtual("summary").get(function () {
  if (!this.content) return "";
  return this.content.length > 150 ? this.content.slice(0, 150) + "..." : this.content;
});

// Ensure virtuals are included when converting to JSON
newsSchema.set("toJSON", { virtuals: true });
newsSchema.set("toObject", { virtuals: true });

export default mongoose.model("News", newsSchema);

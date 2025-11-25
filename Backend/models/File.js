import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  name: String,
  url: String,
  type: String,
  size: Number,
}, { timestamps: true });

export default mongoose.model("File", fileSchema);

import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  title: { type: String, required: true },

  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },

  content: { type: String, default: "" },

  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export default mongoose.model("Document", documentSchema);

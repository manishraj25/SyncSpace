import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,

  workspace: { type: mongoose.Schema.Types.ObjectId, ref: "Workspace", required: true },

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  columns: [{ type: mongoose.Schema.Types.ObjectId, ref: "KanbanColumn" }],
  documents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Document" }],
  files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }],
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);

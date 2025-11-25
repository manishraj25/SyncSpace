import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, default: "todo" },

  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  column: { type: mongoose.Schema.Types.ObjectId, ref: "KanbanColumn", required: true },

  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  dueDate: Date,

  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  checklist: [{ type: mongoose.Schema.Types.ObjectId, ref: "ChecklistItem" }]
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);

import mongoose from "mongoose";

const kanbanBoardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  order: { type: Number, default: 0 },

  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },

  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
}, { timestamps: true });

export default mongoose.model("KanbanBoard", kanbanBoardSchema);

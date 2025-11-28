import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  members: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      role: { type: String, enum: ["admin", "manager", "member"], default: "member" }
    }
  ],

  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  chatChannel: { type: mongoose.Schema.Types.ObjectId, ref: "ChatRoom" },
}, { timestamps: true });

export default mongoose.model("Workspace", workspaceSchema);

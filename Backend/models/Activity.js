import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  action: {
    type: String,
    required: true, 
    enum: [
      "TASK_CREATED",
      "TASK_UPDATED",
      "TASK_DELETED",
      "TASK_MOVED",
      "STATUS_CHANGED",
      "CHECKLIST_UPDATED",
      "FILE_UPLOADED",
      "WORKSPACE_CREATED",
      "PROJECT_CREATED",
      "BOARD_CREATED"
    ]
  },
  description: {
    type: String,
    required: true
  },
  relatedTask: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task"
  },
  relatedWorkspace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workspace"
  },
  relatedProject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  }
}, { timestamps: true });

export default mongoose.model("Activity", activitySchema);

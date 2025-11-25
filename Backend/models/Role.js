import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ["ADMIN", "MANAGER", "MEMBER", "VIEWER"]
  },
  permissions: [
    {
      type: String,
      enum: [
        "CREATE_TASK",
        "EDIT_TASK",
        "DELETE_TASK",
        "MOVE_TASK",
        "UPLOAD_FILES",
        "MANAGE_WORKSPACES",
        "MANAGE_PROJECTS",
        "VIEW_ONLY"
      ]
    }
  ]
}, { timestamps: true });

export default mongoose.model("Role", roleSchema);

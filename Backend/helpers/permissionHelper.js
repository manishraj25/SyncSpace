import { PERMISSIONS } from "../config/permissions.js";
import Workspace from "../models/Workspace.js";

export const hasPermission = async (userId, workspaceId, action, targetId = null) => {
  const workspace = await Workspace.findById(workspaceId);
  if (!workspace) throw new Error("Workspace not found");

  const member = workspace.members.find(m => m.user.toString() === userId);
  if (!member) throw new Error("Not a workspace member");

  const role = member.role;

  // Special check for MEMBER editing own tasks
  if (role === "MEMBER" && action === "TASK_EDIT") {
    return { allowed: true, role, ownOnly: true }; // controller must check targetId
  }

  if (!PERMISSIONS[role].includes(action)) return { allowed: false };
  return { allowed: true, role };
};

import express from "express";
import {
  createWorkspace,
  editWorkspace,
  deleteWorkspace,
  addMember,
  removeMember,
  changeMemberRole,
  getWorkspaceMembers
} from "../controllers/workspaceController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const workspaceRouter = express.Router();

// ---------------- WORKSPACE ROUTES ----------------

// Create a new workspace
workspaceRouter.post("/", isAuthenticated, createWorkspace);

// Edit workspace info (Admin only)
workspaceRouter.put("/:workspaceId", isAuthenticated, editWorkspace);

// Delete workspace (Admin only)
workspaceRouter.delete("/:workspaceId", isAuthenticated, deleteWorkspace);

// Add member to workspace (Admin only)
workspaceRouter.post("/:workspaceId/add-member", isAuthenticated, addMember);

// Remove member from workspace (Admin only)
workspaceRouter.post("/:workspaceId/remove-member", isAuthenticated, removeMember);

// Change member role in workspace (Admin only)
workspaceRouter.post("/:workspaceId/change-role", isAuthenticated, changeMemberRole);

// Get all workspace members
workspaceRouter.get("/:workspaceId/members", isAuthenticated, getWorkspaceMembers);

export default workspaceRouter;

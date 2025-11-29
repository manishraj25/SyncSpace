import express from "express";
import { 
  createProject, 
  getProjects, 
  editProject, 
  deleteProject 
} from "../controllers/projectController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create project (workspace member)
router.post("/", protect, createProject);

// Get all projects in a workspace (workspace member)
router.get("/:workspaceId", protect, getProjects);

// Edit project (admin/manager)
router.put("/:projectId", protect, editProject);

// Delete project (admin only)
router.delete("/:projectId", protect, deleteProject);

export default router;

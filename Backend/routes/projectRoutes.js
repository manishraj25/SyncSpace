import express from "express";
import { 
  createProject, 
  getProjects, 
  editProject, 
  deleteProject 
} from "../controllers/projectController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const ProjectRouter = express.Router();

// Create project (workspace member)
ProjectRouter.post("/", isAuthenticated, createProject);

// Get all projects in a workspace (workspace member)
ProjectRouter.get("/:workspaceId", isAuthenticated, getProjects);

// Edit project (admin/manager)
ProjectRouter.put("/:projectId", isAuthenticated, editProject);

// Delete project (admin only)
ProjectRouter.delete("/:projectId", isAuthenticated, deleteProject);

export default ProjectRouter;

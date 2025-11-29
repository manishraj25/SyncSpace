import Project from "../models/Project.js";
import Workspace from "../models/Workspace.js";
import { PERMISSIONS } from "../config/permissions.js";

// Helper function to check if a user has a permission
const hasPermission = (workspace, userId, permission) => {
  const member = workspace.members.find(m => m.user.toString() === userId);
  if (!member) return false;

  const role = member.role.toUpperCase();
  return PERMISSIONS[role] && PERMISSIONS[role].includes(permission);
};

// ---------------- CREATE PROJECT ----------------
export const createProject = async (req, res) => {
  try {
    const { workspaceId, title, description } = req.body;
    const ws = await Workspace.findById(workspaceId);
    if (!ws || !hasPermission(ws, req.user.id, "PROJECT_CREATE")) {
      return res.status(403).json({ success: false, message: "No permission to create project" });
    }

    const project = await Project.create({
      workspace: workspaceId,
      title,
      description,
      createdBy: req.user.id,
    });

    ws.projects.push(project._id);
    await ws.save();

    res.status(201).json({ success: true, project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ---------------- GET PROJECTS ----------------
export const getProjects = async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const ws = await Workspace.findById(workspaceId).populate("projects");

    if (!ws || !hasPermission(ws, req.user.id, "PROJECT_CREATE")) {
      return res.status(403).json({ success: false, message: "Not a member or no permission" });
    }

    res.json({ success: true, projects: ws.projects });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ---------------- EDIT PROJECT ----------------
export const editProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });

    const ws = await Workspace.findById(project.workspace);
    if (!hasPermission(ws, req.user.id, "PROJECT_EDIT")) {
      return res.status(403).json({ success: false, message: "No permission to edit project" });
    }

    Object.assign(project, req.body);
    await project.save();

    res.json({ success: true, project });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ---------------- DELETE PROJECT ----------------
export const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });

    const ws = await Workspace.findById(project.workspace);
    if (!hasPermission(ws, req.user.id, "PROJECT_DELETE")) {
      return res.status(403).json({ success: false, message: "No permission to delete project" });
    }

    ws.projects = ws.projects.filter(p => p.toString() !== projectId);
    await ws.save();

    await project.remove();
    res.json({ success: true, message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

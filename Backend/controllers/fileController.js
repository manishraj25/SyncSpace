import File from "../models/File.js";
import Project from "../models/Project.js";
import Workspace from "../models/Workspace.js";
import { PERMISSIONS } from "../config/permissions.js";

// ---------------- UPLOAD FILE ----------------
export const uploadFile = async (req, res) => {
  try {
    const { projectId, name, url, type, size } = req.body;
    const project = await Project.findById(projectId);
    const ws = await Workspace.findById(project.workspace);
    const member = ws.members.find(m => m.user.toString() === req.user.id);

    if (!member || !PERMISSIONS[member.role]?.includes("FILE_UPLOAD")) {
      return res.status(403).json({ success: false, message: "No permission" });
    }

    const file = await File.create({ project: projectId, uploadedBy: req.user.id, name, url, type, size });
    project.files.push(file._id);
    await project.save();

    res.status(201).json({ success: true, file });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ---------------- GET ALL FILES ----------------
export const getFiles = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId).populate("files");
    const ws = await Workspace.findById(project.workspace);
    const member = ws.members.find(m => m.user.toString() === req.user.id);

    if (!member) {
      return res.status(403).json({ success: false, message: "No permission" });
    }

    res.json({ success: true, files: project.files });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ---------------- DELETE FILE ----------------
export const deleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.fileId);
    const project = await Project.findById(file.project);
    const ws = await Workspace.findById(project.workspace);
    const member = ws.members.find(m => m.user.toString() === req.user.id);

    if (!member || !PERMISSIONS[member.role]?.includes("FILE_DELETE")) {
      return res.status(403).json({ success: false, message: "No permission" });
    }

    await file.remove();
    project.files = project.files.filter(f => f.toString() !== file._id.toString());
    await project.save();

    res.json({ success: true, message: "File deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

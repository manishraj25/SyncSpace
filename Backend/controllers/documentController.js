import Document from "../models/Document.js";
import Project from "../models/Project.js";
import Workspace from "../models/Workspace.js";
import { PERMISSIONS } from "../config/permissions.js";

// ---------------- CREATE DOCUMENT ----------------
export const createDocument = async (req, res) => {
  try {
    const { projectId, title, content } = req.body;
    const project = await Project.findById(projectId);
    const ws = await Workspace.findById(project.workspace);
    const member = ws.members.find(m => m.user.toString() === req.user.id);

    if (!member || !PERMISSIONS[member.role]?.includes("FILE_UPLOAD")) {
      return res.status(403).json({ success: false, message: "No permission" });
    }

    const doc = await Document.create({ project: projectId, title, content, updatedBy: req.user.id });
    project.documents.push(doc._id);
    await project.save();

    res.status(201).json({ success: true, document: doc });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ---------------- GET ALL DOCUMENTS ----------------
export const getDocuments = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId).populate("documents");
    const ws = await Workspace.findById(project.workspace);
    const member = ws.members.find(m => m.user.toString() === req.user.id);

    if (!member) {
      return res.status(403).json({ success: false, message: "No permission" });
    }

    res.json({ success: true, documents: project.documents });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ---------------- EDIT DOCUMENT ----------------
export const editDocument = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.docId);
    const project = await Project.findById(doc.project);
    const ws = await Workspace.findById(project.workspace);
    const member = ws.members.find(m => m.user.toString() === req.user.id);

    if (!member || !PERMISSIONS[member.role]?.includes("FILE_UPLOAD")) {
      return res.status(403).json({ success: false, message: "No permission" });
    }

    Object.assign(doc, req.body);
    doc.updatedBy = req.user.id;
    await doc.save();

    res.json({ success: true, document: doc });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ---------------- DELETE DOCUMENT ----------------
export const deleteDocument = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.docId);
    const project = await Project.findById(doc.project);
    const ws = await Workspace.findById(project.workspace);
    const member = ws.members.find(m => m.user.toString() === req.user.id);

    if (!member || !PERMISSIONS[member.role]?.includes("FILE_DELETE")) {
      return res.status(403).json({ success: false, message: "No permission" });
    }

    await doc.remove();
    project.documents = project.documents.filter(d => d.toString() !== doc._id.toString());
    await project.save();

    res.json({ success: true, message: "Document deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

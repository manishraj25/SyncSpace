import KanbanBoard from "../models/KanbanBoard.js";
import Project from "../models/Project.js";
import Workspace from "../models/Workspace.js";
import { PERMISSIONS } from "../config/permissions.js";

// ---------------- CREATE BOARD ----------------
export const createBoard = async (req, res) => {
  try {
    const { projectId, title } = req.body;
    const project = await Project.findById(projectId);
    const ws = await Workspace.findById(project.workspace);
    const member = ws.members.find(m => m.user.toString() === req.user.id);

    if (!member || !PERMISSIONS[member.role]?.includes("BOARD_CREATE")) {
      return res.status(403).json({ success: false, message: "No permission" });
    }

    const board = await KanbanBoard.create({ title, project: projectId });
    project.columns.push(board._id);
    await project.save();

    res.status(201).json({ success: true, board });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ---------------- GET ALL BOARDS OF A PROJECT ----------------
export const getBoards = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId).populate("columns");
    const ws = await Workspace.findById(project.workspace);
    const member = ws.members.find(m => m.user.toString() === req.user.id);

    if (!member) {
      return res.status(403).json({ success: false, message: "No permission" });
    }

    res.json({ success: true, boards: project.columns });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ---------------- EDIT BOARD ----------------
export const editBoard = async (req, res) => {
  try {
    const board = await KanbanBoard.findById(req.params.boardId);
    const project = await Project.findById(board.project);
    const ws = await Workspace.findById(project.workspace);
    const member = ws.members.find(m => m.user.toString() === req.user.id);

    if (!member || !PERMISSIONS[member.role]?.includes("BOARD_EDIT")) {
      return res.status(403).json({ success: false, message: "No permission" });
    }

    Object.assign(board, req.body);
    await board.save();
    res.json({ success: true, board });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ---------------- DELETE BOARD ----------------
export const deleteBoard = async (req, res) => {
  try {
    const board = await KanbanBoard.findById(req.params.boardId);
    const project = await Project.findById(board.project);
    const ws = await Workspace.findById(project.workspace);
    const member = ws.members.find(m => m.user.toString() === req.user.id);

    if (!member || !PERMISSIONS[member.role]?.includes("BOARD_DELETE")) {
      return res.status(403).json({ success: false, message: "No permission" });
    }

    await board.remove();
    project.columns = project.columns.filter(c => c.toString() !== board._id.toString());
    await project.save();

    res.json({ success: true, message: "Board deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

import Task from "../models/Task.js";
import Project from "../models/Project.js";
import Workspace from "../models/Workspace.js";
import { PERMISSIONS } from "../config/permissions.js";

// ---------------- CREATE TASK ----------------
export const createTask = async (req, res) => {
  try {
    const { projectId, title, description, column, dueDate, assignedTo } = req.body;
    const project = await Project.findById(projectId);
    const ws = await Workspace.findById(project.workspace);
    const member = ws.members.find(m => m.user.toString() === req.user.id);

    if (!member || !PERMISSIONS[member.role]?.includes("TASK_CREATE")) {
      return res.status(403).json({ success: false, message: "No permission" });
    }

    const task = await Task.create({ project: projectId, title, description, column, dueDate, assignedTo, createdBy: req.user.id });
    res.status(201).json({ success: true, task });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ---------------- GET ALL TASKS OF A PROJECT ----------------
export const getTasks = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId).populate("tasks");
    const ws = await Workspace.findById(project.workspace);
    const member = ws.members.find(m => m.user.toString() === req.user.id);

    if (!member) {
      return res.status(403).json({ success: false, message: "No permission" });
    }

    res.json({ success: true, tasks: project.tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ---------------- EDIT TASK ----------------
export const editTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    const project = await Project.findById(task.project);
    const ws = await Workspace.findById(project.workspace);
    const member = ws.members.find(m => m.user.toString() === req.user.id);

    if (!member || (!PERMISSIONS[member.role]?.includes("TASK_EDIT") && task.createdBy.toString() !== req.user.id)) {
      return res.status(403).json({ success: false, message: "No permission" });
    }

    Object.assign(task, req.body);
    await task.save();
    res.json({ success: true, task });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ---------------- DELETE TASK ----------------
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    const project = await Project.findById(task.project);
    const ws = await Workspace.findById(project.workspace);
    const member = ws.members.find(m => m.user.toString() === req.user.id);

    if (!member || !PERMISSIONS[member.role]?.includes("TASK_DELETE")) {
      return res.status(403).json({ success: false, message: "No permission" });
    }

    await task.remove();
    res.json({ success: true, message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

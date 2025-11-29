import ChecklistItem from "../models/ChecklistItem.js";
import Task from "../models/Task.js";
import Project from "../models/Project.js";
import Workspace from "../models/Workspace.js";

// Add Checklist Item
export const addChecklistItem = async (req, res) => {
  try {
    const { taskId, title } = req.body;
    const task = await Task.findById(taskId);
    const project = await Project.findById(task.project);
    const ws = await Workspace.findById(project.workspace);
    const member = ws.members.find(m => m.user.toString() === req.user.id);
    if (!member) return res.status(403).json({ success: false, message: "No permission" });

    const item = await ChecklistItem.create({ task: taskId, title });
    task.checklist.push(item._id);
    await task.save();
    res.status(201).json({ success: true, item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Toggle Checklist Completion
export const toggleChecklistItem = async (req, res) => {
  try {
    const item = await ChecklistItem.findById(req.params.itemId);
    const task = await Task.findById(item.task);
    const project = await Project.findById(task.project);
    const ws = await Workspace.findById(project.workspace);
    const member = ws.members.find(m => m.user.toString() === req.user.id);
    if (!member || !["admin", "manager"].includes(member.role)) return res.status(403).json({ success: false, message: "No permission" });

    item.completed = !item.completed;
    await item.save();
    res.json({ success: true, item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete Checklist Item
export const deleteChecklistItem = async (req, res) => {
  try {
    const item = await ChecklistItem.findById(req.params.itemId);
    const task = await Task.findById(item.task);
    const project = await Project.findById(task.project);
    const ws = await Workspace.findById(project.workspace);
    const member = ws.members.find(m => m.user.toString() === req.user.id);
    if (!member || member.role !== "admin") return res.status(403).json({ success: false, message: "No permission" });

    await item.remove();
    task.checklist = task.checklist.filter(c => c.toString() !== item._id.toString());
    await task.save();
    res.json({ success: true, message: "Checklist item deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

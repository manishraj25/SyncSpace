import Comment from "../models/Comment.js";
import Task from "../models/Task.js";
import Project from "../models/Project.js";
import Workspace from "../models/Workspace.js";
import { PERMISSIONS } from "../config/permissions.js";

// ---------------- ADD COMMENT ----------------
export const addComment = async (req, res) => {
  try {
    const { taskId, text } = req.body;

    if (!text.trim()) {
      return res.status(400).json({ success: false, message: "Comment cannot be empty" });
    }

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ success: false, message: "Task not found" });

    const project = await Project.findById(task.project);
    const ws = await Workspace.findById(project.workspace);
    const member = ws.members.find(m => m.user.toString() === req.user.id);

    if (!member || !PERMISSIONS[member.role]?.includes("COMMENT_ADD")) {
      return res.status(403).json({ success: false, message: "No permission" });
    }

    const comment = await Comment.create({ task: taskId, user: req.user.id, text });
    task.comments.push(comment._id);
    await task.save();

    res.status(201).json({ success: true, comment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ---------------- GET COMMENTS FOR TASK ----------------
export const getComments = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId)
      .populate({
        path: "comments",
        populate: { path: "user", select: "name email avatar" },
      });

    if (!task) return res.status(404).json({ success: false, message: "Task not found" });

    const project = await Project.findById(task.project);
    const ws = await Workspace.findById(project.workspace);
    const member = ws.members.find(m => m.user.toString() === req.user.id);

    if (!member || !PERMISSIONS[member.role]?.includes("COMMENT_ADD")) {
      return res.status(403).json({ success: false, message: "No permission" });
    }

    res.json({ success: true, comments: task.comments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ---------------- EDIT COMMENT ----------------
export const editComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ success: false, message: "Comment not found" });

    const task = await Task.findById(comment.task);
    const project = await Project.findById(task.project);
    const ws = await Workspace.findById(project.workspace);
    const member = ws.members.find(m => m.user.toString() === req.user.id);

    // Owner or role with COMMENT_EDIT permission
    const canEdit =
      (member && comment.user.toString() === req.user.id && PERMISSIONS[member.role]?.includes("COMMENT_EDIT_OWN")) ||
      (member && PERMISSIONS[member.role]?.includes("COMMENT_EDIT"));

    if (!canEdit) return res.status(403).json({ success: false, message: "No permission" });

    comment.text = req.body.text || comment.text;
    await comment.save();

    res.json({ success: true, comment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ---------------- DELETE COMMENT ----------------
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ success: false, message: "Comment not found" });

    const task = await Task.findById(comment.task);
    const project = await Project.findById(task.project);
    const ws = await Workspace.findById(project.workspace);
    const member = ws.members.find(m => m.user.toString() === req.user.id);

    // Owner or role with COMMENT_DELETE permission
    const canDelete =
      (member && comment.user.toString() === req.user.id && PERMISSIONS[member.role]?.includes("COMMENT_DELETE_OWN")) ||
      (member && PERMISSIONS[member.role]?.includes("COMMENT_DELETE"));

    if (!canDelete) return res.status(403).json({ success: false, message: "No permission" });

    await comment.remove();
    task.comments = task.comments.filter(c => c.toString() !== comment._id.toString());
    await task.save();

    res.json({ success: true, message: "Comment deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

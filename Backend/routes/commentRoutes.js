// routes/commentRoutes.js
import express from "express";
import {
  addComment,
  getComments,
  editComment,
  deleteComment,
} from "../controllers/commentController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Add a comment to a task
router.post("/", protect, addComment);

// Get all comments for a task
router.get("/:taskId", protect, getComments);

// Edit a comment
router.put("/:commentId", protect, editComment);

// Delete a comment
router.delete("/:commentId", protect, deleteComment);

export default router;

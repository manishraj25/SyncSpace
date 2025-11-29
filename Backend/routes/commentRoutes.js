// routes/commentRoutes.js
import express from "express";
import {
  addComment,
  getComments,
  editComment,
  deleteComment,
} from "../controllers/commentController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const commentRouter = express.Router();

// Add a comment to a task
commentRouter.post("/", isAuthenticated, addComment);

// Get all comments for a task
commentRouter.get("/:taskId", isAuthenticated, getComments);

// Edit a comment
commentRouter.put("/:commentId", isAuthenticated, editComment);

// Delete a comment
commentRouter.delete("/:commentId", isAuthenticated, deleteComment);

export default commentRouter;

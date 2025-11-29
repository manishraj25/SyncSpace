import express from "express";
import { createBoard, editBoard, deleteBoard, getBoards } from "../controllers/kanbanController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createBoard);             // Create Board
router.get("/:projectId", protect, getBoards);      // Get Boards of Project
router.put("/:boardId", protect, editBoard);        // Edit Board
router.delete("/:boardId", protect, deleteBoard);   // Delete Board

export default router;

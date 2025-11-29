import express from "express";
import { createBoard, editBoard, deleteBoard, getBoards } from "../controllers/kanbanController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const kanbanRouter = express.Router();

kanbanRouter.post("/", isAuthenticated, createBoard);             // Create Board
kanbanRouter.get("/:projectId", isAuthenticated, getBoards);      // Get Boards of Project
kanbanRouter.put("/:boardId", isAuthenticated, editBoard);        // Edit Board
kanbanRouter.delete("/:boardId", isAuthenticated, deleteBoard);   // Delete Board

export default kanbanRouter;

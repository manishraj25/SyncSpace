import express from "express";
import { createTask, editTask, deleteTask, getTasks } from "../controllers/taskController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createTask);            // Create Task
router.get("/:projectId", protect, getTasks);     // Get Tasks of Project
router.put("/:taskId", protect, editTask);        // Edit Task
router.delete("/:taskId", protect, deleteTask);   // Delete Task

export default router;

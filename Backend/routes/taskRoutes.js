import express from "express";
import { createTask, editTask, deleteTask, getTasks } from "../controllers/taskController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const taskRouter = express.Router();

taskRouter.post("/", isAuthenticated, createTask);            // Create Task
taskRouter.get("/:projectId", isAuthenticated, getTasks);     // Get Tasks of Project
taskRouter.put("/:taskId", isAuthenticated, editTask);        // Edit Task
taskRouter.delete("/:taskId", isAuthenticated, deleteTask);   // Delete Task

export default taskRouter;

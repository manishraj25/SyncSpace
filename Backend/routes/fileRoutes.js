import express from "express";
import { uploadFile, getFiles, deleteFile } from "../controllers/fileController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const fileRouter = express.Router();

fileRouter.post("/", isAuthenticated, uploadFile);           // Upload File
fileRouter.get("/:projectId", isAuthenticated, getFiles);    // Get Files of Project
fileRouter.delete("/:fileId", isAuthenticated, deleteFile);  // Delete File

export default fileRouter;

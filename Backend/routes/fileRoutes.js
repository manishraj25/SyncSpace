import express from "express";
import { uploadFile, getFiles, deleteFile } from "../controllers/fileController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, uploadFile);           // Upload File
router.get("/:projectId", protect, getFiles);    // Get Files of Project
router.delete("/:fileId", protect, deleteFile);  // Delete File

export default router;

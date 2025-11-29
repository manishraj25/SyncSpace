import express from "express";
import { createDocument, getDocuments, editDocument, deleteDocument } from "../controllers/documentController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createDocument);        // Create Document
router.get("/:projectId", protect, getDocuments); // Get Documents of Project
router.put("/:docId", protect, editDocument);     // Edit Document
router.delete("/:docId", protect, deleteDocument); // Delete Document

export default router;

import express from "express";
import { createDocument, getDocuments, editDocument, deleteDocument } from "../controllers/documentController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const documentRouter = express.Router();

documentRouter.post("/", isAuthenticated, createDocument);        // Create Document
documentRouter.get("/:projectId", isAuthenticated, getDocuments); // Get Documents of Project
documentRouter.put("/:docId", isAuthenticated, editDocument);     // Edit Document
documentRouter.delete("/:docId", isAuthenticated, deleteDocument); // Delete Document

export default documentRouter;

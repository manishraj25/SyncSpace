import express from "express";
import { sendMessage, getMessages, deleteMessage } from "../controllers/messageController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const messageRouter = express.Router();

// Send message to room
messageRouter.post("/:roomId", isAuthenticated, sendMessage);

// Get all messages from a room
messageRouter.get("/:roomId", isAuthenticated, getMessages);

// Delete a message by ID
messageRouter.delete("/:messageId", isAuthenticated, deleteMessage);

export default messageRouter;

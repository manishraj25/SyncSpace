import express from "express";
import { getChatRoom, getChatRoomMembers } from "../controllers/chatRoomController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const chatRoomRouter = express.Router();

// Get chat room by workspace ID
chatRoomRouter.get("/:workspaceId", isAuthenticated, getChatRoom);

// Get members of a specific room by room ID
chatRoomRouter.get("/members/:roomId", isAuthenticated, getChatRoomMembers);

export default chatRoomRouter;

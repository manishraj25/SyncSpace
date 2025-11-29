import express from "express";
import { getNotifications, markAsRead, deleteNotification } from "../controllers/notificationController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const notificationRouter = express.Router();

// Get all notifications for logged-in user
notificationRouter.get("/", isAuthenticated, getNotifications);

// Mark notification as read
notificationRouter.put("/read/:notificationId", isAuthenticated, markAsRead);

// Delete notification
notificationRouter.delete("/:notificationId", isAuthenticated, deleteNotification);

export default notificationRouter;

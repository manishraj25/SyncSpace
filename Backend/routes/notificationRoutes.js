import express from "express";
import { getNotifications, markAsRead, deleteNotification } from "../controllers/notificationController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get all notifications for logged-in user
router.get("/", protect, getNotifications);

// Mark notification as read
router.put("/read/:notificationId", protect, markAsRead);

// Delete notification
router.delete("/:notificationId", protect, deleteNotification);

export default router;

import Notification from "../models/Notification.js";
import { PERMISSIONS } from "../config/permissions.js";

// ---------------- GET USER NOTIFICATIONS ----------------
export const getNotifications = async (req, res) => {
  try {
    // Optional: Check permission (for example, CHAT_ACCESS)
    // const memberRole = req.user.role; // depends if you store role in token/session
    // if (!PERMISSIONS[memberRole]?.includes("CHAT_ACCESS")) {
    //   return res.status(403).json({ success: false, message: "No permission" });
    // }

    const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, notifications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ---------------- MARK NOTIFICATION AS READ ----------------
export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.notificationId);

    if (!notification) 
      return res.status(404).json({ success: false, message: "Notification not found" });

    // Only the owner can mark as read
    if (notification.user.toString() !== req.user.id)
      return res.status(403).json({ success: false, message: "No permission" });

    notification.read = true;
    await notification.save();

    res.json({ success: true, notification });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ---------------- DELETE NOTIFICATION ----------------
export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.notificationId);

    if (!notification)
      return res.status(404).json({ success: false, message: "Notification not found" });

    // Only owner or admin can delete
    if (notification.user.toString() !== req.user.id && req.user.role !== "admin")
      return res.status(403).json({ success: false, message: "No permission" });

    await notification.deleteOne();
    res.json({ success: true, message: "Notification deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

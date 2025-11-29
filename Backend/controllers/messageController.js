import Message from "../models/Message.js";
import ChatRoom from "../models/ChatRoom.js";
import Workspace from "../models/Workspace.js";
import { PERMISSIONS } from "../config/permissions.js";

// SEND MESSAGE
export const sendMessage = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { content } = req.body;

    if (!content.trim()) {
      return res.status(400).json({ success: false, message: "Message cannot be empty" });
    }

    const room = await ChatRoom.findById(roomId);
    if (!room) return res.status(404).json({ success: false, message: "Room not found" });

    const workspace = await Workspace.findById(room.workspace);
    const member = workspace.members.find(m => m.user.toString() === req.user.id);
    if (!member || !PERMISSIONS[member.role].includes("CHAT_ACCESS")) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    const newMessage = await Message.create({
      room: roomId,
      sender: req.user.id,
      content
    });

    const populatedMsg = await Message.findById(newMessage._id)
      .populate("sender", "name email avatar");

    req.io.to(roomId).emit("new_message", populatedMsg);

    return res.json({ success: true, message: populatedMsg });

  } catch (err) {
    console.error("Send Message Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET ALL MESSAGES OF ROOM
export const getMessages = async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await ChatRoom.findById(roomId);
    if (!room) return res.status(404).json({ success: false, message: "Room not found" });

    const workspace = await Workspace.findById(room.workspace);
    const member = workspace.members.find(m => m.user.toString() === req.user.id);
    if (!member || !PERMISSIONS[member.role].includes("CHAT_ACCESS")) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    const messages = await Message.find({ room: roomId })
      .populate("sender", "name email avatar")
      .sort({ createdAt: 1 });

    return res.json({ success: true, messages });

  } catch (err) {
    console.error("Get Messages Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE MESSAGE
export const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;

    const msg = await Message.findById(messageId);
    if (!msg) return res.status(404).json({ success: false, message: "Message not found" });

    const workspace = await Workspace.findById(msg.room.workspace);
    const member = workspace.members.find(m => m.user.toString() === req.user.id);

    // Only sender or admin can delete
    if (msg.sender.toString() !== req.user.id && (!member || !PERMISSIONS[member.role].includes("CHAT_ACCESS"))) {
      return res.status(403).json({ success: false, message: "Not allowed" });
    }

    await msg.deleteOne();

    req.io.to(msg.room.toString()).emit("message_deleted", messageId);

    return res.json({ success: true, message: "Message deleted" });

  } catch (err) {
    console.error("Delete Message Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

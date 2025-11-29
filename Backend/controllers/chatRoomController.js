import ChatRoom from "../models/ChatRoom.js";
import Workspace from "../models/Workspace.js";
import { PERMISSIONS } from "../config/permissions.js";

// Get Chat Room for a workspace
export const getChatRoom = async (req, res) => {
  try {
    const { workspaceId } = req.params;

    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) return res.status(404).json({ success: false, message: "Workspace not found" });

    const member = workspace.members.find(m => m.user.toString() === req.user.id);
    if (!member || !PERMISSIONS[member.role].includes("CHAT_ACCESS")) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    const room = await ChatRoom.findOne({ workspace: workspaceId })
      .populate("members", "name email avatar");

    if (!room) return res.status(404).json({ success: false, message: "Chat room not found" });

    return res.json({ success: true, room });

  } catch (err) {
    console.error("Get ChatRoom Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get members of room
export const getChatRoomMembers = async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await ChatRoom.findById(roomId).populate("members", "name email avatar");
    if (!room) return res.status(404).json({ success: false, message: "Room not found" });

    const workspace = await Workspace.findById(room.workspace);
    const member = workspace.members.find(m => m.user.toString() === req.user.id);
    if (!member || !PERMISSIONS[member.role].includes("CHAT_ACCESS")) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    return res.json({ success: true, members: room.members });

  } catch (err) {
    console.error("ChatRoom Members Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

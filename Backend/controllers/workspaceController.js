import Workspace from "../models/Workspace.js";
import User from "../models/User.js";
import ChatRoom from "../models/ChatRoom.js";
import { PERMISSIONS } from "../config/permissions.js";

// ---------------- CREATE WORKSPACE ----------------
export const createWorkspace = async (req, res) => {
  try {
    const { name, description } = req.body;

    const workspace = await Workspace.create({
      name,
      description,
      createdBy: req.user.id,
      members: [{ user: req.user.id, role: "admin" }],
    });

    // Auto create chat room
    const chatRoom = await ChatRoom.create({
      workspace: workspace._id,
      members: [req.user.id],
    });

    workspace.chatChannel = chatRoom._id;
    await workspace.save();

    // Add workspace to user's list
    await User.findByIdAndUpdate(req.user.id, {
      $addToSet: { workspaces: workspace._id },
    });

    res.json({ workspace });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- HELPER: CHECK PERMISSION ----------------
const hasPermission = (workspace, userId, permission) => {
  const member = workspace.members.find(m => m.user.toString() === userId);
  if (!member) return false;

  const role = member.role.toUpperCase();
  return PERMISSIONS[role] && PERMISSIONS[role].includes(permission);
};

// ---------------- EDIT WORKSPACE ----------------
export const editWorkspace = async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const { name, description } = req.body;

    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) return res.status(404).json({ message: "Workspace not found" });

    if (!hasPermission(workspace, req.user.id, "WORKSPACE_EDIT"))
      return res.status(403).json({ message: "Not authorized" });

    workspace.name = name || workspace.name;
    workspace.description = description || workspace.description;
    await workspace.save();

    res.json({ workspace });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- DELETE WORKSPACE ----------------
export const deleteWorkspace = async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) return res.status(404).json({ message: "Workspace not found" });

    if (!hasPermission(workspace, req.user.id, "WORKSPACE_DELETE"))
      return res.status(403).json({ message: "Not authorized" });

    // Delete workspace and chat
    await workspace.deleteOne();
    if (workspace.chatChannel) await ChatRoom.findByIdAndDelete(workspace.chatChannel);

    // Remove workspace from all users
    await User.updateMany(
      { workspaces: workspaceId },
      { $pull: { workspaces: workspaceId } }
    );

    res.json({ message: "Workspace deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- ADD MEMBER ----------------
export const addMember = async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const { userId, role } = req.body;

    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) return res.status(404).json({ message: "Workspace not found" });

    if (!hasPermission(workspace, req.user.id, "MEMBER_MANAGE"))
      return res.status(403).json({ message: "Not authorized" });

    const exists = workspace.members.some(m => m.user.toString() === userId);
    if (exists) return res.status(400).json({ message: "User already a member" });

    workspace.members.push({ user: userId, role });
    await workspace.save();

    // Auto Add to Chat Room
    await ChatRoom.findByIdAndUpdate(workspace.chatChannel, {
      $addToSet: { members: userId },
    });

    await User.findByIdAndUpdate(userId, {
      $addToSet: { workspaces: workspaceId },
    });

    res.json({ workspace });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- REMOVE MEMBER ----------------
export const removeMember = async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const { userId } = req.body;

    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) return res.status(404).json({ message: "Workspace not found" });

    if (!hasPermission(workspace, req.user.id, "MEMBER_MANAGE"))
      return res.status(403).json({ message: "Not authorized" });

    const isTargetAdmin = workspace.members.find(
      m => m.user.toString() === userId && m.role === "admin"
    );

    const adminCount = workspace.members.filter(m => m.role === "admin").length;
    if (isTargetAdmin && adminCount === 1)
      return res.status(400).json({ message: "Cannot remove last admin" });

    workspace.members = workspace.members.filter(m => m.user.toString() !== userId);
    await workspace.save();

    await ChatRoom.findByIdAndUpdate(workspace.chatChannel, {
      $pull: { members: userId },
    });

    await User.findByIdAndUpdate(userId, {
      $pull: { workspaces: workspaceId },
    });

    res.json({ workspace });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- CHANGE MEMBER ROLE ----------------
export const changeMemberRole = async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const { userId, role } = req.body;

    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) return res.status(404).json({ message: "Workspace not found" });

    if (!hasPermission(workspace, req.user.id, "MEMBER_MANAGE"))
      return res.status(403).json({ message: "Not authorized" });

    const target = workspace.members.find(m => m.user.toString() === userId);
    if (!target) return res.status(404).json({ message: "User not found" });

    target.role = role;
    await workspace.save();

    res.json({ workspace });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- GET ALL MEMBERS ----------------
export const getWorkspaceMembers = async (req, res) => {
  try {
    const workspace = await Workspace.findById(req.params.workspaceId)
      .populate("members.user", "name email avatar");

    if (!workspace) return res.status(404).json({ message: "Workspace not found" });

    res.json({ members: workspace.members });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

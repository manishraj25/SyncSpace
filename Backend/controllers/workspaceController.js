import Workspace from "../models/Workspace.js";
import User from "../models/User.js";

// Create Workspace
export const createWorkspace = async (req, res) => {
  try {
    const { name, description } = req.body;

    const workspace = await Workspace.create({
      name,
      description,
      createdBy: req.user.id,
      members: [{ user: req.user.id, role: "admin" }],
    });

    const user = await User.findById(req.user.id);
    user.workspaces.push(workspace._id);
    await user.save();

    res.json({ workspace });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Edit Workspace (Admin only)
export const editWorkspace = async (req, res) => {
  const { workspaceId } = req.params;
  const { name, description } = req.body;

  try {
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) return res.status(404).json({ message: "Workspace not found" });

    const member = workspace.members.find(m => m.user.toString() === req.user.id);
    if (!member || member.role !== "admin") return res.status(403).json({ message: "Not authorized" });

    workspace.name = name || workspace.name;
    workspace.description = description || workspace.description;
    await workspace.save();

    res.json({ workspace });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Workspace (Admin only)
export const deleteWorkspace = async (req, res) => {
  const { workspaceId } = req.params;

  try {
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) return res.status(404).json({ message: "Workspace not found" });

    const member = workspace.members.find(m => m.user.toString() === req.user.id);
    if (!member || member.role !== "admin") return res.status(403).json({ message: "Not authorized" });

    await workspace.remove();

    await User.updateMany(
      { workspaces: workspaceId },
      { $pull: { workspaces: workspaceId } }
    );

    res.json({ message: "Workspace deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add member
export const addMember = async (req, res) => {
  const { workspaceId, userId, role } = req.body;
  try {
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) return res.status(404).json({ message: "Workspace not found" });

    const member = workspace.members.find(m => m.user.toString() === req.user.id);
    if (!member || member.role !== "admin") return res.status(403).json({ message: "Not authorized" });

    const exists = workspace.members.find(m => m.user.toString() === userId);
    if (exists) return res.status(400).json({ message: "User already a member" });

    workspace.members.push({ user: userId, role });
    await workspace.save();

    const user = await User.findById(userId);
    if (!user.workspaces.includes(workspaceId)) user.workspaces.push(workspaceId);
    await user.save();

    res.json({ workspace });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Remove member
export const removeMember = async (req, res) => {
  const { workspaceId, userId } = req.body;
  try {
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) return res.status(404).json({ message: "Workspace not found" });

    const member = workspace.members.find(m => m.user.toString() === req.user.id);
    if (!member || member.role !== "admin") return res.status(403).json({ message: "Not authorized" });

    workspace.members = workspace.members.filter(m => m.user.toString() !== userId);
    await workspace.save();

    const user = await User.findById(userId);
    user.workspaces = user.workspaces.filter(w => w.toString() !== workspaceId);
    await user.save();

    res.json({ workspace });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Change member role
export const changeMemberRole = async (req, res) => {
  const { workspaceId, userId, role } = req.body;
  try {
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) return res.status(404).json({ message: "Workspace not found" });

    const member = workspace.members.find(m => m.user.toString() === req.user.id);
    if (!member || member.role !== "admin") return res.status(403).json({ message: "Not authorized" });

    const targetMember = workspace.members.find(m => m.user.toString() === userId);
    if (!targetMember) return res.status(404).json({ message: "Member not found" });

    targetMember.role = role;
    await workspace.save();

    res.json({ workspace });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get members
export const getWorkspaceMembers = async (req, res) => {
  try {
    const workspace = await Workspace.findById(req.params.workspaceId)
      .populate("members.user", "name email avatar");
    res.json({ members: workspace.members });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

import Activity from "../models/Activity.js";

// Get Activities (all user actions)
export const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, activities });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

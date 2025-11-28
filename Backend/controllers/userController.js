import User from "../models/User.js";

// EDIT PROFILE
export const editProfile = async (req, res) => {
  try {
    const { name, email, avatar, bio } = req.body;

    if (!name || !email) {
      return res.status(400).json({ success: false, message: "Name and email are required" });
    }

    const emailTaken = await User.findOne({ email, _id: { $ne: req.user.id } });
    if (emailTaken) {
      return res.status(400).json({ success: false, message: "Email is already in use" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, avatar, bio },
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("EditProfile Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE ACCOUNT
export const deleteAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);

    res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (err) {
    console.error("DeleteAccount Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

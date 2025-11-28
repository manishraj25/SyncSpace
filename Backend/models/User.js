import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "" },
    bio: { type: String, default: "" },
    workspaces: [{ type: mongoose.Schema.Types.ObjectId, ref: "Workspace" }],
    lastActive: { type: Date },
    verifyOtp: { type: String, default: '' },
    verifyOtpExpiry: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    resetPasswordOtp: { type: String, default: '' },
    resetPasswordOtpExpiry: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("User", userSchema);

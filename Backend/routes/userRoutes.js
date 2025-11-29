import express from "express";
import { editProfile, deleteAccount } from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

// Edit user profile
userRouter.put("/edit", isAuthenticated, editProfile);

// Delete user account
userRouter.delete("/delete", isAuthenticated, deleteAccount);

export default userRouter;
import express from "express";
import { signup, login, logout, getProfile } from "../controllers/authController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/logout", logout);
authRouter.get("/me", isAuthenticated, getProfile);

export default authRouter;

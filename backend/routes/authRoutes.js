import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  sendPasswordResetEmail,
} from "../controllers/authControllers.js";
const authRouter = express.Router();
authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
authRouter.post("/reset-password", resetPassword);
authRouter.post("/send-rest-otp", sendPasswordResetEmail);

export default authRouter;

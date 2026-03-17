import express from "express";
import { forgotPassword, loginUser, registerUser } from "../controller/userController.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/forgot-password").post(forgotPassword);

export default router;

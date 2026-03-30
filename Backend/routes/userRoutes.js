import express from "express";
import { registerUser, loginUser,logout,resetPassword } from "../controller/userController.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/password/forget").post(resetPassword);


export default router;

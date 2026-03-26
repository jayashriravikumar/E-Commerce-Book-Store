import express from "express";
import {
	forgotPassword,
	getMyProfile,
	loginUser,
	registerUser,
} from "../controller/userController.js";
import { verifyUser } from "../helper/userAuth.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/forgot-password").post(forgotPassword);
router.route("/me").get(verifyUser, getMyProfile);

export default router;

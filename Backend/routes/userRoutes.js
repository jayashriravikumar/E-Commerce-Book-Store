import express from "express";
import { profile,registerUser, loginUser,logout,forgetPassword,resetPassword,updatePassword ,updateProfile} from "../controller/userController.js";
import { verifyUser } from "../helper/userAuth.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/password/forget").post(forgetPassword);
router.route("/reset/:token").post(resetPassword);
router.route("/profile").get(verifyUser,profile);
router.route("/password/update").put(verifyUser,updatePassword);
router.route("/profile/update").put(verifyUser,updateProfile);

export default router;

import express from "express";
import { profile,registerUser,loginUser,logout,forgetPassword,resetPassword,updatePassword ,updateProfile,getUsers,getSingleUser, updateUserRole, deleteUser,verifyEmailOTP} from "../controller/userController.js";
import { verifyUser,roleBasedAccess} from "../helper/userAuth.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 5, // Start blocking after 5 requests
    message: { 
        success: false, 
        message: "Too many login attempts from this IP, please try again after an hour." 
    },
});

router.route("/register").post(authLimiter,registerUser);
router.route("/login").post(authLimiter,loginUser);
router.route("/logout").get(logout);
router.route("/password/forget").post(authLimiter,forgetPassword);
router.route("/reset/:token").post(resetPassword);
router.route("/profile").get(verifyUser,profile);
router.route("/password/update").put(verifyUser,updatePassword);
router.route("/profile/update").put(verifyUser,updateProfile);
router.route("/verify/otp").post(verifyEmailOTP);

router.route("/admin/users").get(verifyUser,roleBasedAccess("admin"),getUsers);
router
.route("/admin/user/:id")
.get(verifyUser,roleBasedAccess("admin"),getSingleUser)
.put(verifyUser,roleBasedAccess("admin"),updateUserRole)
.delete(verifyUser,roleBasedAccess("admin"),deleteUser);
export default router;

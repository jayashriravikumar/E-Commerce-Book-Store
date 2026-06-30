import express from "express";
import rateLimit from "express-rate-limit";

import {
  profile,
  registerUser,
  loginUser,
  logout,
  forgetPassword,
  resetPassword,
  updatePassword,
  updateProfile,
  getUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
  verifyEmailOTP,
} from "../controller/userController.js";

import { verifyUser, roleBasedAccess } from "../helper/userAuth.js";

const router = express.Router();

// 🔐 Rate limiter for auth
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many requests, try again later.",
  },
});

// 🔹 Auth
router.post("/register", authLimiter, registerUser);
router.post("/login", authLimiter, loginUser);
router.post("/logout", logout);
router.post("/verify-email", verifyEmailOTP);

// 🔹 Password
router.post("/password/forget", authLimiter, forgetPassword);
router.post("/reset/:token", resetPassword);
router.put("/password/update", verifyUser, updatePassword);

// 🔹 Profile
router.get("/profile", verifyUser, profile);
router.put("/profile/update", verifyUser, updateProfile);

// 🔹 Admin
router.get("/admin/users", verifyUser, roleBasedAccess("admin"), getUsers);

router
  .route("/admin/user/:id")
  .get(verifyUser, roleBasedAccess("admin"), getSingleUser)
  .put(verifyUser, roleBasedAccess("admin"), updateUserRole)
  .delete(verifyUser, roleBasedAccess("admin"), deleteUser);

// 🔹 Test
router.get("/test", (req, res) => {
  res.send("User routes working ✅");
});

// 🔹 Ping (debug)
router.post("/ping", (req, res) => {
  res.json({ success: true, message: "Ping route works" });
});
export default router;

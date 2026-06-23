import express from "express";
console.log("✅ userRoutes.js is loaded");
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
} from "../controller/userController.js"; // ✅ make sure path is correct
console.log("✅ userRoutes.js is loaded");
import { verifyUser, roleBasedAccess } from "../helper/userAuth.js";

const router = express.Router();

// 🔹 Auth routes
router.post(
  "/register",
  (req, res, next) => {
    console.log("✅ Register route was hit");
    next();
  },
  registerUser,
); // ✅ Register user (role respected now)

router.post("/login", loginUser); // ✅ Login
router.post("/logout", logout); // ✅ Logout
router.post("/verify-email", verifyEmailOTP); // ✅ Single OTP route

// 🔹 Password routes
router.post("/password/forget", forgetPassword);
router.post("/reset/:token", resetPassword);
router.put("/password/update", verifyUser, updatePassword);

// 🔹 Profile routes
router.get("/profile", verifyUser, profile);
router.put("/profile/update", verifyUser, updateProfile);

// 🔹 Admin routes
router.get("/admin/users", verifyUser, roleBasedAccess("admin"), getUsers);
router
  .route("/admin/user/:id")
  .get(verifyUser, roleBasedAccess("admin"), getSingleUser)
  .put(verifyUser, roleBasedAccess("admin"), updateUserRole)
  .delete(verifyUser, roleBasedAccess("admin"), deleteUser);
router.get("/test", (req, res) => {
  res.send("User routes working ✅");
});
console.log(router.stack.map(r => ({
  path: r.route?.path,
  methods: r.route?.methods
})));
export default router;

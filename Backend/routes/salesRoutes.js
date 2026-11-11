import express from "express";
import { getSalesSummary } from "../controller/salesController.js";
import { verifyUser, roleBasedAccess } from "../helper/userAuth.js";
console.log("✅ Sales Routes Loaded");

const router = express.Router();

// Admin - Sales Summary
router.get(
  "/summary",
  verifyUser,
  roleBasedAccess("admin"),
  getSalesSummary
);

export default router;
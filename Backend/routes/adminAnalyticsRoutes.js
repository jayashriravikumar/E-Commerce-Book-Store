import express from "express";
import { getAnalytics } from "../controller/adminAnalyticsController.js";
import { verifyUser, roleBasedAccess } from "../helper/userAuth.js";


const router = express.Router();

router.get(
  "/admin/analytics",
  verifyUser,
  roleBasedAccess("admin"),
  getAnalytics
);


export default router;
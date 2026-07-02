import express from "express";
import { getBackupDashboard } from "../controller/dashboardController.js";

const router = express.Router();

router.get(
  "/admin/dashboard",
  getBackupDashboard
);

export default router;
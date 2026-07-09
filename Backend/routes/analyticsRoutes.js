import express from "express";
import { getBackupAnalytics } from "../controller/analyticsController.js";

const router = express.Router();

router.get(
  "/admin/backup-analytics",
  getBackupAnalytics
);

export default router;
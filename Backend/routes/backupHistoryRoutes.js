import express from "express";
import { getBackupHistory } from "../controller/backupHistoryController.js";

const router = express.Router();

router.get("/admin/backup-history", getBackupHistory);

export default router;
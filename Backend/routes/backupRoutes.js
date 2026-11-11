import express from "express";
import { backupDatabase } from "../controller/backupController.js";

const router = express.Router();

// Backup Database
router.get("/admin/backup", backupDatabase);
router.post("/admin/backup", backupDatabase);

// Test Route
router.get("/admin/backup-test", (req, res) => {
  res.json({
    success: true,
    message: "Backup Route Working",
  });
});

export default router;
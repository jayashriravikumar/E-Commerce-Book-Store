import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { uploadBackup } from "../controller/uploadBackupController.js";

const router = express.Router();

router.post(
  "/admin/upload-backup",
  upload.single("backup"),
  uploadBackup
);

export default router;
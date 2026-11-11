import express from "express";
import { downloadBackup } from "../controller/downloadBackupController.js";

const router = express.Router();

router.post("/admin/download-backup", downloadBackup);

export default router;
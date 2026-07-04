import { exec } from "child_process";
import path from "path";
import fs from "fs";
import BackupLog from "../models/BackupLog.js";

export const backupDatabase = async (req, res) => {
  try {
    // Backup folder
    const backupDir = path.join(process.cwd(), "backup");

    // Create backup folder if it doesn't exist
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    // Folder name based on date and time
    const folderName = new Date().toISOString().replace(/[:.]/g, "-");

    const backupPath = path.join(backupDir, folderName);

    // MongoDB Backup Command
   const command = `"C:\\Program Files\\MongoDB\\Tools\\100\\bin\\mongodump.exe" --db bookstore --out "${backupPath}"`;

    exec(command, async (error, stdout, stderr) => {

  if (error) {

await BackupLog.create({
  backupPath: backupPath || "N/A",
  status: "Failed",
});

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  await BackupLog.create({
    backupPath,
    status: "Success",
  });

  return res.status(200).json({
    success: true,
    message: "Database backup completed successfully.",
    backupPath,
  });

});

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
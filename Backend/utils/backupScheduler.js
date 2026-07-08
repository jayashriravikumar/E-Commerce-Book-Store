import cron from "node-cron";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import BackupLog from "../models/BackupLog.js";

const backupScheduler = () => {

  cron.schedule("0 2 * * *", () => {

    const backupDir = path.join(process.cwd(), "backup");

    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    const folderName = new Date()
      .toISOString()
      .replace(/[:.]/g, "-");

    const backupPath = path.join(
      backupDir,
      folderName
    );

    const command =
      `"C:\\Program Files\\MongoDB\\Tools\\100\\bin\\mongodump.exe" --db bookstore --out "${backupPath}"`;

   exec(command, async (error) => {

    if (error) {
        console.log("❌ Scheduled Backup Failed");
        return;
    }

    console.log("✅ Scheduled Backup Completed");

    // Save backup history
    await BackupLog.create({
        backupPath,
        status: "Success",
        database: "bookstore",
    });

    // Delete backups older than 30 days
    const oldDate = new Date();
    oldDate.setDate(oldDate.getDate() - 30);

    const oldBackups = await BackupLog.find({
        backupDate: { $lt: oldDate }
    });

    for (const backup of oldBackups) {

        if (fs.existsSync(backup.backupPath)) {
            fs.rmSync(backup.backupPath, {
                recursive: true,
                force: true
            });
        }

        await BackupLog.findByIdAndDelete(backup._id);
    }

});

  });

};

export default backupScheduler;
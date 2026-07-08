import BackupLog from "../models/BackupLog.js";

export const getBackupDashboard = async (req, res) => {
  try {
    const totalBackups = await BackupLog.countDocuments();

    const latestBackup = await BackupLog.findOne()
      .sort({ backupDate: -1 });

    const successfulBackups =
      await BackupLog.countDocuments({
        status: "Success",
      });

    const failedBackups =
      await BackupLog.countDocuments({
        status: "Failed",
      });

    res.status(200).json({
      success: true,
      dashboard: {
        totalBackups,
        successfulBackups,
        failedBackups,
        latestBackup,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
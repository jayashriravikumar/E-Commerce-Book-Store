import BackupLog from "../models/BackupLog.js";

export const getBackupAnalytics = async (req, res) => {
  try {
    const analytics = await BackupLog.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$backupDate",
            },
          },
          backups: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      { $limit: 7 },
    ]);

    res.status(200).json({
      success: true,
      analytics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
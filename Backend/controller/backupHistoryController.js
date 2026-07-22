import BackupLog from "../models/BackupLog.js";

export const getBackupHistory = async (req, res) => {
  try {
    const history = await BackupLog.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      history,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
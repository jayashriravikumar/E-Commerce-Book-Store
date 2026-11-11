import path from "path";

export const uploadBackup = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a backup file.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Backup uploaded successfully.",
      filePath: req.file.path,
      fileName: req.file.filename,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
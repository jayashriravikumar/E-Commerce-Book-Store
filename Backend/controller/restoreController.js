import { exec } from "child_process";

export const restoreDatabase = async (req, res) => {
  try {
    const { backupPath } = req.body;

    if (!backupPath) {
      return res.status(400).json({
        success: false,
        message: "Backup path is required",
      });
    }

    const command = `"C:\\Program Files\\MongoDB\\Tools\\100\\bin\\mongorestore.exe" --drop --db bookstore "${backupPath}\\bookstore"`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Database restored successfully",
      });
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
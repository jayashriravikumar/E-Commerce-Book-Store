import archiver from "archiver";
import fs from "fs";
import path from "path";

export const downloadBackup = async (req, res) => {
  try {
    const { backupPath } = req.body;
    console.log("========== DOWNLOAD ==========");
    console.log("Backup Path:", backupPath);

    if (!backupPath) {
      return res.status(400).json({
        success: false,
        message: "Backup path is required",
      });
    }

    const zipName = `backup-${Date.now()}.zip`;

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${zipName}`
    );

    res.setHeader("Content-Type", "application/zip");

    const archive = archiver("zip", {
      zlib: { level: 9 },
    });

   console.log("Folder exists:", fs.existsSync(backupPath));

if (!fs.existsSync(backupPath)) {
  return res.status(404).json({
    success: false,
    message: "Backup folder not found.",
  });
}

console.log("Step 1");

archive.pipe(res);

console.log("Step 2");

archive.directory(backupPath, false);

console.log("Step 3");

archive.on("error", (err) => {
  console.error("Archiver Error:", err);
});

archive.on("warning", (err) => {
  console.warn("Archiver Warning:", err);
});

console.log("Step 4");

archive.finalize();

console.log("Step 5");
} catch (error) {
  console.error("DOWNLOAD ERROR:", error);

  return res.status(500).json({
    success: false,
    message: error.message,
  });
}
};
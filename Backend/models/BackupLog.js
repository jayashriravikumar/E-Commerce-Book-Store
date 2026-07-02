import mongoose from "mongoose";

const backupLogSchema = new mongoose.Schema(
  {
    backupDate: {
      type: Date,
      default: Date.now,
    },
  backupPath: {
  type: String,
  default: "N/A",
},
    status: {
      type: String,
      enum: ["Success", "Failed"],
      default: "Success",
    },
    database: {
      type: String,
      default: "bookstore",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("BackupLog", backupLogSchema);
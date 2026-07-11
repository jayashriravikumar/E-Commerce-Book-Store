import mongoose from "mongoose";

const notificationSettingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    email: {
      type: Boolean,
      default: true,
    },

    sms: {
      type: Boolean,
      default: false,
    },

    push: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "NotificationSetting",
  notificationSettingSchema
);
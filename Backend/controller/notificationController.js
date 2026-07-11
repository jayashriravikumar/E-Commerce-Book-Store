import Notification from "../models/notificationSettingModel.js";

// Get Notification Settings
export const getNotificationSettings = async (req, res) => {
  try {
    let notification = await Notification.findOne({
      user: req.user._id,
    });

    if (!notification) {
      notification = await Notification.create({
        user: req.user._id,
      });
    }

    res.status(200).json({
      success: true,
      notification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Notification Settings
export const updateNotificationSettings = async (req, res) => {
  try {
    const { email, sms, push } = req.body;

    const notification =
      await Notification.findOneAndUpdate(
        { user: req.user._id },
        {
          email,
          sms,
          push,
        },
        {
          new: true,
          upsert: true,
          runValidators: true,
        }
      );

    res.status(200).json({
      success: true,
      notification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
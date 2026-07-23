import User from "../models/userModel.js";
import bcrypt from "bcryptjs";


const DEMO_USER_ID = "685a00000000000000000001";

// Get Login Devices
export const getDevices = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      devices: [
        {
          id: 1,
          device: "Chrome on Windows",
          browser: "Chrome",
          os: "Windows 11",
          current: true,
          lastLogin: new Date(),
        },
      ],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Logout Device
export const logoutDevice = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Device logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Account
export const deleteAccount = async (req, res) => {
  try {
    const { password } = req.body;

    const DEMO_USER_ID = "685a00000000000000000001";

    const user = await User.findById(DEMO_USER_ID).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatched = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatched) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    await User.findByIdAndDelete(req.user.id);

    res.clearCookie("token");

    res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
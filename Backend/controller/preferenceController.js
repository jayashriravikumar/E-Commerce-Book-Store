import Preference from "../models/preferenceModel.js";

const DEMO_USER_ID = "685a00000000000000000001";

export const getPreference = async (req, res) => {
  try {
    let preference = await Preference.findOne({
      user: DEMO_USER_ID,
    });

    if (!preference) {
      preference = await Preference.create({
        user: DEMO_USER_ID,
      });
    }

    res.status(200).json({
      success: true,
      preference,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updatePreference = async (req, res) => {
  try {
    const preference = await Preference.findOneAndUpdate(
      { user: DEMO_USER_ID },
      req.body,
      {
        new: true,
        upsert: true,
      }
    );

    res.status(200).json({
      success: true,
      preference,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
import User from "../models/userModel.js";

// Register User
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: "temp_id",
        url: "temp_url",
      },
    });

    const token = user.getJWTToken();

    res.status(201).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Login User
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter email and password",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = user.getJWTToken();

    res.status(200).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

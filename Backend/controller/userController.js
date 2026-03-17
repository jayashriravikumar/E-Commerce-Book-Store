import User from "../models/usermodel.js";
import HandleError from "../helper/handleError.js";

const sanitizeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  avatar: user.avatar,
  createdAt: user.createdAt,
});

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(new HandleError("Name, email, and password are required", 400));
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return next(new HandleError("An account with this email already exists", 409));
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      avatar: {
        public_id: "default_avatar",
        url: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=10233d&color=f8f3ea`,
      },
    });

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: sanitizeUser(user),
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new HandleError("Email and password are required", 400));
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

    if (!user) {
      return next(new HandleError("No account found for this email", 404));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new HandleError("Incorrect password", 401));
    }

    res.status(200).json({
      success: true,
      message: "Signed in successfully",
      user: sanitizeUser(user),
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return next(new HandleError("Please enter your email address", 400));
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return next(new HandleError("No account found for this email", 404));
    }

    res.status(200).json({
      success: true,
      message: "Reset support request received. Please contact support or create a new password flow next.",
    });
  } catch (error) {
    next(error);
  }
};

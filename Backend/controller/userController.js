import User from "../models/usermodel.js";
import HandleError from "../helper/handleError.js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const sanitizeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  avatar: user.avatar,
  createdAt: user.createdAt,
});

const createAuthResponse = (user, message) => ({
  success: true,
  message,
  token: user.getJWTToken(),
  user: sanitizeUser(user),
});

export const registerUser = async (req, res, next) => {
  try {
    const name = (req.body?.name || "").trim();
    const email = (req.body?.email || "").trim().toLowerCase();
    const password = req.body?.password || "";

    if (!name || !email || !password) {
      return next(new HandleError("Name, email, and password are required", 400));
    }

    if (name.length < 3) {
      return next(new HandleError("Name must be at least 3 characters long", 400));
    }

    if (!emailPattern.test(email)) {
      return next(new HandleError("Please enter a valid email address", 400));
    }

    if (password.length < 8) {
      return next(new HandleError("Password must be at least 8 characters long", 400));
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(new HandleError("An account with this email already exists", 409));
    }

    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: "default_avatar",
        url: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=10233d&color=f8f3ea`,
      },
    });

    res.status(201).json(createAuthResponse(user, "Account created successfully"));
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const email = (req.body?.email || "").trim().toLowerCase();
    const password = req.body?.password || "";

    if (!email || !password) {
      return next(new HandleError("Email and password are required", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new HandleError("No account found for this email", 404));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new HandleError("Incorrect password", 401));
    }

    res.status(200).json(createAuthResponse(user, "Signed in successfully"));
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    user: sanitizeUser(req.user),
  });
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

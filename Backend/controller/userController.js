import User from "../models/userModel.js";
import { sendToken } from "../helper/jwtToken.js";
import HandleError from "../helper/handleError.js";
import { sendEmail } from "../helper/sendEmail.js";
import crypto from "crypto";
import { v2 as cloudinary } from "cloudinary";

//Register User

export const registerUser = async (req, res, next) => {
  console.log("BODY:", req.body);

  const { name, email, password, avatar, captchaToken, role } = req.body;
  if (!name) {
    return next(new HandleError("Please enter your name", 400));
  }

  if (!email) {
    return next(new HandleError("Please enter your email", 400));
  }
  if (!password) {
    return next(new HandleError("Please enter your password", 400));
  }
  if (!captchaToken) {
    return next(new HandleError("Please complete the human verification", 400));
  }

  // Verify token with Google
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`;

  const captchaResponse = await fetch(verifyUrl, { method: "POST" });
  const captchaData = await captchaResponse.json();
  console.log("GOOGLE RECAPTCHA EXPLANATION:", captchaData);
  if (!captchaData.success) {
    return next(
      new HandleError("Human verification failed. Please try again.", 400),
    );
  }

  const myCloud = await cloudinary.uploader.upload(avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  // 1. Generate the 6-digit OTP FIRST
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

  // 2. Create the user AND save the OTP in one single step
  const user = await User.create({
    name,
    email,
    password,
    role: role || "user",
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
    emailVerificationOTP: hashedOTP,
    emailVerificationExpire: Date.now() + 10 * 60 * 1000,
  });

  // Send the email
  const message = `Your verification code for BookStore is: ${otp}\n\nThis code will expire in 10 minutes.`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Verify your BookStore Account",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Verification OTP sent to ${user.email}`,
      email: user.email, // Send email back to frontend to hold in state
    });
  } catch (error) {
    user.emailVerificationOTP = undefined;
    user.emailVerificationExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new HandleError(error.message, 500));
  }
};

// Login User
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new HandleError("Email or password cannot be empty ", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new HandleError("Invalid email or password", 401));
  }
  // if (!user.isVerified) {
  //   return next(new HandleError("Please verify your email first before logging in.", 401));
  // }
  const isValidPassword = await user.verifyPassword(password);
  if (!isValidPassword) {
    return next(new HandleError("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
};

// Logout User
// app.post("/logout", logout);
export const logout = async (req, res, next) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

// Forget user password
export const forgetPassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new HandleError("User does not exists", 400));
  }
  let resetToken;
  try {
    resetToken = user.createPasswordResetToken();
    await user.save();
    //console.log(resetToken);
  } catch (error) {
    console.log(error);
    return next(
      new HandleError("Could not save the reset token,Try again later", 500),
    );
  }
  const resetPasswordURL = `${req.protocol}://${req.host}/reset/${resetToken}`;
  const message = `Reset your password using the link below:\n${resetPasswordURL}\n\nThe link expires in 30 minutes.\nIf you did not request a password reset, please ignore this email.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password Reset Request",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    console.log(error);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new HandleError("Could not send the email,Try again later", 500),
    );
  }
};

// Reset user password
export const resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  console.log(resetPasswordToken);
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new HandleError("Reset password token is invalid or has expired", 400),
    );
  }
  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return next(new HandleError("Password does not match", 400));
  }
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, res);
};

// Get user profile
export const profile = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
};

// Update user password
export const updatePassword = async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const user = await User.findById(req.user.id).select("+password");
  const isCorrect = await user.verifyPassword(oldPassword);
  if (!isCorrect) {
    return next(new HandleError("Old password is incorrect", 400));
  }
  if (newPassword !== confirmPassword) {
    return next(new HandleError("New passwords do not match", 400));
  }
  user.password = newPassword;
  await user.save();
  sendToken(user, 200, res);
};

// Update user profile
export const updateProfile = async (req, res, next) => {
  const { name, email, avatar } = req.body;
  const updatedUserDetails = { name, email };
  if (avatar && avatar !== "") {
    const user = await User.findById(req.user.id);
    const imageId = user.avatar?.public_id;

    if (imageId) {
      await cloudinary.uploader.destroy(imageId);
    }

    const myCloud = await cloudinary.uploader.upload(avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
    updatedUserDetails.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, updatedUserDetails, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user,
  });
};

export const getUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
};

export const getSingleUser = async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    return next(new HandleError("User not found", 400));
  }
  res.status(200).json({
    success: true,
    user,
  });
};

export const updateUserRole = async (req, res, next) => {
  const { role } = req.body;
  const id = req.params.id;
  const updatedRole = { role };
  const user = await User.findByIdAndUpdate(id, updatedRole, { new: true });
  if (!user) {
    return next(new HandleError("User not found", 400));
  }
  res.status(200).json({
    success: true,
    user,
  });
};

export const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return next(new HandleError("User not found", 400));
  }
  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
};

// Verify Email via OTP
export const verifyEmailOTP = async (req, res, next) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return next(new HandleError("Please provide email and OTP", 400));
  }

  // Forcefully convert to string and trim spaces to ensure a clean hash
  const cleanOTP = String(otp).trim();
  const hashedOTP = crypto.createHash("sha256").update(cleanOTP).digest("hex");

  const user = await User.findOne({
    email: String(email).trim(), // Trim the email just in case
    emailVerificationOTP: hashedOTP,
    emailVerificationExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new HandleError("OTP is invalid or has expired", 400));
  }

  // Mark as verified and clear OTP data
  user.isVerified = true;
  user.emailVerificationOTP = undefined;
  user.emailVerificationExpire = undefined;
  await user.save({ validateBeforeSave: false });

  // Instantly log them in after successful verification
  sendToken(user, 200, res);
};

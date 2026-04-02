import User from "../models/userModel.js";
import { sendToken } from "../helper/jwtToken.js";
import HandleError from "../helper/handleError.js";
import {sendEmail} from "../helper/sendEmail.js";
import crypto from "crypto";

// Register User
export const registerUser = async (req, res, next) => {
    const { name, email, password } = req.body;

    if(!name){
      return next(new HandleError("Please enter your name", 400));  
    }
    if(!email){
      return next(new HandleError("Please enter your email", 400));  
    }
    if(!password){
      return next(new HandleError("Please enter your password", 400));  
    }

    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: "temp_id",
        url: "temp_url",
      },
    });
  
    sendToken(user, 201, res);
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
    const isValidPassword = await user.verifyPassword(password);
    if (!isValidPassword) {
      return next(new HandleError("Invalid email or password", 401));
    }
  
    sendToken(user, 200, res);
};

export const logout = async (req,res,next) => {
  const options = {
    expires:new Date(Date.now()),
    httpOnly:true,
  }
  res.cookie("token", null, options);
  res.status(200).json({
    success:true,
    message:"Logged out successfully",
  })
  };

  export const forgetPassword= async(req,res,next) => {

    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user){
      return next(new HandleError("User does not exists", 400));
    }
    let resetToken;
    try{
      resetToken=user.createPasswordResetToken();
      await user.save();
      //console.log(resetToken);
    }catch(error){
      console.log(error);
      return next(new HandleError("Could not save the reset token,Try again later", 500));
    }
    const resetPasswordURL=`${req.protocol}://${req.host}/reset/${resetToken}`;
    const message = `Reset your password using the link below:\n${resetPasswordURL}\n\nThe link expires in 30 minutes.\nIf you did not request a password reset, please ignore this email.`;

    try{
      await sendEmail({
        email:user.email,
        subject:"Password Reset Request",
        message
      });
      res.status(200).json({
        success:true,
        message:`Email sent to ${user.email} successfully`,
      });
    }catch(error){
      console.log(error);
      user.resetPasswordToken= undefined;
      user.resetPasswordExpire= undefined;
      await user.save({validateBeforeSave:false});
      return next(new HandleError("Could not send the email,Try again later", 500));
    }
  };

  export const resetPassword = async(req,res,next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    console.log(resetPasswordToken);
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: {$gt:Date.now()},
    });
    if(!user){
      return next(new HandleError("Reset password token is invalid or has expired", 400));
    }
    const {password,confirmPassword} = req.body;
    if(password !== confirmPassword){
      return next(new HandleError("Password does not match", 400));
    }
    user.password = password;
    user.resetPasswordToken= undefined;
    user.resetPasswordExpire= undefined;
    await user.save();
    sendToken(user, 200, res);

  };
  
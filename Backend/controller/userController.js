import User from "../models/userModel.js";
import { sendToken } from "../helper/jwtToken.js";
import HandleError from "../helper/handleError.js";
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

    const isValidPassword = await user.verifyPassword(password);
    if (!isValidPassword) {
      return next(new HandleError("Invalid email or password", 401));
    }
  
    sendToken(user, 200, res);
};

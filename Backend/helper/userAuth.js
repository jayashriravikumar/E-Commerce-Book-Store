import HandleError from "../helper/handleError.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// ✅ Verify user with JWT (cookie or header)
export const verifyUser = async (req, res, next) => {
  let token;

  // Check cookie first
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
 export const roleBasedAccess = (...roles) => {
    return(req,res,next) =>{
        console.log("User Role:", req.user.role);
        if (!roles.includes(req.user.role)) {
            return next(new HandleError(`Role- ${req.user.role} not allowed to access this resource`, 403));
        }
        next();

  // If no cookie, check Authorization header
  if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  console.log("Token received in verifyUser:", token); // Debug log

  if (!token) {
    return next(new HandleError("Please login to access this resource", 401));
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decodedData.id);
    next();
  } catch (error) {
    return next(new HandleError("Invalid or expired token", 401));
  }
};

// ✅ Role-based access control
export const roleBasedAccess = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new HandleError(`Role- ${req.user.role} not allowed to access this resource`, 403)
      );
    }
    next();
  };
};

// ✅ Send JWT token in response
export const sendToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });

  res.status(statusCode).json({
    success: true,
    token,
    user,
  });
};

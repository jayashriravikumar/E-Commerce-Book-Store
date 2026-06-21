import HandleError from "../helper/handleError.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Protect middleware (your verifyUser renamed)
export const verifyUser = async (req, res, next) => {
     const token = req.cookies.token;
     //console.log(token);
     if (!token) {
         return next(new HandleError("Please login to access this resource", 401));
     }
     const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
     req.user = await User.findById(decodedData.id);
     //console.log(req.user);
     next();
 };

 export const roleBasedAccess = (...roles) => {
    return(req,res,next) =>{
        if (!roles.includes(req.user.role)) {
            return next(new HandleError(`Role- ${req.user.role} not allowed to access this resource`, 403));
        }
        next();

    };
 };
  const token = req.cookies.token;
  if (!token) {
    return next(new HandleError("Please login to access this resource", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decodedData.id);
  next();
};

// Admin middleware
export const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return next(new HandleError("Not authorized as admin", 403));
  }
};

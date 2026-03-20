import HandleError from "../helper/handleError.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

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
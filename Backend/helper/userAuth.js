import HandleError from "../helper/handleError.js";
import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";

export const verifyUser = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization || "";
        const bearerToken = authorizationHeader.startsWith("Bearer ")
            ? authorizationHeader.slice(7)
            : "";
        const cookieToken = req.cookies?.token;
        const token = bearerToken || cookieToken;

        if (!token) {
            return next(new HandleError("Please login to access this resource", 401));
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!decodedData?.id) {
            return next(new HandleError("Invalid authentication token", 401));
        }

        req.user = await User.findById(decodedData.id);

        if (!req.user) {
            return next(new HandleError("User no longer exists", 401));
        }

        next();
    } catch (error) {
        if (error?.name === "TokenExpiredError") {
            return next(new HandleError("Session expired. Please login again.", 401));
        }

        return next(new HandleError("Invalid authentication token", 401));
    }
};
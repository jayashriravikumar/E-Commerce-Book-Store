import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.DB_URI, {
      serverSelectionTimeoutMS: 5000,
      family: 4,
    })
    .then((data) => {
      console.log("MongoDB connected with server: " + data.connection.host);
    });
};

import mongoose from "mongoose";

<<<<<<< HEAD
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
=======
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};
>>>>>>> 8cfcf95 (connected with the backend)

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({path:'./config/config.env'});

export const connectDB = () => {
    mongoose.connect(process.env.DB_URL, {
        family: 4
    })
    .then((data)=>{
        console.log("MongoDB connected with server: "+data.connection.host);
    })
    .catch((err)=>{
        console.error(err.message);
    });
};

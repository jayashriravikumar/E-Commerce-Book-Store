import dotenv from 'dotenv';
dotenv.config({path:'./config/config.env'});



import app from './app.js';
import {connectDB} from './config/db.js';

const PORT = process.env.PORT || 3000;

connectDB();
import {v2 as cloudinary } from "cloudinary";
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});

process.on("UncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to uncaught exception");
    process.exit(1);
});

const server = app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to unhandled promise rejection");
    server.close(()=>{
        process.exit(1);
    });
});

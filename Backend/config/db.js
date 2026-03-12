import mongoose from "mongoose";

export const connectDB = () => {
mongoose.connect(process.env.DB_URL, {
    serverSelectionTimeoutMS: 5000,
    family: 4
})
.then((data)=>{
    console.log("MongoDB connected with server: "+data.connection.host);
})
.catch((err)=>{
    console.error(err.message);
});
};
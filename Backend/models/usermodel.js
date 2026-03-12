import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
},{timestamps:true});

export default mongoose.model("User",UserSchema);
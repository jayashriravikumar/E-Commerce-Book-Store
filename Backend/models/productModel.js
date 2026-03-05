import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please enter product name"],
    },
    author:{
        type:String,
        required:[true,"Please enter product author"],
    },
    description:{
        type:String,
        required:[true,"Please enter product description"], 
    },
    price:{
        type:Number,
        required:[true,"Please enter product price"],
    },
    coverImage:[
        {
            public_id:{
                type:String,
                required:[true],
            },
            url:{
                type:String,
                required:[true],
            }
            },
        ],
    category:{
        type:String,
        required:[true,"Please enter product category"],
    },
    stock:{
        type:Number,
        required:[true,"Please enter product stock"],  
        default:1, 
    }
});

export default mongoose.model("Product",ProductSchema);
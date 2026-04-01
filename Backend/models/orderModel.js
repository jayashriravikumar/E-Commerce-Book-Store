import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"Please provide user"],
    },
    orderItems:[
        {
            bookId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required:true,
            },
            qty:{
                type:Number,
                required:true,
            },
            price:{
                type:Number,
                required:true,
            },
        }
    ],
    shippingAddress:{
        address:{
            type:String,
            required:true,
        },
        city:{
            type:String,
            required:true,
        },
        postalCode:{
            type:String,
            required:true,
        },
    },
    totalPrice:{
        type:Number,
        required:[true,"Please enter total price"],
    },
    isPaid:{
        type:Boolean,
        default:false,
    },
    isDelivered:{
        type:Boolean,
        default:false,
    },
},{timestamps:true});

export default mongoose.model("Order",OrderSchema);
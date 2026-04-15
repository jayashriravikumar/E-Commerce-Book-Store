import Order from "../models/orderModel.js";

export const createNewOrder = async(req,res,next) =>{
    const {shippingAddress,orderItems,paymentInfo,itemPrice,taxPrice,shippingPrice,totalPrice} = req.body;

    const order = await Order.create({
        shippingAddress,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id,
    });
    res.status(201).json({
        success:true,
        order,
    });
};
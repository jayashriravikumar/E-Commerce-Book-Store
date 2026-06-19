import HandleError from "../helper/handleError.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

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

// get single order details
export const getOrderDetails = async(req,res,next) =>{
    const order = await Order.findById(req.params.id).populate("user","name email");
    if(!order){
        return next(new HandleError("No order found with this id",404));
    }
    res.status(200).json({
        success:true,
        order,
    });
};

//get all order details
export const getAllOrders = async(req,res,next) =>{
    const orders = await Order.find({user:req.user._id});
    if(!orders){
        return next(new HandleError("No orders found for this user",404));
    }
    res.status(200).json({
        success:true,
        orders,
    });
};

//get all orders for admin
export const getAllOrdersByAdmin = async(req,res,next) =>{
    const orders = await Order.find().populate("user","name email");
    if(!orders){
        return next(new HandleError("No orders found",404));
    }
    let totalAmount = 0;
    orders.forEach((order) => (totalAmount += order.totalPrice));
    res.status(200).json({
        success:true,
        orders,
        totalAmount,
    });
};

//Delete order --admin
export const deleteOrder = async(req,res,next) =>{
    const order = await Order.findById(req.params.id); 
    if(!order){
        return next(new HandleError("No order found with this id",404));
    }
    if (order.orderStatus !== "Delivered"){
        return next(new HandleError("Cannot delete order that is not delivered",404));
    }
    await Order.deleteOne({_id:req.params.id});
    res.status(200).json({
        success:true,
        message:"Order deleted successfully",
    });
};

// Cancel Order -- User
export const cancelOrder = async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new HandleError("No order found with this id", 404));
    }
    
    // Ensure the user actually owns this order
    if (order.user.toString() !== req.user._id.toString()) {
        return next(new HandleError("You are not authorized to cancel this order", 403));
    }

    if (order.orderStatus === "Delivered" || order.orderStatus === "Shipped") {
        return next(new HandleError(`Cannot cancel an order that is already ${order.orderStatus}`, 400));
    }

    order.orderStatus = "Cancelled";
    await order.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "Order cancelled successfully",
        order
    });
};

//admin order update
export const updateOrderStatus = async(req,res,next) =>{

const id = req.params.id;
const order = await Order.findById(id);
if(!order){
    return next(new HandleError("No order found with this id",404));
}
if(order.orderStatus === "Delivered"){
    return next(new HandleError("Order is already delivered",404));
}

// Update stock
await Promise.all(order.orderItems.map((item) => updateQuantity(item.product, item.quantity)));


order.orderStatus = req.body.status;
if(order.orderStatus === "Delivered"){
    order.deliveredAt = Date.now();         
}
await order.save({validationBeforeSave:false});
res.status(200).json({
    success:true,
    order,
});
};

async function updateQuantity(id,quantity){
    const product = await Product.findById(id);

    if(!product){
        throw new HandleError("Product not found",404);
    }
    product.stock -= quantity;
    await product.save({validateBeforeSave:false});
};
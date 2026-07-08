import HandleError from "../helper/handleError.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import PDFDocument from "pdfkit";
export const createNewOrder = async (req, res, next) => {
  const {
    shippingAddress,
    orderItems,
    paymentInfo,
    paidAt,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;



    const order = await Order.create({
        shippingAddress,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: paymentInfo.method === "COD" ? null : Date.now(),
        
        user:req.user._id,
    });
    res.status(201).json({
        success:true,
        order,
    });
};

// get single order details
export const getOrderDetails = async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email",
  );
  if (!order) {
    return next(new HandleError("No order found with this id", 404));
  }
  res.status(200).json({
    success: true,
    order,
  });
};

//get all order details
export const getAllOrders = async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  if (!orders) {
    return next(new HandleError("No orders found for this user", 404));
  }
  res.status(200).json({
    success: true,
    orders,
  });
};

//get all orders for admin
export const getAllOrdersByAdmin = async (req, res, next) => {
  const orders = await Order.find().populate("user", "name email");
  
  let totalAmount = 0;
  orders.forEach((order) => (totalAmount += order.totalPrice

  ));
  res.status(200).json({
    success: true,
    orders,
    totalAmount,
  });
};

//Delete order --admin
export const deleteOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(
      new HandleError("Cannot delete an order that is not delivered", 404),
    );
  }
  if (order.orderStatus !== "Delivered") {
    return next(
      new HandleError("Cannot delete order that is not delivered", 400),
    );
  }
  await Order.deleteOne({ _id: req.params.id });
  res.status(200).json({
    success: true,
    message: "Order deleted successfully",
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
    return next(
      new HandleError("You are not authorized to cancel this order", 403),
    );
  }

  if (order.orderStatus === "Delivered" || order.orderStatus === "Shipped") {
    return next(
      new HandleError(
        `Cannot cancel an order that is already ${order.orderStatus}`,
        400,
      ),
    );
  }

  order.orderStatus = "Cancelled";
  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Order cancelled successfully",
    order,
  });
};

//admin order update
export const updateOrderStatus = async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new HandleError("No order found with this id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new HandleError("Order has already been delivered", 400));
  }

  // Reduce stock ONLY when delivered
  if (req.body.status === "Delivered") {
    await Promise.all(
      order.orderItems.map((item) =>
        updateQuantity(item.product, item.quantity)
      )
    );

    order.deliveredAt = Date.now();

    if (order.paymentInfo?.method === "Cash on Delivery") {
      order.paymentInfo.status = "Succeeded";
      order.paidAt = Date.now();
    }
  }

  order.orderStatus = req.body.status;

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    order,
  });
};
 
async function updateQuantity(id, quantity) {
  const product = await Product.findById(id);

  if (!product) {
    throw new HandleError("Product not found", 400);
  }
  if (product.stock < quantity) {
    throw new HandleError(`${product.name} is out of stock`, 400);
  }
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}
// Download Invoice
export const downloadInvoice = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return next(new HandleError("Order not found", 404));
    }

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice-${order._id}.pdf`
    );

    doc.pipe(res);

    // Title
    doc
      .fontSize(22)
      .text("BOOK STORE", { align: "center" });

    doc.moveDown();

    doc.fontSize(14).text(`Invoice No: ${order._id}`);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`);

    doc.moveDown();

    // Customer Details
    doc.fontSize(16).text("Customer Details");
    doc.fontSize(12);
    doc.text(`Name: ${order.user.name}`);
    doc.text(`Email: ${order.user.email}`);

    doc.moveDown();

    // Shipping Address
    doc.fontSize(16).text("Shipping Address");
    doc.fontSize(12);
    doc.text(order.shippingAddress.address);
    doc.text(
      `${order.shippingAddress.city}, ${order.shippingAddress.state}`
    );
    doc.text(
      `${order.shippingAddress.country} - ${order.shippingAddress.pinCode}`
    );

    doc.moveDown();

    // Order Items
    doc.fontSize(16).text("Order Items");
    doc.moveDown(0.5);

    order.orderItems.forEach((item) => {
      doc.text(
        `${item.name}   x${item.quantity}   ₹${item.price * item.quantity}`
      );
    });

    doc.moveDown();

    // Summary
    doc.fontSize(16).text("Summary");
    doc.fontSize(12);

    doc.text(`Items Total: ₹${order.itemPrice}`);
    doc.text(`Tax: ₹${order.taxPrice}`);
    doc.text(`Shipping: ₹${order.shippingPrice}`);

    doc.moveDown();

    doc.fontSize(16).text(`Grand Total: ₹${order.totalPrice}`);

    doc.moveDown();

    doc.text(`Payment Method: ${order.paymentInfo.method}`);
    doc.text(`Payment Status: ${order.paymentInfo.status}`);

    doc.moveDown(2);

    doc
      .fontSize(14)
      .text("Thank you for shopping with Book Store!", {
        align: "center",
      });

    doc.end();
  } catch (error) {
    next(error);
  }
};
import HandleError from "../helper/handleError.js";
import Order from "../models/orderModel.js";

const normalizeOrderItems = (items = []) =>
  items
    .map((item) => ({
      bookId: item?.bookId,
      qty: Number(item?.qty) || 0,
      price: Number(item?.price) || 0,
    }))
    .filter((item) => item.bookId && item.qty > 0 && item.price >= 0);

const normalizeShippingAddress = (shippingAddress = {}) => ({
  address: (shippingAddress.address || "").trim(),
  city: (shippingAddress.city || "").trim(),
  postalCode: (shippingAddress.postalCode || "").trim(),
});

export const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      count: orders.length,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    const orderItems = normalizeOrderItems(req.body?.orderItems);
    const shippingAddress = normalizeShippingAddress(req.body?.shippingAddress);
    const totalPrice = Number(req.body?.totalPrice);

    if (!orderItems.length) {
      return next(new HandleError("Please add at least one item to place an order", 400));
    }

    if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode) {
      return next(new HandleError("Please provide a complete shipping address", 400));
    }

    if (!Number.isFinite(totalPrice) || totalPrice <= 0) {
      return next(new HandleError("Please provide a valid total price", 400));
    }

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      totalPrice,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};

import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import Order from "../models/orderModel.js";

export const getAnalytics = async (req, res) => {
  const totalProducts = await Product.countDocuments();
  const totalUsers = await User.countDocuments();
  const totalOrders = await Order.countDocuments();

  const orders = await Order.find();

  const totalRevenue = orders.reduce(
    (acc, item) => acc + item.totalPrice,
    0
  );

  const lowStockProducts = await Product.countDocuments({
    stock: { $lt: 10 }
  });

  const outOfStockProducts = await Product.countDocuments({
    stock: 0
  });

  const averageOrderValue =
    totalOrders > 0
      ? (totalRevenue / totalOrders).toFixed(2)
      : 0;

  res.status(200).json({
    success: true,
    totalProducts,
    totalUsers,
    totalOrders,
    totalRevenue,
    lowStockProducts,
    outOfStockProducts,
    averageOrderValue,
  });
};
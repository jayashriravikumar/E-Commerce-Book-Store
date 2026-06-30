import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import Order from "../models/orderModel.js";
import Ticket from "../models/ticketModel.js";
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

   // Complaint Analytics
   const openComplaints = await Ticket.countDocuments({
    status: "open",
  });

  const assignedComplaints = await Ticket.countDocuments({
    status: "assigned",
  });

  const inProgressComplaints = await Ticket.countDocuments({
    status: "in-progress",
  });

  const waitingCustomerComplaints = await Ticket.countDocuments({
    status: "waiting-customer",
  });

  const waitingRefundComplaints = await Ticket.countDocuments({
    status: "waiting-refund",
  });

  const resolvedComplaints = await Ticket.countDocuments({
    status: "resolved",
  });

  const highPriorityComplaints = await Ticket.countDocuments({
    priority: "high",
  });




  res.status(200).json({
    success: true,
    totalProducts,
    totalUsers,
    totalOrders,
    totalRevenue,
    lowStockProducts,
    outOfStockProducts,
    averageOrderValue,

    // Complaint Analytics
    totalComplaints,
    openComplaints,
    assignedComplaints,
    inProgressComplaints,
    waitingCustomerComplaints,
    waitingRefundComplaints,
    resolvedComplaints,
    closedComplaints,
    highPriorityComplaints,
  });
};
import Order from "../models/orderModel.js";

// Get Sales Summary
export const getSalesSummary = async (req, res) => {
  try {
    let query = {};

const days = Number(req.query.days);
console.log("Days Filter:", days);

if (days && days > 0) {
  const date = new Date();
  date.setDate(date.getDate() - days);

  query.createdAt = {
    $gte: date,
  };
}

const orders = await Order.find(query).populate("user", "name email");
console.log("Orders Returned:", orders.length);

    const totalOrders = orders.length;

    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.totalPrice,
      0
    );

    const totalProductsSold = orders.reduce((sum, order) => {
      const items = order.orderItems.reduce(
        (itemSum, item) => itemSum + item.quantity,
        0
      );

      return sum + items;
    }, 0);

    const averageOrderValue =
      totalOrders > 0 ? totalRevenue / totalOrders : 0;

   res.status(200).json({
    success: true,
    totalRevenue,
    totalOrders,
    totalProductsSold,
    averageOrderValue,
    orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
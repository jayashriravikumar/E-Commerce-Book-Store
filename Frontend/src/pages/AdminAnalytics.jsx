import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch("/api/v1/admin/analytics", {
          credentials: "include",
        });

        const data = await response.json();

        if (data.success) {
          setAnalytics(data);
        } else {
          console.log("Failed to fetch analytics");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAnalytics();
  }, []);

  const salesData = analytics
  ? [
      { month: "Jan", revenue: 900 },
      { month: "Feb", revenue: 1200 },
      { month: "Mar", revenue: 1800 },
      { month: "Apr", revenue: 1500 },
      { month: "May", revenue: 2100 },
      { month: "Jun", revenue: analytics.totalRevenue },
    ]
  : [];

  if (!analytics) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <h2 className="text-2xl font-semibold animate-pulse">
        Loading Analytics...
      </h2>
    </div>
  );
}


  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8">
        Admin Analytics Dashboard
      </h1>

      {/* ================= STORE ANALYTICS ================= */}

      <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-5">
        Store Analytics
      </h2>

      <div className="
grid
grid-cols-2
sm:grid-cols-2
md:grid-cols-3
lg:grid-cols-4
xl:grid-cols-5
gap-4
mb-10
">
 

        <div className="
bg-white
rounded-xl
shadow-md
p-5
cursor-pointer
hover:-translate-y-2
hover:shadow-2xl
hover:scale-[1.02]
transition-all
duration-300
">
         <h3 className="text-gray-500 text-sm font-medium">
  Total Products
</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">
  {analytics.totalProducts}
</p>
        </div>

        <div className="
bg-white
rounded-xl
shadow-md
p-5
cursor-pointer
hover:-translate-y-2
hover:shadow-2xl
hover:scale-[1.02]
transition-all
duration-300
">
         <h3 className="text-gray-500 text-sm font-medium">
  Total Users
</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">
  {analytics.totalUsers}
</p>
        </div>

        <div className="
bg-white
rounded-xl
shadow-md
p-5
cursor-pointer
hover:-translate-y-2
hover:shadow-2xl
hover:scale-[1.02]
transition-all
duration-300
">
         <h3 className="text-gray-500 text-sm font-medium">
  Total Orders
</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">
  {analytics.totalOrders}
</p>
        </div>

        <div className="
bg-white
rounded-xl
shadow-md
p-5
cursor-pointer
hover:-translate-y-2
hover:shadow-2xl
hover:scale-[1.02]
transition-all
duration-300
">
         <h3 className="text-gray-500 text-sm font-medium">
  Total Revenue
</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">
  ₹{analytics.totalRevenue}
</p>
        </div>

        <div className="
bg-white
rounded-xl
shadow-md
p-5
cursor-pointer
hover:-translate-y-2
hover:shadow-2xl
hover:scale-[1.02]
transition-all
duration-300
">
         <h3 className="text-gray-500 text-sm font-medium">
  Low Stock Books
</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">
  {analytics.lowStockProducts}
</p>
        </div>

        <div className="
bg-white
rounded-xl
shadow-md
p-5
cursor-pointer
hover:-translate-y-2
hover:shadow-2xl
hover:scale-[1.02]
transition-all
duration-300
">
         <h3 className="text-gray-500 text-sm font-medium">
  Out Of Stock
</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">
  {analytics.outOfStockProducts}
</p>
        </div>

        <div className="
bg-white
rounded-xl
shadow-md
p-5
cursor-pointer
hover:-translate-y-2
hover:shadow-2xl
hover:scale-[1.02]
transition-all
duration-300
">
         <h3 className="text-gray-500 text-sm font-medium">
  Average Order Value
</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">
  ₹{analytics.averageOrderValue}
</p>
        </div>

            </div>

      {/* ================= MONTHLY REVENUE ================= */}

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">

        <h2 className="text-2xl font-bold mb-5">
          📈 Monthly Revenue
        </h2>

        <div className="h-80">

          <ResponsiveContainer width="100%" height="100%">

            <LineChart data={salesData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#2563eb"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* ================= RECENT ORDERS ================= */}

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">

        <h2 className="text-2xl font-bold mb-5">
          🛒 Recent Orders
        </h2>

        {analytics.recentOrders?.length ? (

          <div className="space-y-4">

            {analytics.recentOrders
  ?.filter((order) => order.user)
  .map((order) => (

              <div
                key={order._id}
                className="flex justify-between border-b pb-3"
              >

                <div>

                  <p className="font-semibold">
                    #{order._id.slice(-6)}
                  </p>

                  <p className="text-gray-500">
  {order.user?.name}
</p>

<p className="text-sm text-gray-400">
  {order.orderItems?.length || 0} item(s)
</p>

                </div>

                <div className="text-right">

                  <p className="font-bold">
                    ₹{order.totalPrice}
                  </p>

                  <p className="text-blue-600 text-sm">
                    {order.orderStatus}
                  </p>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <p className="text-gray-500">
            No recent orders available.
          </p>

        )}

      </div>

      {/* ================= TOP SELLING BOOKS ================= */}

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">

        <h2 className="text-2xl font-bold mb-5">
          🏆 Top Selling Books
        </h2>

        {analytics.topSellingProducts?.length ? (

          <div className="space-y-4">

            {analytics.topSellingProducts.map((book, index) => (

              <div
                key={book._id}
                className="flex justify-between items-center border-b pb-3"
              >

                <div className="flex items-center gap-4">

                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                    {index + 1}
                  </div>
                   <img
    src={book.image?.[0]?.url}
    alt={book.name || book.title}
    className="w-14 h-20 rounded object-cover"
  />

                  <div>

                    <p className="font-semibold">
                      {book.name || book.title}
                    </p>

                    <p className="text-gray-500">
                      Reviews: {book.numOfReviews || 0}
                    </p>

                  </div>

                </div>

                <p className="font-bold">
                  ₹{book.price}
                </p>

              </div>

            ))}

          </div>

        ) : (

          <p className="text-gray-500">
            No top-selling books available.
          </p>

        )}

      </div>

      {/* ================= COMPLAINT ANALYTICS ================= */}

      <h2 className="text-2xl font-semibold mb-5">
        Complaint Analytics
      </h2>

      <div className="
grid
grid-cols-2
sm:grid-cols-2
md:grid-cols-3
lg:grid-cols-4
xl:grid-cols-5
gap-4
">

        <div className="
bg-white
rounded-xl
shadow-md
p-5
cursor-pointer
hover:-translate-y-2
hover:shadow-2xl
hover:scale-[1.02]
transition-all
duration-300
">
          <h3 className="text-gray-500 text-sm font-medium">
  Total Complaints
</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">
  {analytics.totalComplaints}
</p>
        </div>

        <div className="
bg-white
rounded-xl
shadow-md
p-5
cursor-pointer
hover:-translate-y-2
hover:shadow-2xl
hover:scale-[1.02]
transition-all
duration-300
">
          <h3 className="text-gray-500 text-sm font-medium">
  Open Complaints
</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">
  {analytics.openComplaints}
</p>
        </div>

        <div className="
bg-white
rounded-xl
shadow-md
p-5
cursor-pointer
hover:-translate-y-2
hover:shadow-2xl
hover:scale-[1.02]
transition-all
duration-300
">
          <h3 className="text-gray-500 text-sm font-medium">
  Assigned Complaints
</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">
  {analytics.assignedComplaints}
</p>
        </div>

        <div className="
bg-white
rounded-xl
shadow-md
p-5
cursor-pointer
hover:-translate-y-2
hover:shadow-2xl
hover:scale-[1.02]
transition-all
duration-300
">
          <h3 className="text-gray-500 text-sm font-medium">
  In Progress
</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">
  {analytics.inProgressComplaints}
</p>
        </div>

        <div className="
bg-white
rounded-xl
shadow-md
p-5
cursor-pointer
hover:-translate-y-2
hover:shadow-2xl
hover:scale-[1.02]
transition-all
duration-300
">
          <h3 className="text-gray-500 text-sm font-medium">
  Waiting Customer
</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">
  {analytics.waitingCustomerComplaints}
</p>
        </div>

        <div className="
bg-white
rounded-xl
shadow-md
p-5
cursor-pointer
hover:-translate-y-2
hover:shadow-2xl
hover:scale-[1.02]
transition-all
duration-300
">
          <h3 className="text-gray-500 text-sm font-medium">
  Waiting Refund
</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">
  {analytics.waitingRefundComplaints}
</p>
        </div>

        <div className="
bg-white
rounded-xl
shadow-md
p-5
cursor-pointer
hover:-translate-y-2
hover:shadow-2xl
hover:scale-[1.02]
transition-all
duration-300
">
          <h3 className="text-gray-500 text-sm font-medium">
  Resolved
</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">
  {analytics.resolvedComplaints}
</p>
        </div>

        <div className="
bg-white
rounded-xl
shadow-md
p-5
cursor-pointer
hover:-translate-y-2
hover:shadow-2xl
hover:scale-[1.02]
transition-all
duration-300
">
          <h3 className="text-gray-500 text-sm font-medium">
  Closed
</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">
  {analytics.closedComplaints}
</p>
        </div>

        <div className="
bg-white
rounded-xl
shadow-md
p-5
cursor-pointer
hover:-translate-y-2
hover:shadow-2xl
hover:scale-[1.02]
transition-all
duration-300
">
          <h3 className="text-gray-500 text-sm font-medium">
  High Priority
</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">
  {analytics.highPriorityComplaints}
</p>
        </div>

      </div>
    </div>
  );
};

export default AdminAnalytics;
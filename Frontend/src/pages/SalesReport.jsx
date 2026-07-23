import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const SalesReport = () => {
  const [summary, setSummary] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProductsSold: 0,
    averageOrderValue: 0,
  });

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(0);
  const chartData = orders.map((order, index) => ({
  order: `#${index + 1}`,
  revenue: order.totalPrice,
}));

  const fetchSalesSummary = async () => {
    try {
   const { data } = await axios.get(
  `/api/v1/summary?days=${days}`
);

      setSummary({
        totalRevenue: data.totalRevenue,
        totalOrders: data.totalOrders,
        totalProductsSold: data.totalProductsSold,
        averageOrderValue: data.averageOrderValue,
      });

      setOrders(data.orders || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
  fetchSalesSummary();
}, [days]);

  if (loading) {
    return (
      <div className="text-center mt-10 text-xl font-semibold">
        Loading Sales Report...
      </div>
    );

    
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-4 md:p-8">
        <PageTitle title="Sales Reports" />

        <div className="max-w-7xl mx-auto">

                    <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-800 mb-8">
            📊 Sales Reports
            </h2>

            <div className="flex flex-wrap justify-center gap-4 mb-8">

  <button
    onClick={() => setDays(1)}
   className={`px-5 py-2 rounded-lg transition

${
days===1
? "bg-blue-700 text-white"
: "bg-blue-500 text-white hover:bg-blue-700"
}

`}
  >
    Today
  </button>

  <button
    onClick={() => setDays(7)}
    className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
  >
    Last 7 Days
  </button>

  <button
    onClick={() => setDays(30)}
    className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition"
  >
    Last 30 Days
  </button>

  <button
    onClick={() => setDays(0)}
    className="bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
  >
    All Time
  </button>

</div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="
bg-white
rounded-xl
shadow-md
p-6
hover:shadow-xl
hover:-translate-y-1
transition
duration-300
">
              <h3 className="text-gray-500 text-sm font-semibold">
                Total Revenue
              </h3>

              <p className="text-3xl font-bold text-green-600 mt-2">
                ₹{summary.totalRevenue.toLocaleString()}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-gray-500 text-sm font-semibold">
                Total Orders
              </h3>

              <p className="text-3xl font-bold text-blue-600 mt-2">
                {summary.totalOrders}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-gray-500 text-sm font-semibold">
                Products Sold
              </h3>

              <p className="text-3xl font-bold text-purple-600 mt-2">
                {summary.totalProductsSold}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-gray-500 text-sm font-semibold">
                Average Order Value
              </h3>

              <p className="text-3xl font-bold text-orange-600 mt-2">
                ₹{summary.averageOrderValue.toFixed(2)}
              </p>
            </div>

          </div>
         

            <div className="bg-white rounded-xl shadow-md mt-10 p-6">
  <h2 className="text-2xl font-bold mb-6">
    Revenue by Order
  </h2>

  <div className="w-full h-[250px] md:h-[350px]">
    <ResponsiveContainer>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="order" />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="revenue"
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>

          {/* Sales History */}
          <div className="bg-white rounded-xl shadow-md mt-10 p-6">

            <h2 className="text-2xl font-bold mb-6">
              Sales History
            </h2>

            {orders.length === 0 ? (
              <div className="text-center text-gray-500 py-10">
                No sales available.
              </div>
            ) : (
              <div className="hidden md:block overflow-x-auto">

                <table className="w-full border-collapse">

                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 text-left">Order ID</th>
                      <th className="p-3 text-left">Customer</th>
                      <th className="p-3 text-left">Date</th>
                      <th className="p-3 text-left">Items</th>
                      <th className="p-3 text-left">Total</th>
                      <th className="p-3 text-left">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.map((order) => (
                      <tr
                        key={order._id}
                        className="border-t hover:bg-gray-50"
                      >
                        <td className="p-3">
                          {order._id.slice(-6)}
                        </td>

                        <td className="p-3">
                          {order.user?.name || "Unknown"}
                        </td>

                        <td className="p-3">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>

                        <td className="p-3">
                          {order.orderItems.length}
                        </td>

                        <td className="p-3 font-semibold">
                          ₹{order.totalPrice}
                        </td>

                        <td className="p-3">

<span
className={`px-3 py-1 rounded-full text-white text-sm

${
order.orderStatus==="Delivered"
? "bg-green-600"
: order.orderStatus==="Processing"
? "bg-blue-600"
: order.orderStatus==="Cancelled"
? "bg-red-600"
: "bg-gray-600"
}

`}
>

{order.orderStatus}

</span>

</td>
                      </tr>
                    ))}
                  </tbody>

                </table>

              </div>
              
            )}

          </div>
          <div className="md:hidden space-y-4">

{orders.map((order)=>(

<div
key={order._id}
className="bg-white rounded-xl shadow-md p-5"
>

<h2 className="font-bold">

Order #{order._id.slice(-6)}

</h2>

<p className="mt-2">

Customer:
<strong> {order.user?.name || "Unknown"}</strong>

</p>

<p>

Date:
<strong>
{" "}
{new Date(order.createdAt).toLocaleDateString()}
</strong>

</p>

<p>

Items:
<strong> {order.orderItems.length}</strong>

</p>

<p>

Total:
<strong className="text-green-600">

₹{order.totalPrice}

</strong>

</p>

<div className="mt-3">

<span
className={`px-3 py-1 rounded-full text-white text-sm

${
order.orderStatus==="Delivered"
? "bg-green-600"
: order.orderStatus==="Processing"
? "bg-blue-600"
: order.orderStatus==="Cancelled"
? "bg-red-600"
: "bg-gray-600"
}

`}
>

{order.orderStatus}

</span>

</div>

</div>

))}

</div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default SalesReport;
import React, { useEffect, useState } from "react";

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch("/api/v1/admin/analytics");
        const data = await response.json();
        setAnalytics(data);
      } catch (error) {
        console.log(error);
      }
    };

    

    fetchAnalytics();
  }, []);

  if (!analytics) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Admin Analytics Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-5">

        <div className="bg-white p-5 rounded shadow">
          <h3>Total Products</h3>
          <p>{analytics.totalProducts}</p>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <h3>Total Users</h3>
          <p>{analytics.totalUsers}</p>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <h3>Total Orders</h3>
          <p>{analytics.totalOrders}</p>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <h3>Total Revenue</h3>
          <p>₹{analytics.totalRevenue}</p>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <h3>Low Stock Books</h3>
          <p>{analytics.lowStockProducts}</p>
        </div>

        <div className="bg-white p-5 rounded shadow">
  <h3>Out of Stock</h3>
  <p>{analytics.outOfStockProducts}</p>
</div>

<div className="bg-white p-5 rounded shadow">
  <h3>Avg Order Value</h3>
  <p>₹{analytics.averageOrderValue}</p>
</div>

      </div>
    </div>
  );
};

export default AdminAnalytics;
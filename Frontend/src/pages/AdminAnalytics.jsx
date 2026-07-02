import React, { useEffect, useState } from "react";

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

  if (!analytics) {
    return (
      <h2 className="text-center mt-10 text-2xl font-semibold">
        Loading Analytics...
      </h2>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">
        Admin Analytics Dashboard
      </h1>

      {/* ================= STORE ANALYTICS ================= */}

      <h2 className="text-2xl font-semibold mb-5">
        Store Analytics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-5 mb-10">

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
          <h3>Out Of Stock</h3>
          <p>{analytics.outOfStockProducts}</p>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <h3>Average Order Value</h3>
          <p>₹{analytics.averageOrderValue}</p>
        </div>

      </div>

      {/* ================= COMPLAINT ANALYTICS ================= */}

      <h2 className="text-2xl font-semibold mb-5">
        Complaint Analytics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-5">

        <div className="bg-white p-5 rounded shadow">
          <h3>Total Complaints</h3>
          <p>{analytics.totalComplaints}</p>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <h3>Open Complaints</h3>
          <p>{analytics.openComplaints}</p>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <h3>Assigned Complaints</h3>
          <p>{analytics.assignedComplaints}</p>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <h3>In Progress</h3>
          <p>{analytics.inProgressComplaints}</p>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <h3>Waiting Customer</h3>
          <p>{analytics.waitingCustomerComplaints}</p>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <h3>Waiting Refund</h3>
          <p>{analytics.waitingRefundComplaints}</p>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <h3>Resolved</h3>
          <p>{analytics.resolvedComplaints}</p>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <h3>Closed</h3>
          <p>{analytics.closedComplaints}</p>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <h3>High Priority</h3>
          <p>{analytics.highPriorityComplaints}</p>
        </div>

      </div>
    </div>
  );
};

export default AdminAnalytics;
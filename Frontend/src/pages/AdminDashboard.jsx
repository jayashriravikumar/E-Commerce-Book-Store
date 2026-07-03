import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";

const adminCards = [
  {
    title: "Product Management",
    icon: "📚",
    path: "/admin/products",
    color: "bg-blue-500",
  },
  {
    title: "Inventory Management",
    icon: "📦",
    path: "/admin/inventory",
    color: "bg-green-500",
  },
  {
    title: "Order Management",
    icon: "🛒",
    path: "/admin/orders",
    color: "bg-orange-500",
  },
  {
    title: "Customer Management",
    icon: "👥",
    path: "/admin/customers",
    color: "bg-purple-500",
  },
  {
    title: "Review Management",
    icon: "⭐",
    path: "/admin/reviews",
    color: "bg-yellow-500",
  },
  {
    title: "Coupon Management",
    icon: "🎟️",
    path: "/admin/coupons",
    color: "bg-pink-500",
  },
  {
    title: "Analytics",
    icon: "📊",
    path: "/admin/analytics",
    color: "bg-cyan-500",
  },
  {
    title: "Support Tickets",
    icon: "🎫",
    path: "/admin/tickets",
    color: "bg-red-500",
  },
  {
    title: "FAQ Management",
    icon: "❓",
    path: "/admin/faqs",
    color: "bg-indigo-500",
  },
  {
  title: "Sales Reports",
  icon: "📊",
  path: "/admin/sales",
  color: "bg-emerald-500",
},
];

const AdminDashboard = () => {
  return (
    <>
      <PageTitle title="Admin Dashboard" />

      <div className="min-h-screen bg-gray-100">
        <Navbar />

        <main className="py-10 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Heading */}
            <div className="mb-10">
              <h1 className="text-4xl font-bold text-gray-800">
                Admin Dashboard
              </h1>

              <p className="text-gray-500 mt-2">
                Manage every aspect of your bookstore from one place.
              </p>
            </div>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {adminCards.map((card) => (
                <Link
                  key={card.title}
                  to={card.path}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group"
                >
                  <div className={`${card.color} h-2`} />

                  <div className="p-8 text-center">
                    <div className="text-5xl mb-5">
                      {card.icon}
                    </div>

                    <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition">
                      {card.title}
                    </h2>

                    <p className="text-gray-500 mt-3">
                      Open {card.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AdminDashboard;
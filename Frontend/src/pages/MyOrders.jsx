import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { myOrders, clearOrderErrors } from "../features/orders/orderSlice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.order);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearOrderErrors());
    }
    dispatch(myOrders());
  }, [dispatch, error]);

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10 min-h-screen">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">My Orders</h1>

        {loading ? <Loader /> : orders?.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold text-gray-700">You have no orders yet!</h2>
            <Link to="/products" className="inline-block mt-4 text-blue-600 hover:underline">Start Shopping</Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="p-4 font-semibold">Order ID</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold">Items</th>
                  <th className="p-4 font-semibold">Amount</th>
                  <th className="p-4 font-semibold text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50 transition">
                    <td className="p-4 text-sm text-gray-600">{order._id}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.orderStatus === "Delivered" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="p-4 text-gray-700">{order.orderItems.length}</td>
                    <td className="p-4 font-bold text-gray-800">₹{order.totalPrice}</td>
                    <td className="p-4 text-center">
                      <Link to={`/order/${order._id}`} className="text-blue-600 hover:text-blue-800 font-semibold hover:underline">
                        Track Order
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;
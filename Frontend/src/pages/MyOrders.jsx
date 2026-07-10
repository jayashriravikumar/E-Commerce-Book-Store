import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  myOrders,
  clearOrderErrors,
} from "../features/orders/orderSlice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const MyOrders = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector(
    (state) => state.order
  );

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

      <div className="max-w-6xl mx-auto px-3 md:px-4 py-6 md:py-10 min-h-screen">

        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-800">
          My Orders
        </h1>

        {loading ? (
          <Loader />
        ) : orders?.length === 0 ? (

          <div className="text-center py-16 md:py-20 bg-white rounded-2xl shadow-sm">

            <div className="text-6xl mb-4">
              📦
            </div>

            <h2 className="text-2xl font-bold">
              No Orders Yet
            </h2>

            <p className="text-gray-500 mt-2">
              Looks like you haven't placed any orders.
            </p>

            <Link
              to="/products"
              className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
            >
              Continue Shopping
            </Link>

          </div>

        ) : (

          <>

            {/* ================= DESKTOP TABLE ================= */}

            <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

              <table className="w-full">

                <thead>

                  <tr className="bg-gray-100">

                    <th className="p-4 text-left">
                      Order ID
                    </th>

                    <th className="p-4 text-left">
                      Status
                    </th>

                    <th className="p-4 text-left">
                      Books
                    </th>

                    <th className="p-4 text-left">
                      Amount
                    </th>

                    <th className="p-4 text-center">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {orders.map((order) => (

                    <tr
                      key={order._id}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="p-4 text-sm break-all">
                        {order._id}
                      </td>

                      <td className="p-4">

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold
                          ${
                            order.orderStatus === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : order.orderStatus === "Processing"
                              ? "bg-yellow-100 text-yellow-700"
                              : order.orderStatus === "Shipped"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {order.orderStatus}
                        </span>

                      </td>

                      <td className="p-4">
                        {order.orderItems.length}
                      </td>

                      <td className="p-4 font-bold">
                        ₹{order.totalPrice}
                      </td>

                      <td className="p-4 text-center">

                        <Link
                          to={`/order/${order._id}`}
                          className="text-blue-600 hover:underline font-semibold"
                        >
                          Track Order
                        </Link>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

            {/* ================= MOBILE CARDS ================= */}

            <div className="md:hidden space-y-4">

              {orders.map((order) => (

                <div
                  key={order._id}
                  className="bg-white rounded-2xl shadow-sm border p-4"
                >

                  <div className="flex justify-between">

                    <div>

                      <p className="text-xs text-gray-500">
                        Order ID
                      </p>

                      <p className="font-semibold break-all text-sm">
                        {order._id}
                      </p>

                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold h-fit
                      ${
                        order.orderStatus === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.orderStatus === "Processing"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.orderStatus === "Shipped"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.orderStatus}
                    </span>

                  </div>

                  <div className="mt-4 space-y-2">

                    <div className="flex justify-between">

                      <span className="text-gray-500">
                        Books
                      </span>

                      <span>
                        {order.orderItems.length}
                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span className="text-gray-500">
                        Amount
                      </span>

                      <span className="font-bold">
                        ₹{order.totalPrice}
                      </span>

                    </div>

                  </div>

                  <Link
                    to={`/order/${order._id}`}
                    className="block mt-5 bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-xl"
                  >
                    Track Order
                  </Link>

                </div>

              ))}

            </div>

          </>

        )}

      </div>

      <Footer />
    </>
  );
};

export default MyOrders;
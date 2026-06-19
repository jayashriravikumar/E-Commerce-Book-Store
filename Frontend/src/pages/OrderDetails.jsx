import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getOrderDetails, cancelMyOrder, clearOrderErrors } from "../features/orders/orderSlice";
import { Package, Truck, CheckCircle, XCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, orderDetails } = useSelector((state) => state.order);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearOrderErrors());
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, error, id]);

  const handleCancelOrder = () => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      dispatch(cancelMyOrder(id));
      toast.success("Order cancelled successfully");
    }
  };

  if (loading || !orderDetails) return <Loader />;

  const isCancelled = orderDetails.orderStatus === "Cancelled";
  const statusStep = isCancelled ? 0 : orderDetails.orderStatus === "Processing" ? 1 : orderDetails.orderStatus === "Shipped" ? 2 : 3;

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-10 min-h-screen">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Order Tracking</h1>
        <p className="text-gray-500 mb-8">Order ID: #{orderDetails._id}</p>

        {/* Tracking Timeline */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
          {isCancelled ? (
            <div className="flex flex-col items-center text-red-500">
              <XCircle size={60} className="mb-2" />
              <h2 className="text-2xl font-bold">Order Cancelled</h2>
              <p className="text-gray-600 mt-2">This order has been cancelled and will not be delivered.</p>
            </div>
          ) : (
            <div className="flex items-center justify-between relative">
              {/* Progress Line */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 z-0"></div>
              <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 z-0 transition-all duration-500`} style={{ width: statusStep === 1 ? '0%' : statusStep === 2 ? '50%' : '100%' }}></div>

              {/* Step 1: Processing */}
              <div className="relative z-10 flex flex-col items-center bg-white px-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${statusStep >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-400"}`}>
                  <Package size={24} />
                </div>
                <p className={`mt-2 font-semibold ${statusStep >= 1 ? "text-gray-900" : "text-gray-400"}`}>Processing</p>
              </div>

              {/* Step 2: Shipped */}
              <div className="relative z-10 flex flex-col items-center bg-white px-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${statusStep >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-400"}`}>
                  <Truck size={24} />
                </div>
                <p className={`mt-2 font-semibold ${statusStep >= 2 ? "text-gray-900" : "text-gray-400"}`}>Shipped</p>
              </div>

              {/* Step 3: Delivered */}
              <div className="relative z-10 flex flex-col items-center bg-white px-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${statusStep >= 3 ? "bg-green-500 text-white" : "bg-gray-200 text-gray-400"}`}>
                  <CheckCircle size={24} />
                </div>
                <p className={`mt-2 font-semibold ${statusStep >= 3 ? "text-green-600" : "text-gray-400"}`}>Delivered</p>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Order Details & Address */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold border-b pb-3 mb-4">Shipping Info</h2>
            <p><strong>Name:</strong> {orderDetails.user?.name}</p>
            <p><strong>Phone:</strong> {orderDetails.shippingAddress?.phoneNo}</p>
            <p><strong>Address:</strong> {`${orderDetails.shippingAddress?.address}, ${orderDetails.shippingAddress?.city}, ${orderDetails.shippingAddress?.state} - ${orderDetails.shippingAddress?.pinCode}`}</p>
            
            <h2 className="text-xl font-bold border-b pb-3 mt-8 mb-4">Payment Summary</h2>
            <p><strong>Status:</strong> {orderDetails.paymentInfo?.status === "Succeeded" ? <span className="text-green-600 font-bold">Paid</span> : <span className="text-orange-500 font-bold">Pending (COD)</span>}</p>
            <p><strong>Total Amount:</strong> ₹{orderDetails.totalPrice}</p>
            
            {/* Cancel Button */}
            {statusStep === 1 && !isCancelled && (
              <button onClick={handleCancelOrder} className="mt-8 w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold py-3 border border-red-200 rounded-xl transition-all">
                Cancel Order
              </button>
            )}
          </div>

          {/* Items List */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold border-b pb-3 mb-4">Items Ordered</h2>
            <div className="space-y-4">
              {orderDetails.orderItems?.map((item) => (
                <div key={item._id} className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded" />
                  <div>
                    <Link to={`/product/${item.product}`} className="text-blue-600 font-semibold hover:underline">
                      {item.name}
                    </Link>
                    <p className="text-gray-600">{item.quantity} x ₹{item.price} = <span className="font-bold text-gray-900">₹{item.quantity * item.price}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderDetails;
import { useEffect, useState } from "react";
import axios from "axios";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [status, setStatus] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/admin/orders");

      console.log(data);
      console.log(data.orders);

      setOrders(data.orders);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h2>Loading orders...</h2>;

  const updateOrderStatus = async () => {
    try {
      await axios.put(`/api/v1/admin/order/${selectedOrder._id}`, {
        status,
      });

      setShowUpdateModal(false);
      setSelectedOrder(null);

      fetchOrders();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteOrder = async () => {
    try {
      await axios.delete(`/api/v1/admin/order/${orderToDelete._id}`);

      setShowDeleteModal(false);
      setOrderToDelete(null);

      fetchOrders();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Unable to delete order.");
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      order._id.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || order.orderStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Order Management</h1>

          <p className="text-gray-600 mt-2">
            Manage customer orders and update their status.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by customer or Order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full md:w-80"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full md:w-56"
          >
            <option value="All">All Status</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            No orders available.
          </div>
        ) : (
          <>
          <div className="hidden md:block bg-white rounded-xl shadow-md overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-left">Order ID</th>
                  <th className="p-4 text-left">Customer</th>
                  <th className="p-4 text-left">Items</th>
                  <th className="p-4 text-left">Total</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Date</th>

                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="border-t hover:bg-gray-50">
                    <td className="p-4">{order._id.slice(-6)}</td>

                    <td className="p-4">{order.user?.name || "Unknown"}</td>

                    <td className="p-4">{order.orderItems.length}</td>

                    <td className="p-4 font-semibold">₹{order.totalPrice}</td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm
                      ${
                        order.orderStatus === "Delivered"
                          ? "bg-green-600"
                          : order.orderStatus === "Shipped"
                            ? "bg-blue-600"
                            : order.orderStatus === "Cancelled"
                              ? "bg-red-600"
                              : "bg-yellow-500"
                      }`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>

                    <td className="p-4">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowDetailsModal(true);
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg"
                        >
                          View
                        </button>

                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setStatus(order.orderStatus);
                            setShowUpdateModal(true);
                          }}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg"
                        >
                          Update
                        </button>

                        <button
                          onClick={() => {
                            setOrderToDelete(order);
                            setShowDeleteModal(true);
                          }}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="md:hidden space-y-4">

  {filteredOrders.map((order) => (

    <div
      key={order._id}
      className="bg-white rounded-xl shadow-md p-4"
    >

      {/* Header */}

      <div className="flex justify-between items-start">

        <div>

          <p className="text-xs text-gray-500">
            Order ID
          </p>

          <p className="font-semibold">
            #{order._id.slice(-6)}
          </p>

        </div>

        <span
          className={`px-3 py-1 rounded-full text-white text-xs
          ${
            order.orderStatus === "Delivered"
              ? "bg-green-600"
              : order.orderStatus === "Shipped"
              ? "bg-blue-600"
              : order.orderStatus === "Cancelled"
              ? "bg-red-600"
              : "bg-yellow-500"
          }`}
        >
          {order.orderStatus}
        </span>

      </div>

      {/* Customer */}

      <div className="mt-4 space-y-2">

        <div className="flex justify-between">
          <span className="text-gray-500">
            Customer
          </span>

          <span>
            {order.user?.name || "Unknown"}
          </span>
        </div>

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
            Total
          </span>

          <span className="font-bold">
            ₹{order.totalPrice}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">
            Date
          </span>

          <span>
            {new Date(order.createdAt).toLocaleDateString()}
          </span>
        </div>

      </div>

      {/* Buttons */}

      <div className="grid grid-cols-3 gap-2 mt-5">

        <button
          onClick={() => {
            setSelectedOrder(order);
            setShowDetailsModal(true);
          }}
          className="bg-blue-600 text-white py-2 rounded-lg text-sm"
        >
          View
        </button>

        <button
          onClick={() => {
            setSelectedOrder(order);
            setStatus(order.orderStatus);
            setShowUpdateModal(true);
          }}
          className="bg-yellow-500 text-white py-2 rounded-lg text-sm"
        >
          Update
        </button>

        <button
          onClick={() => {
            setOrderToDelete(order);
            setShowDeleteModal(true);
          }}
          className="bg-red-600 text-white py-2 rounded-lg text-sm"
        >
          Delete
        </button>

      </div>

    </div>

  ))}

</div>
</>
        )}
      </div>

      {showDetailsModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-[95%] md:w-[500px] max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Order Details</h2>

            <div className="space-y-3">
              <p>
                <strong>Order ID:</strong> {selectedOrder._id}
              </p>

              <p>
                <strong>Customer:</strong> {selectedOrder.user?.name}
              </p>

              <p>
                <strong>Email:</strong> {selectedOrder.user?.email}
              </p>

              <p>
                <strong>Phone:</strong> {selectedOrder.shippingAddress?.phoneNo}
              </p>

              <p>
                <strong>Status:</strong> {selectedOrder.orderStatus}
              </p>

              <p>
                <strong>Total:</strong> ₹{selectedOrder.totalPrice}
              </p>

              <p>
                <strong>Items:</strong> {selectedOrder.orderItems.length}
              </p>
              <p>
                <strong>Address:</strong>{" "}
                {selectedOrder.shippingAddress?.address},{" "}
                {selectedOrder.shippingAddress?.city},{" "}
                {selectedOrder.shippingAddress?.state},{" "}
                {selectedOrder.shippingAddress?.country} -{" "}
                {selectedOrder.shippingAddress?.pinCode}
              </p>

              <p>
                <strong>Payment Method:</strong>{" "}
                {selectedOrder.paymentInfo?.method}
              </p>

              <p>
                <strong>Payment Status:</strong>{" "}
                {selectedOrder.paymentInfo?.status}
              </p>

              <p>
                <strong>Ordered On:</strong>{" "}
                {new Date(selectedOrder.createdAt).toLocaleString()}
              </p>
            </div>
            <h3 className="text-lg font-semibold mt-5 mb-3">Ordered Items</h3>

            <div className="space-y-3">
              {selectedOrder.orderItems.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between border rounded-lg p-3"
                >
                  <div>
                    <p className="font-semibold">{item.name}</p>

                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold">₹{item.price}</p>

                    <p className="text-sm text-gray-500">
                      Total: ₹{item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedOrder(null);
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showUpdateModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[95%] md:w-96">
            <h2 className="text-2xl font-bold mb-6">Update Order Status</h2>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded-lg p-3 mb-6"
            >
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowUpdateModal(false);
                  setSelectedOrder(null);
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={updateOrderStatus}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && orderToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-96">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Delete Order
            </h2>

            <p className="mb-6">Are you sure you want to delete this order?</p>

            <div className="bg-gray-100 rounded-lg p-3 mb-6">
              <p>
                <strong>Order:</strong> {orderToDelete._id.slice(-6)}
              </p>

              <p>
                <strong>Customer:</strong> {orderToDelete.user?.name}
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setOrderToDelete(null);
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={deleteOrder}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;

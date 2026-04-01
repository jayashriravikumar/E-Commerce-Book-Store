import { Link } from "react-router-dom";

import { formatPrice } from "../utils/books";

const LAST_ORDER_STORAGE_KEY = "bookstore-last-order";

function readLastOrder() {
  const rawOrder = localStorage.getItem(LAST_ORDER_STORAGE_KEY);

  if (!rawOrder) {
    return null;
  }

  try {
    return JSON.parse(rawOrder);
  } catch {
    return null;
  }
}

function Orders() {
  const lastOrder = readLastOrder();

  return (
    <section className="p-10 bg-gray-100 min-h-screen">
      <div className="bg-white shadow rounded-lg p-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-2">Orders</h1>
        <p className="text-gray-600 mb-6">Track your latest order details here.</p>

        {!lastOrder?.orderId && (
          <div>
            <p className="text-gray-700 mb-4">No recent orders found for this device.</p>
            <Link to="/books" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
              Browse Books
            </Link>
          </div>
        )}

        {lastOrder?.orderId && (
          <div className="space-y-3 text-gray-700">
            <p>
              <span className="font-semibold">Order ID:</span> {lastOrder.orderId}
            </p>
            {Number(lastOrder.totalPrice) > 0 && (
              <p>
                <span className="font-semibold">Total:</span> {formatPrice(Number(lastOrder.totalPrice))}
              </p>
            )}
            {lastOrder.placedAt && (
              <p>
                <span className="font-semibold">Placed At:</span>{" "}
                {new Date(lastOrder.placedAt).toLocaleString()}
              </p>
            )}
            <Link
              to={`/order-confirmation/${lastOrder.orderId}`}
              state={{ totalPrice: Number(lastOrder.totalPrice) || 0 }}
              className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              View Confirmation
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default Orders;

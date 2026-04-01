import { Link, useLocation, useParams } from "react-router-dom";

import { formatPrice } from "../utils/books";

function OrderConfirmation() {
  const { orderId } = useParams();
  const location = useLocation();
  const orderMessage = location.state?.message || "Your order has been placed.";
  const totalPrice = Number(location.state?.totalPrice) || 0;

  return (
    <section className="p-10 bg-gray-100 min-h-screen flex items-start justify-center">
      <div className="bg-white shadow rounded-lg p-8 w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-3">Order Confirmation</h1>
        <p className="text-green-700 font-medium mb-6">{orderMessage}</p>

        <div className="space-y-3 text-gray-700">
          <p>
            <span className="font-semibold">Order ID:</span> {orderId}
          </p>
          {totalPrice > 0 && (
            <p>
              <span className="font-semibold">Total Paid:</span> {formatPrice(totalPrice)}
            </p>
          )}
        </div>

        <div className="mt-8 flex gap-3">
          <Link
            to="/books"
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
          >
            Continue Shopping
          </Link>
          <Link
            to="/"
            className="bg-gray-200 text-gray-900 px-5 py-2 rounded-lg hover:bg-gray-300"
          >
            Go Home
          </Link>
        </div>
      </div>
    </section>
  );
}

export default OrderConfirmation;

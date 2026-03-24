export default function Checkout() {
  return (
    <div className="p-10 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-8">
        Checkout
      </h1>

      <form className="bg-white shadow rounded-lg p-8 max-w-3xl">

        <div className="grid grid-cols-2 gap-6">

          <input
            placeholder="Full Name"
            className="border p-3 rounded"
          />

          <input
            placeholder="Email"
            className="border p-3 rounded"
          />

          <input
            placeholder="Address"
            className="border p-3 rounded col-span-2"
          />

          <input
            placeholder="City"
            className="border p-3 rounded"
          />

          <input
            placeholder="ZIP Code"
            className="border p-3 rounded"
          />

          <input
            placeholder="Card Number"
            className="border p-3 rounded col-span-2"
          />

        </div>

        <button className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700">
          Place Order
        </button>

      </form>

    </div>
  );
}
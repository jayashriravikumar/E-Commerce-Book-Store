import React from "react";

const Checkout = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Checkout
      </h1>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          placeholder="Phone Number"
          className="w-full border p-3 rounded"
        />

        <textarea
          placeholder="Address"
          className="w-full border p-3 rounded"
        ></textarea>

        <input
          type="text"
          placeholder="City"
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          placeholder="State"
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          placeholder="Pincode"
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
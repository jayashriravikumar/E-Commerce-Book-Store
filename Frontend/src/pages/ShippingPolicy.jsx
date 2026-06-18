import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ShippingPolicy = () => {
  return (
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen">
        <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h1 className="text-5xl font-bold mb-4">
              Shipping Policy
            </h1>

            <p className="text-orange-100 text-lg">
              Fast, secure and reliable delivery for all
              your book purchases.
            </p>

            <p className="mt-4 text-sm text-orange-200">
              Last Updated: June 2026
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="bg-white rounded-2xl shadow-md p-8 space-y-10">

            <section>
              <h2 className="text-2xl font-bold mb-4">
                1. Delivery Coverage
              </h2>

              <p className="text-gray-700 leading-7">
                We currently deliver across India through
                trusted courier partners.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                2. Processing Time
              </h2>

              <p className="text-gray-700 leading-7">
                Orders are usually processed within
                24-48 hours after successful payment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                3. Delivery Timeline
              </h2>

              <div className="grid md:grid-cols-3 gap-4">

                <div className="bg-gray-100 p-5 rounded-xl">
                  <h3 className="font-bold text-lg">
                    Metro Cities
                  </h3>
                  <p className="text-gray-600 mt-2">
                    2 - 4 Business Days
                  </p>
                </div>

                <div className="bg-gray-100 p-5 rounded-xl">
                  <h3 className="font-bold text-lg">
                    Tier 2 Cities
                  </h3>
                  <p className="text-gray-600 mt-2">
                    3 - 6 Business Days
                  </p>
                </div>

                <div className="bg-gray-100 p-5 rounded-xl">
                  <h3 className="font-bold text-lg">
                    Remote Areas
                  </h3>
                  <p className="text-gray-600 mt-2">
                    5 - 10 Business Days
                  </p>
                </div>

              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                4. Shipping Charges
              </h2>

              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>Free Shipping on orders above ₹999</li>
                <li>₹49 standard shipping below ₹999</li>
                <li>Express delivery charges may vary</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                5. Order Tracking
              </h2>

              <p className="text-gray-700 leading-7">
                Customers will receive tracking details
                through email or SMS once the order has
                been shipped.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                6. Delayed Deliveries
              </h2>

              <p className="text-gray-700 leading-7">
                Delivery delays caused by weather,
                transportation issues or public holidays
                are beyond our control.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                7. Contact Support
              </h2>

              <div className="bg-gray-100 p-4 rounded-xl">
                <p>Email: support@bookstore.com</p>
                <p>Phone: +91 XXXXX XXXXX</p>
              </div>
            </section>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ShippingPolicy;
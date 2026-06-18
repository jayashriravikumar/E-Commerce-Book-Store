import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RefundPolicy = () => {
  return (
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen">
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h1 className="text-5xl font-bold mb-4">
              Refund & Return Policy
            </h1>

            <p className="text-green-100 text-lg">
              We strive to provide the best shopping experience.
              Please review our return and refund guidelines below.
            </p>

            <p className="mt-4 text-sm text-green-200">
              Last Updated: June 2026
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="bg-white rounded-2xl shadow-md p-8 space-y-10">

            <section>
              <h2 className="text-2xl font-bold mb-4">
                1. Return Eligibility
              </h2>

              <p className="text-gray-700 leading-7">
                Customers may request a return within 7 days
                of delivery if the product is damaged,
                defective or incorrect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                2. Non-Returnable Items
              </h2>

              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>Used books</li>
                <li>Digital products</li>
                <li>Books damaged by customers</li>
                <li>Special order items</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                3. Refund Process
              </h2>

              <p className="text-gray-700 leading-7">
                Once the returned product is received and
                inspected, refunds will be processed within
                5-7 business days to the original payment
                method.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                4. Replacement Policy
              </h2>

              <p className="text-gray-700 leading-7">
                Customers may request a replacement instead
                of a refund if stock is available.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                5. Contact Support
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

export default RefundPolicy;
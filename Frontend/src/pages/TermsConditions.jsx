import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TermsConditions = () => {
  return (
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h1 className="text-5xl font-bold mb-4">
              Terms & Conditions
            </h1>

            <p className="text-slate-200 text-lg">
              Please read these terms carefully before using our bookstore
              services and placing orders.
            </p>

            <p className="mt-4 text-sm text-slate-300">
              Last Updated: June 2026
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="bg-white rounded-2xl shadow-md p-8 space-y-10">

            <section>
              <h2 className="text-2xl font-bold mb-4">
                1. Acceptance of Terms
              </h2>

              <p className="text-gray-700 leading-7">
                By accessing and using BookStore, you agree to comply with
                these Terms & Conditions and all applicable laws and regulations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                2. Account Responsibility
              </h2>

              <p className="text-gray-700 leading-7">
                Customers are responsible for maintaining the confidentiality
                of their account credentials and for all activities that occur
                under their account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                3. Product Information
              </h2>

              <p className="text-gray-700 leading-7">
                We strive to provide accurate product descriptions, pricing
                and availability. However, errors may occasionally occur and
                we reserve the right to correct them.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                4. Orders & Payments
              </h2>

              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>All orders are subject to availability.</li>
                <li>Prices may change without prior notice.</li>
                <li>Payments must be completed before order processing.</li>
                <li>Fraudulent transactions may result in cancellation.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                5. Shipping & Delivery
              </h2>

              <p className="text-gray-700 leading-7">
                Delivery timelines are estimates and may vary due to courier
                delays, weather conditions or unforeseen circumstances.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                6. Returns & Refunds
              </h2>

              <p className="text-gray-700 leading-7">
                Returns and refunds are governed by our Refund Policy.
                Customers should review the Refund Policy before making
                purchases.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                7. User Conduct
              </h2>

              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>Do not misuse the platform.</li>
                <li>Do not attempt unauthorized access.</li>
                <li>Do not upload harmful content.</li>
                <li>Respect intellectual property rights.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                8. Limitation of Liability
              </h2>

              <p className="text-gray-700 leading-7">
                BookStore shall not be liable for indirect, incidental or
                consequential damages arising from the use of our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                9. Changes to Terms
              </h2>

              <p className="text-gray-700 leading-7">
                We reserve the right to modify these Terms & Conditions at any
                time. Updates will be posted on this page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                10. Contact Information
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

export default TermsConditions;
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h1 className="text-5xl font-bold mb-4">
              Privacy Policy
            </h1>

            <p className="text-blue-100 text-lg">
              Your privacy is important to us. This policy explains how
              we collect, use and protect your information when you use
              our bookstore.
            </p>

            <p className="mt-4 text-sm text-blue-200">
              Last Updated: June 2026
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="bg-white rounded-2xl shadow-md p-8 space-y-10">

            <section>
              <h2 className="text-2xl font-bold mb-4">
                1. Information We Collect
              </h2>

              <p className="text-gray-700 leading-7">
                We collect personal information including your name,
                email address, phone number, shipping address and
                order details when you create an account or place an order.
              </p>

              <ul className="list-disc ml-6 mt-4 text-gray-700 space-y-2">
                <li>Name and contact information</li>
                <li>Shipping and billing address</li>
                <li>Order history</li>
                <li>Account login information</li>
                <li>Customer support communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                2. How We Use Your Information
              </h2>

              <p className="text-gray-700 leading-7">
                Information collected is used to process orders,
                provide customer support, improve website functionality
                and deliver a better shopping experience.
              </p>

              <ul className="list-disc ml-6 mt-4 text-gray-700 space-y-2">
                <li>Order processing</li>
                <li>Delivery notifications</li>
                <li>Customer support</li>
                <li>Fraud prevention</li>
                <li>Website improvements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                3. Cookies & Tracking Technologies
              </h2>

              <p className="text-gray-700 leading-7">
                We use cookies and similar technologies to remember
                user preferences, maintain login sessions and analyze
                website performance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                4. Payment Security
              </h2>

              <p className="text-gray-700 leading-7">
                Payments are processed through secure payment gateways.
                We do not store debit card, credit card or banking
                information on our servers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                5. Data Protection
              </h2>

              <p className="text-gray-700 leading-7">
                We implement industry-standard security measures to
                protect your information from unauthorized access,
                disclosure or misuse.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                6. Third-Party Services
              </h2>

              <p className="text-gray-700 leading-7">
                We may use trusted third-party providers for payments,
                analytics and shipping services. These providers only
                receive information necessary to perform their services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                7. User Rights
              </h2>

              <p className="text-gray-700 leading-7">
                Users may request access, correction or deletion of
                personal information by contacting customer support.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                8. Contact Us
              </h2>

              <p className="text-gray-700 leading-7">
                For questions regarding this Privacy Policy, please
                contact our support team:
              </p>

              <div className="mt-4 bg-gray-100 p-4 rounded-xl">
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

export default PrivacyPolicy;
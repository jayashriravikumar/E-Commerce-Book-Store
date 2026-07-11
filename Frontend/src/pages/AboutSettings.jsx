import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutSettings = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-8">

        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8">

          <h1 className="text-3xl font-bold mb-6">
            ℹ️ About
          </h1>

          <div className="space-y-5">

            <div>
              <h2 className="font-semibold">Application</h2>
              <p className="text-gray-500">
                Online Book Store
              </p>
            </div>

            <div>
              <h2 className="font-semibold">Version</h2>
              <p className="text-gray-500">
                Version 1.0.0
              </p>
            </div>

            <div>
              <h2 className="font-semibold">Developer</h2>
              <p className="text-gray-500">
                Tech Sakthi Solutions
              </p>
            </div>

            <div>
              <h2 className="font-semibold">Support</h2>
              <p className="text-blue-600">
                support@bookstore.com
              </p>
            </div>

          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default AboutSettings;
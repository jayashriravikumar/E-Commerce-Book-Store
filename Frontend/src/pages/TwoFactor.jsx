import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TwoFactor = () => {
  const [enabled, setEnabled] = useState(false);

  const handleToggle = () => {
    setEnabled(!enabled);

    if (!enabled) {
      alert("Two-Factor Authentication Enabled");
    } else {
      alert("Two-Factor Authentication Disabled");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8">

          <h1 className="text-3xl font-bold mb-6">
            🔐 Two-Factor Authentication
          </h1>

          <p className="text-gray-600 mb-8">
            Protect your account with an additional verification step during login.
          </p>

          <div className="flex justify-between items-center border rounded-xl p-5">

            <div>
              <h2 className="font-semibold text-lg">
                Two-Factor Authentication
              </h2>

              <p className="text-gray-500">
                Status: {enabled ? "Enabled" : "Disabled"}
              </p>
            </div>

            <button
              onClick={handleToggle}
              className={`px-6 py-3 rounded-lg text-white font-semibold ${
                enabled
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {enabled ? "Disable" : "Enable"}
            </button>

          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default TwoFactor;
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotificationSettings = () => {

  const [settings, setSettings] = useState({
    email: true,
    sms: false,
    orderUpdates: true,
    offers: true,
    wishlist: true,
    newsletter: false,
  });

  const toggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const items = [
    ["Email Notifications", "email"],
    ["SMS Notifications", "sms"],
    ["Order Updates", "orderUpdates"],
    ["Special Offers", "offers"],
    ["Wishlist Alerts", "wishlist"],
    ["Newsletter", "newsletter"],
  ];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-8">

        <div className="max-w-4xl mx-auto">

          <h1 className="text-3xl font-bold mb-8">
            🔔 Notification Settings
          </h1>

          <div className="space-y-4">

            {items.map(([label, key]) => (

              <div
                key={key}
                className="bg-white rounded-xl shadow p-5 flex justify-between items-center"
              >
                <h2>{label}</h2>

                <input
                  type="checkbox"
                  checked={settings[key]}
                  onChange={() => toggle(key)}
                  className="w-5 h-5"
                />

              </div>

            ))}

          </div>

        </div>

      </div>

      <Footer />

    </>
  );
};

export default NotificationSettings;
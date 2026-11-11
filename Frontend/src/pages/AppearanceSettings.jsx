import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AppearanceSettings = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto">

          <h1 className="text-3xl font-bold mb-8">
            🌙 Appearance
          </h1>

          <div className="bg-white rounded-xl shadow p-6">

            <div className="flex justify-between items-center">

              <div>
                <h2 className="text-xl font-semibold">
                  Dark Mode
                </h2>

                <p className="text-gray-500">
                  Switch between Light and Dark themes
                </p>

              </div>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-16 h-8 rounded-full transition ${
                  darkMode ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-7 h-7 bg-white rounded-full shadow transition ${
                    darkMode ? "translate-x-8" : "translate-x-0"
                  }`}
                />
              </button>

            </div>

          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default AppearanceSettings;
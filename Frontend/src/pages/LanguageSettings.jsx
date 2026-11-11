import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const LanguageSettings = () => {

  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("INR");

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-8">

        <div className="max-w-3xl mx-auto">

          <h1 className="text-3xl font-bold mb-8">
            🌐 Language & Currency
          </h1>

          <div className="bg-white rounded-xl shadow p-6 space-y-6">

            <div>

              <label className="font-semibold">
                Language
              </label>

              <select
                value={language}
                onChange={(e)=>setLanguage(e.target.value)}
                className="w-full border rounded-lg p-3 mt-2"
              >
                <option>English</option>
                <option>தமிழ்</option>
                <option>Hindi</option>
              </select>

            </div>

            <div>

              <label className="font-semibold">
                Currency
              </label>

              <select
                value={currency}
                onChange={(e)=>setCurrency(e.target.value)}
                className="w-full border rounded-lg p-3 mt-2"
              >
                <option>INR</option>
                <option>USD</option>
                <option>EUR</option>
              </select>

            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default LanguageSettings;
import React, { useEffect, useState } from "react";

const CookieConsent = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");

    if (!consent) {
      setShow(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShow(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "declined");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-5 left-5 right-5 md:left-auto md:w-[450px] z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6">
      <div className="flex items-start gap-4">
        <div className="text-4xl">🍪</div>

        <div>
          <h3 className="font-bold text-lg text-gray-900">
            We use cookies
          </h3>

          <p className="text-gray-600 text-sm mt-2">
            We use cookies to improve your shopping experience,
            remember your preferences and analyze website traffic.
          </p>

          <div className="flex gap-3 mt-5">
            <button
              onClick={acceptCookies}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition"
            >
              Accept All
            </button>

            <button
              onClick={declineCookies}
              className="border border-gray-300 hover:bg-gray-100 px-5 py-2 rounded-lg font-medium transition"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
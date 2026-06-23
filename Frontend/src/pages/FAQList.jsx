import React, { useState, useEffect } from "react";
import axios from "axios";

const FAQList = () => {
  const [faqs, setFaqs] = useState([]);
  const [openFAQ, setOpenFAQ] = useState(null); // ✅ consistent

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/faqs")
      .then((res) => setFaqs(res.data.faqs))
      .catch((err) => console.error(err));
  }, []);

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const categories = [
    { name: "Orders", id: "orders" },
    { name: "Returns", id: "returns" },
    { name: "Payments", id: "payments" },
    { name: "Account", id: "account" },
  ];

  return (
    <div className="space-y-8">
      {categories.map((cat) => (
        <div key={cat.id} id={cat.id} className="faq-category">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">{cat.name}</h2>
          {faqs
            .filter((faq) => faq.category === cat.name)
            .map((faq) => (
              <div
                key={faq._id}
                className="border rounded-xl shadow-sm bg-white mb-3"
              >
                <button
                  onClick={() => toggleFAQ(faq._id)}
                  className="w-full text-left px-4 py-3 font-semibold text-lg flex justify-between items-center"
                >
                  {faq.question}
                  <span>{openFAQ === faq._id ? "−" : "+"}</span>  {/* ✅ fixed */}
                </button>
                {openFAQ === faq._id && (
                  <div className="px-4 pb-4 text-gray-600">{faq.answer}</div>
                )}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default FAQList;

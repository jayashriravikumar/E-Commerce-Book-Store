import React, { useState } from "react";
import FAQList from "./FAQList";
import CustomerServiceForm from "../components/CustomerServiceForm";
import "./FAQ.css";

const FAQ = () => {
  const [selectedSubject, setSelectedSubject] = useState("");

  const handleQuickHelp = (subject, sectionId) => {
    setSelectedSubject(subject);

    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      {/* Welcome Header */}
      <div className="welcome-section text-center mb-8">
        <h1 className="text-2xl font-bold">
          Hi. Welcome to BookStore Customer Service
        </h1>

        <p className="text-gray-600">
          How can we help you today?
        </p>
      </div>


      <div className="faq-page">

        <div className="faq-section">
          <h1>Help & FAQs</h1>
          <FAQList />
        </div>

        <div className="service-section">
          <h2>Need More Help?</h2>
          <p>Submit your question to our Customer Service team:</p>

          <CustomerServiceForm
            selectedSubject={selectedSubject}
          />

        </div>

      </div>

    </div>
  );
};

export default FAQ;
import React, { useState, useEffect } from "react";
import axios from "axios";

const CustomerServiceForm = ({ selectedSubject }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    if (selectedSubject) {
      setFormData((prev) => ({
        ...prev,
        subject: selectedSubject,
      }));
    }
  }, [selectedSubject]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:8000/api/v1/customer-service",
        formData
      );

      alert("Your query has been submitted!");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Error submitting query"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <br />

      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <br />

      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={formData.subject}
        onChange={handleChange}
        required
      />

      <br />

      <textarea
        name="message"
        placeholder="Your Question"
        value={formData.message}
        onChange={handleChange}
        required
      />

      <br />

      <button type="submit">
        Submit
      </button>
    </form>
  );
};

export default CustomerServiceForm;
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import FAQList from "../components/FAQList";
import CustomerServiceForm from "../components/CustomerServiceForm";

const Support = () => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Other");
  const [order, setOrder] = useState("");
  const submitTicket = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/v1/tickets",
        { subject, description, category, order},
        { withCredentials: true },
      );
      toast.success("Complaint submitted successfully!");
      setSubject("");
      setDescription("");
      setCategory("Other");
      setOrder("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit complaint");
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-5">
      {/* Welcome Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-700">
          BookStore Customer Support
        </h1>
        <p className="text-gray-600 mt-2">We're here to help you with orders, payments, returns, complaints, and account-related issues.</p>
      </div>

       {/* FAQ */}
      <div className="mb-8">
        <FAQList />
      </div>

      {/* Complaint Form */}
      <div className="bg-white shadow rounded-lg p-6 mb-10">

        <h2 className="text-2xl font-bold mb-5">
          Raise a Complaint
        </h2>

        <form
          onSubmit={submitTicket}
          className="space-y-4"
        >

          {/* Complaint Category */}
          <div>
            <label className="font-semibold">
              Complaint Category
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded p-3 mt-1"
            >
              <option value="Damaged Product">
                Damaged Product
              </option>

              <option value="Wrong Product">
                Wrong Product
              </option>

              <option value="Missing Item">
                Missing Item
              </option>

              <option value="Late Delivery">
                Late Delivery
              </option>

              <option value="Refund">
                Refund
              </option>

              <option value="Payment">
                Payment
              </option>

              <option value="Technical">
                Technical
              </option>

              <option value="Other">
                Other
              </option>
            </select>
          </div>

          {/* Order */}
          <div>
            <label className="font-semibold">
              Order ID
            </label>

            <input
              type="text"
              placeholder="Enter your Order ID (Optional)"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="w-full border rounded p-3 mt-1"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="font-semibold">
              Subject
            </label>

            <input
              type="text"
              placeholder="Complaint Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border rounded p-3 mt-1"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold">
              Complaint Description
            </label>

            <textarea
              rows="5"
              placeholder="Describe your complaint..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded p-3 mt-1"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-3 rounded"
          >
            Submit Complaint
          </button>

        </form>
      </div>

      {/* Contact Form */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          Contact Customer Support
        </h2>

        <CustomerServiceForm selectedSubject={subject} />
      </div>

      {/* My Complaints */}
      <div className="text-center mt-10">
        <Link
          to="/your-messages"
          className="text-blue-600 font-semibold hover:underline"
        >
          View My Complaints →
        </Link>
      </div>

    </div>
  );
};

export default Support;
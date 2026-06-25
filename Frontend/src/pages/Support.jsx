import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import FAQList from "../components/FAQList";
import CustomerServiceForm from "../components/CustomerServiceForm";

const Support = () => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const submitTicket = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/v1/tickets",
        { subject, description },
        { withCredentials: true },
      );
      toast.success("Ticket created successfully");
      setSubject("");
      setDescription("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create ticket");
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-5">
      {/* Welcome Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-700">
          Hi. Welcome to BookStore Customer Service
        </h1>
        <p className="text-gray-600 mt-2">How can we help you today?</p>
      </div>

      {/* Quick Help Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button
          className="border p-4 rounded hover:bg-blue-50"
          onClick={() => document.getElementById("orders").scrollIntoView()}
        >
          Orders
        </button>
        <button
          className="border p-4 rounded hover:bg-blue-50"
          onClick={() => document.getElementById("returns").scrollIntoView()}
        >
          Returns & Refunds
        </button>
        <button
          className="border p-4 rounded hover:bg-blue-50"
          onClick={() => document.getElementById("payments").scrollIntoView()}
        >
          Payments
        </button>
        <button
          className="border p-4 rounded hover:bg-blue-50"
          onClick={() => document.getElementById("account").scrollIntoView()}
        >
          Account Settings
        </button>
      </div>

      {/* Unified FAQ Section */}
      <div className="mb-6">
        <FAQList />
      </div>

      {/* Ticket Creation */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Create a Support Ticket</h2>
        <form onSubmit={submitTicket} className="space-y-2">
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-yellow-400"
            required
          />
          <textarea
            placeholder="Describe your issue"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-yellow-400"
            rows="5"
            required
          />
          <button
            type="submit"
            className="bg-yellow-500 text-black font-semibold px-5 py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            Submit Ticket
          </button>
        </form>
      </div>

      {/* Contact Us Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-5">Contact Us</h2>
        <p className="text-gray-600 mb-4">
          If you prefer, you can reach us directly through this form:
        </p>
        <CustomerServiceForm selectedSubject={subject} />
      </div>

      {/* Your Messages Link */}
      <div className="mt-8 text-center">
        <p className="text-gray-600">Already contacted us?</p>
        <Link
          to="/your-messages"
          className="text-blue-600 hover:underline font-semibold"
        >
          View Your Messages →
        </Link>
      </div>
    </div>
  );
};

export default Support;

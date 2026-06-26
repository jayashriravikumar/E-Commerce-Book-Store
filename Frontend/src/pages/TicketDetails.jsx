import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const TicketDetails = () => {
  const { id } = useParams();

  const [ticket, setTicket] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadTicket();
  }, []);

  const loadTicket = async () => {
    try {
      const { data } = await axios.get(`/api/v1/tickets/${id}`, {
        withCredentials: true,
      });

      setTicket(data.ticket);
      setCurrentUser(data.currentUser);
    } catch (error) {
      console.log(error);
    }
  };

  const sendReply = async () => {
    if (!message.trim()) return;

    try {
      await axios.post(
        `/api/v1/tickets/${id}/messages`,
        {
          text: message,
        },
        {
          withCredentials: true,
        }
      );

      setMessage("");
      loadTicket();
    } catch (error) {
      toast.error("Failed to send reply");
    }
  };

  const updateStatus = async (status) => {
    try {
      await axios.put(
        `/api/v1/tickets/${id}`,
        {
          status,
        },
        {
          withCredentials: true,
        }
      );

      toast.success("Complaint updated");
      loadTicket();
    } catch (error) {
      toast.error("Failed to update complaint");
    }
  };

  if (!ticket)
    return <h2 className="text-center mt-10">Loading...</h2>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-5">

      {/* Complaint Header */}

      <div className="bg-white shadow rounded-lg p-6 mb-6">

        <h2 className="text-3xl font-bold mb-4">
          {ticket.subject}
        </h2>

        <div className="grid md:grid-cols-2 gap-3">

          <p>
            <strong>Complaint ID :</strong>{" "}
            {ticket.complaintId}
          </p>

          <p>
            <strong>Category :</strong>{" "}
            {ticket.category}
          </p>

          <p>
            <strong>Priority :</strong>{" "}
            {ticket.priority}
          </p>

          <p>
            <strong>Status :</strong>{" "}
            <span className="font-semibold text-blue-600">
              {ticket.status}
            </span>
          </p>

          <p>
            <strong>Order ID :</strong>{" "}
            {ticket.order || "N/A"}
          </p>

          <p>
            <strong>Created :</strong>{" "}
            {new Date(ticket.createdAt).toLocaleString()}
          </p>

        </div>

        <div className="mt-5">

          <h3 className="font-bold mb-2">
            Complaint Description
          </h3>

          <p className="text-gray-700">
            {ticket.description}
          </p>

        </div>

      </div>

      {/* Resolution */}

      {ticket.resolution && (

        <div className="bg-green-50 border border-green-300 rounded p-4 mb-6">

          <h3 className="font-bold text-green-700">
            Resolution
          </h3>

          <p className="mt-2">
            {ticket.resolution}
          </p>

        </div>

      )}

      {/* Timeline */}

      <div className="bg-white shadow rounded-lg p-6 mb-6">

        <h3 className="text-xl font-bold mb-4">
          Complaint Timeline
        </h3>

        {ticket.history?.length > 0 ? (

          ticket.history.map((item, index) => (

            <div
              key={index}
              className="border-l-4 border-blue-500 pl-4 mb-4"
            >

              <p className="font-semibold">
                {item.status}
              </p>

              <small className="text-gray-500">
                {new Date(item.updatedAt).toLocaleString()}
              </small>

            </div>

          ))

        ) : (

          <p>No timeline available.</p>

        )}

      </div>

      {/* Admin Controls */}

      {currentUser?.role === "admin" && (

        <div className="bg-white shadow rounded-lg p-6 mb-6">

          <h3 className="font-bold mb-4">
            Update Complaint Status
          </h3>

          <div className="flex flex-wrap gap-3">

            <button
              onClick={() => updateStatus("assigned")}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Assign
            </button>

            <button
              onClick={() => updateStatus("in-progress")}
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              In Progress
            </button>

            <button
              onClick={() => updateStatus("waiting-customer")}
              className="bg-purple-600 text-white px-4 py-2 rounded"
            >
              Waiting Customer
            </button>

            <button
              onClick={() => updateStatus("waiting-refund")}
              className="bg-orange-600 text-white px-4 py-2 rounded"
            >
              Waiting Refund
            </button>

            <button
              onClick={() => updateStatus("resolved")}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Resolve
            </button>

            <button
              onClick={() => updateStatus("closed")}
              className="bg-gray-700 text-white px-4 py-2 rounded"
            >
              Close
            </button>

          </div>

        </div>

      )}

      {/* Chat */}

      <div className="bg-white shadow rounded-lg p-6">

        <h3 className="text-xl font-bold mb-4">
          Complaint Conversation
        </h3>

        <div className="border rounded p-4 bg-gray-50 h-96 overflow-y-auto">

          {ticket.messages?.map((msg, index) => (

            <div
              key={index}
              className={`mb-4 ${
                msg.sender?.role === "admin"
                  ? "text-left"
                  : "text-right"
              }`}
            >

              <div
                className={`inline-block px-4 py-3 rounded-lg ${
                  msg.sender?.role === "admin"
                    ? "bg-blue-100"
                    : "bg-green-100"
                }`}
              >

                <strong>
                  {msg.sender?.role === "admin"
                    ? "Support Team"
                    : "You"}
                </strong>

                <p>{msg.text}</p>

                <small className="text-gray-500">
                  {new Date(msg.createdAt).toLocaleString()}
                </small>

              </div>

            </div>

          ))}

        </div>

        <textarea
          className="w-full border mt-5 rounded p-3"
          rows="4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your reply..."
        />

        <button
          onClick={sendReply}
          className="bg-green-600 text-white px-5 py-2 rounded mt-4"
        >
          Send Reply
        </button>

      </div>

    </div>
  );
};

export default TicketDetails;
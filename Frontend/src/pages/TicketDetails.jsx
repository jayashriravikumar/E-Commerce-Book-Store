import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const TicketDetails = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
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
    } catch (error) {
      console.error("Error loading ticket:", error);
    }
  };

  const sendReply = async () => {
    try {
      await axios.post(
        `/api/v1/tickets/${id}/messages`,
        { text: message },
        { withCredentials: true },
      );
      setMessage("");
      loadTicket();
    } catch (error) {
      console.error("Error sending reply:", error);
    }
  };

  const updateStatus = async (newStatus) => {
    try {
      await axios.put(
        `/api/v1/tickets/${id}`,
        { status: newStatus },
        { withCredentials: true },
      );
      loadTicket(); // reload ticket after update
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (!ticket) return <h2 className="text-center mt-10">Loading...</h2>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5">
      <h2 className="text-3xl font-bold mb-3">{ticket.subject}</h2>
      <p className="mb-5 text-gray-600">Status: {ticket.status}</p>

      {/* ✅ Show buttons only if current user is admin */}
      {ticket.currentUser?.role === "admin" && (
        <div className="flex gap-3 mb-5">
          <button
            onClick={() => updateStatus("in-progress")}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Mark In Progress
          </button>
          <button
            onClick={() => updateStatus("resolved")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Mark Resolved
          </button>
        </div>
      )}

      {/* Chat thread */}
      <div className="border p-4 rounded bg-gray-50 mb-5">
        {ticket.messages?.map((msg, index) => (
          <div
            key={index}
            className={`mb-3 p-3 rounded ${
              msg.sender?.role === "admin"
                ? "bg-blue-100 text-blue-900 text-left"
                : "bg-green-100 text-green-900 text-right"
            }`}
          >
            <strong>{msg.sender?.role === "admin" ? "Admin" : "You"}:</strong>
            <p>{msg.text}</p>
            <small className="text-gray-500 block">
              {new Date(msg.createdAt).toLocaleString()}
            </small>
          </div>
        ))}
      </div>

      <textarea
        className="w-full border p-3 rounded"
        rows="4"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your reply..."
      />

      <button
        onClick={sendReply}
        className="bg-green-600 text-white px-5 py-2 mt-3 rounded hover:bg-green-700"
      >
        Send Reply
      </button>
    </div>
  );
};

export default TicketDetails;

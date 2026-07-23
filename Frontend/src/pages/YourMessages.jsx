import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const YourMessages = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
  try {
    const { data } = await axios.get("/api/v1/tickets", {
      withCredentials: true,
    });
    setTickets(data.tickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
  }
};


  return (
    <div className="max-w-5xl mx-auto mt-10 p-5">
      <h2 className="text-3xl font-bold mb-5">Your Messages</h2>

      {tickets.length === 0 ? (
      <p className="text-gray-500">No messages yet.</p>
       ) : (
      tickets.map((ticket) => (
        <div
          key={ticket._id}
          className="border p-4 mb-3 rounded shadow hover:shadow-md transition"
        >
          <h3 className="font-bold text-lg">{ticket.subject}</h3>
          <p className="text-gray-600">Status: {ticket.status}</p>
          <p className="text-gray-600">Priority: {ticket.priority}</p>
          <p className="text-gray-600">Category: {ticket.category}</p>

          <Link
            to={`/ticket/${ticket._id}`}
            className="text-blue-600 font-semibold hover:underline mt-2 block"
          >
            View Details →
          </Link>
        </div>
      ))
    )}
    </div>
  );
};
export default YourMessages;

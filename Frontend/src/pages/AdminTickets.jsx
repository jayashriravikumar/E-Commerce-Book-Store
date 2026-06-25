import { useEffect, useState } from "react";
import axios from "axios";

const AdminTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    const { data } = await axios.get(
      "/api/v1/admin/tickets",
      {
        withCredentials: true,
      }
    );

    setTickets(data.tickets);
  };

  const updateStatus = async (
    id,
    status
  ) => {
    await axios.put(
      `/api/v1/admin/ticket/status/${id}`,
      { status },
      { withCredentials: true }
    );

    loadTickets();
  };

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-5">
        Admin Tickets
      </h2>

      {tickets.map((ticket) => (
        <div
          key={ticket._id}
          className="border p-4 mb-4 rounded"
        >
          <h3 className="font-bold">
            {ticket.subject}
          </h3>

          <p>
            User: {ticket.user?.name}
          </p>

          <p>
            Status: {ticket.status}
          </p>

          <select
            value={ticket.status}
            onChange={(e) =>
              updateStatus(
                ticket._id,
                e.target.value
              )
            }
            className="border p-2 mt-2"
          >
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default AdminTickets;
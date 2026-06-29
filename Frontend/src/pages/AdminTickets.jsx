import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AdminTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const { data } = await axios.get("/api/v1/tickets", {
        withCredentials: true,
      });

      setTickets(data.tickets);
    } catch (error) {
      toast.error("Failed to load complaints");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `/api/v1/tickets/${id}`,
        { status },
        { withCredentials: true }
      );

      toast.success("Complaint updated");
      loadTickets();
    } catch (error) {
      toast.error("Failed to update complaint");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "text-red-600";

      case "assigned":
        return "text-blue-600";

      case "in-progress":
        return "text-yellow-600";

      case "waiting-customer":
        return "text-purple-600";

      case "waiting-refund":
        return "text-orange-600";

      case "resolved":
        return "text-green-600";

      case "closed":
        return "text-gray-600";

      default:
        return "text-black";
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-5">

      <h1 className="text-3xl font-bold mb-8">
        Complaint Management Dashboard
      </h1>

      {tickets.length === 0 ? (
        <h2>No Complaints Found</h2>
      ) : (
        <div className="space-y-5">

          {tickets.map((ticket) => (

            <div
              key={ticket._id}
              className="bg-white shadow rounded-lg p-6"
            >

              <div className="grid md:grid-cols-2 gap-3">

                <p>
                  <strong>Complaint ID :</strong>{" "}
                  {ticket.complaintId}
                </p>

                <p>
                  <strong>Customer :</strong>{" "}
                  {ticket.user?.name}
                </p>

                <p>
                  <strong>Email :</strong>{" "}
                  {ticket.user?.email}
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
                  <span
                    className={`font-bold ${getStatusColor(ticket.status)}`}
                  >
                    {ticket.status}
                  </span>
                </p>

              </div>

              <div className="mt-4">

                <h3 className="font-bold">
                  Subject
                </h3>

                <p>{ticket.subject}</p>

              </div>

              <div className="mt-4">

                <h3 className="font-bold">
                  Description
                </h3>

                <p>{ticket.description}</p>

              </div>

              <div className="flex flex-wrap gap-3 mt-6">

                <button
                  onClick={() =>
                    updateStatus(ticket._id, "assigned")
                  }
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Assign
                </button>

                <button
                  onClick={() =>
                    updateStatus(ticket._id, "in-progress")
                  }
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  In Progress
                </button>

                <button
                  onClick={() =>
                    updateStatus(ticket._id, "waiting-customer")
                  }
                  className="bg-purple-600 text-white px-4 py-2 rounded"
                >
                  Waiting Customer
                </button>

                <button
                  onClick={() =>
                    updateStatus(ticket._id, "waiting-refund")
                  }
                  className="bg-orange-600 text-white px-4 py-2 rounded"
                >
                  Waiting Refund
                </button>

                <button
                  onClick={() =>
                    updateStatus(ticket._id, "resolved")
                  }
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Resolve
                </button>

                <button
                  onClick={() =>
                    updateStatus(ticket._id, "closed")
                  }
                  className="bg-gray-700 text-white px-4 py-2 rounded"
                >
                  Close
                </button>

                <Link
                  to={`/ticket/${ticket._id}`}
                  className="bg-black text-white px-4 py-2 rounded"
                >
                  Open Complaint
                </Link>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
};

export default AdminTickets;
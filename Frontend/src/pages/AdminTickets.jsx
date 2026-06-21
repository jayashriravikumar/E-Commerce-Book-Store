import { useEffect, useState } from "react";
import { getAllTickets, replyTicket } from "../api/customerServiceAPI";

const AdminTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    const res = await getAllTickets();
    setTickets(res.data);
  };

  const markResolved = async (id) => {
    await replyTicket(id, { status: "Resolved" });
    loadTickets();
  };

  return (
    <div>
      <h2>Admin Tickets</h2>

      {tickets.map((t) => (
        <div key={t._id}>
          <h4>{t.subject}</h4>
          <p>{t.message}</p>
          <p>Status: {t.status}</p>

          <button onClick={() => markResolved(t._id)}>Mark Resolved</button>
        </div>
      ))}
    </div>
  );
};

export default AdminTickets;

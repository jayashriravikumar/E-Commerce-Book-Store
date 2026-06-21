import { useEffect, useState } from "react";
import { getMyTickets } from "../api/customerServiceAPI";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    const res = await getMyTickets();
    setTickets(res.data);
  };

  return (
    <div>
      <h2>My Tickets</h2>

      {tickets.map((t) => (
        <div key={t._id}>
          <h4>{t.subject}</h4>
          <p>{t.message}</p>
          <p>Status: {t.status}</p>
        </div>
      ))}
    </div>
  );
};

export default MyTickets;
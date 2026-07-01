import { useEffect, useState } from "react";
import axios from "axios";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
  try {
    const { data } = await axios.get("/api/v1/admin/orders");

    console.log(data);
    console.log(data.orders);

    setOrders(data.orders);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  if (loading) return <h2>Loading orders...</h2>;

  return (
    <div>
      <h1>Order Management</h1>
    </div>
  );
};

export default OrderManagement;
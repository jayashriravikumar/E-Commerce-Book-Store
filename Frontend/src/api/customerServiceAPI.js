import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true, // Send authentication cookies
});

export const createTicket = (data) =>
  API.post("/customer-service", data);

export const getMyTickets = () =>
  API.get("/customer-service/my");

export const getAllTickets = () =>
  API.get("/customer-service");

export const replyTicket = (id, data) =>
  API.put(`/customer-service/${id}/reply`, data);
import CustomerService from "../models/customerServiceModel.js";
import HandleError from "../helper/handleError.js";

// Create Ticket
export const createTicket = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const ticket = await CustomerService.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Ticket submitted successfully!",
      ticket,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// User Tickets
export const getMyTickets = async (req, res, next) => {
  try {
    const tickets = await CustomerService.find();

    res.status(200).json({
      success: true,
      tickets,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Admin Tickets
export const getAllTickets = async (req, res, next) => {
  try {
    const tickets = await CustomerService.find();

    res.status(200).json({
      success: true,
      tickets,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Update Status
export const updateTicketStatus = async (req, res, next) => {
  try {
    const ticket = await CustomerService.findById(req.params.id);

    if (!ticket) {
      return next(new HandleError("Ticket not found", 404));
    }

    ticket.status = req.body.status;

    await ticket.save();

    res.status(200).json({
      success: true,
      ticket,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
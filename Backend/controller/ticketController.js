import Ticket from "../models/ticketModel.js";
import HandleError from "../helper/handleError.js";

// Create ticket
export const createTicket = async (req, res, next) => {
  const { subject, description, priority, category } = req.body;
  if (!subject || !description) {
    return next(new HandleError("Subject and description are required", 400));
  }

  const ticket = await Ticket.create({
    subject,
    description,
    priority: priority || "medium",
    category: category || "Other",
    user: req.user.id,
    status: "open"
  });

  res.status(201).json({ success: true, ticket });
};

// Get tickets
export const getTickets = async (req, res, next) => {
  let tickets;
  if (req.user.role === "admin") {
    tickets = await Ticket.find().populate("user", "name email");
    
  } else {
    tickets = await Ticket.find({ user: req.user.id });
  }
  res.status(200).json({ success: true, tickets });
};

// Get single ticket
export const getSingleTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate("user", "name email role") // include role of ticket owner
      .populate("messages.sender", "name email role"); // include role of message sender

    if (!ticket) return next(new HandleError("Ticket not found", 404));

    res.status(200).json({
      success: true,
      ticket,
      currentUser: { role: req.user.role } // ✅ send logged-in user role
    });
  } catch (error) {
    next(error);
  }
};




// Update ticket
export const updateTicket = async (req, res, next) => {
  const { status, response, priority, category } = req.body;
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) return next(new HandleError("Ticket not found", 404));

  ticket.status = status || ticket.status;
  ticket.response = response || ticket.response;
  ticket.priority = priority || ticket.priority;
  ticket.category = category || ticket.category;
  await ticket.save();

  res.status(200).json({ success: true, ticket });
};

// Delete ticket
export const deleteTicket = async (req, res, next) => {
  const ticket = await Ticket.findByIdAndDelete(req.params.id);
  if (!ticket) return next(new HandleError("Ticket not found", 404));
  res.status(200).json({ success: true, message: "Ticket deleted successfully" });
};

// Add message
export const addMessage = async (req, res, next) => {
  const { text } = req.body;
  if (!text) return next(new HandleError("Message text is required", 400));

  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) return next(new HandleError("Ticket not found", 404));

  ticket.messages.push({ sender: req.user.id, text });
  await ticket.save();

  res.status(200).json({ success: true, ticket });
};

// Get messages
export const getMessages = async (req, res, next) => {
  const ticket = await Ticket.findById(req.params.id)
    .populate("messages.sender", "name email role");
  if (!ticket) return next(new HandleError("Ticket not found", 404));

  res.status(200).json({ success: true, messages: ticket.messages });
};

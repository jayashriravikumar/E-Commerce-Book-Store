import Ticket from "../models/ticketModel.js";
import HandleError from "../helper/handleError.js";

// ======================================
// Create Complaint
// ======================================
export const createTicket = async (req, res, next) => {
  try {
    const {
      subject,
      description,
      category,
      order,
      attachments,
    } = req.body;

    if (!subject || !description) {
      return next(
        new HandleError("Subject and description are required", 400)
      );
    }

    // Auto Priority
    let priority = "medium";

    if (
      category === "Damaged Product" ||
      category === "Wrong Product" ||
      category === "Payment" ||
      category === "Refund"
    ) {
      priority = "high";
    }

    if (
      category === "Late Delivery" ||
      category === "Missing Item"
    ) {
      priority = "medium";
    }

    if (
      category === "Technical" ||
      category === "Other"
    ) {
      priority = "low";
    }
    const ticketData = {
  subject,
  description,
  category,
  priority,
  attachments,
  user: req.user.id,

  history: [
    {
      status: "open",
      updatedBy: req.user.id,
    },
  ],
};


// Add order only if provided
if (order && order.trim() !== "") {
  ticketData.order = order;
}

const ticket = await Ticket.create(ticketData);

    res.status(201).json({
      success: true,
      ticket,
    });
  } catch (error) {
  console.log("CREATE TICKET ERROR:");
  console.log(error);
  return res.status(500).json({
    success: false,
    message: error.message,
  });
}
};

// ======================================
// Get All Tickets
// ======================================
export const getTickets = async (req, res, next) => {
  try {
    let tickets;

    if (req.user.role === "admin") {
      tickets = await Ticket.find()
        .populate("user", "name email")
        .populate("assignedTo", "name")
        .sort({ createdAt: -1 });
    } else {
      tickets = await Ticket.find({
        user: req.user.id,
      }).sort({
        createdAt: -1,
      });
    }

    res.status(200).json({
      success: true,
      tickets,
    });
  } catch (error) {
    next(error);
  }
};

// ======================================
// Get Single Complaint
// ======================================
export const getSingleTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate("user", "name email role")
      .populate("assignedTo", "name email")
      .populate("messages.sender", "name email role")
      .populate("history.updatedBy", "name role");

    if (!ticket) {
      return next(new HandleError("Complaint not found", 404));
    }

    res.status(200).json({
      success: true,
      ticket,
      currentUser: {
        role: req.user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ======================================
// Update Complaint
// ======================================
export const updateTicket = async (req, res, next) => {
  try {
    const {
      status,
      category,
      resolution,
      assignedTo,
    } = req.body;

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return next(new HandleError("Complaint not found", 404));
    }

    if (status) {
      ticket.status = status;

      ticket.history.push({
        status,
        updatedBy: req.user.id,
      });
    }

    if (category) {
      ticket.category = category;
    }

    if (resolution) {
      ticket.resolution = resolution;
    }

    if (assignedTo) {
      ticket.assignedTo = assignedTo;
    }

    await ticket.save();

    res.status(200).json({
      success: true,
      ticket,
    });
  } catch (error) {
    next(error);
  }
};

// ======================================
// Delete Complaint
// ======================================
export const deleteTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);

    if (!ticket) {
      return next(new HandleError("Complaint not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Complaint deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// ======================================
// Add Chat Message
// ======================================
export const addMessage = async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text) {
      return next(new HandleError("Message is required", 400));
    }

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return next(new HandleError("Complaint not found", 404));
    }

    ticket.messages.push({
      sender: req.user.id,
      text,
    });

    await ticket.save();

    res.status(200).json({
      success: true,
      ticket,
    });
  } catch (error) {
    next(error);
  }
};

// ======================================
// Get Chat Messages
// ======================================
export const getMessages = async (req, res, next) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate(
      "messages.sender",
      "name email role"
    );

    if (!ticket) {
      return next(new HandleError("Complaint not found", 404));
    }

    res.status(200).json({
      success: true,
      messages: ticket.messages,
    });
  } catch (error) {
    next(error);
  }
};
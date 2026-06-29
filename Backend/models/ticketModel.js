import mongoose from "mongoose";

// =======================
// Message Schema
// =======================
const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  text: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// =======================
// Complaint History Schema
// =======================
const historySchema = new mongoose.Schema({
  status: {
    type: String,
  },

  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// =======================
// Attachment Schema
// =======================
const attachmentSchema = new mongoose.Schema({
  public_id: String,
  url: String,
});

// =======================
// Ticket Schema
// =======================
const ticketSchema = new mongoose.Schema(
  {
    // Complaint Number
    complaintId: {
      type: String,
      unique: true,
    },

    // Subject
    subject: {
      type: String,
      required: true,
    },

    // Complaint Description
    description: {
      type: String,
      required: true,
    },

    // Complaint Category
    category: {
      type: String,
      enum: [
        "Damaged Product",
        "Wrong Product",
        "Missing Item",
        "Late Delivery",
        "Refund",
        "Payment",
        "Technical",
        "Other",
      ],
      default: "Other",
    },

    // Complaint Status
    status: {
      type: String,
      enum: [
        "open",
        "assigned",
        "in-progress",
        "waiting-customer",
        "waiting-refund",
        "resolved",
        "closed",
      ],
      default: "open",
    },

    // Priority
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    // Admin Response
    response: {
      type: String,
    },

    // Linked Order
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },

    // Customer
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Assigned Support/Admin
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // Complaint Images
    attachments: [attachmentSchema],

    // Resolution Notes
    resolution: {
      type: String,
    },

    // Customer Rating
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },

    // Customer Feedback
    feedback: {
      type: String,
    },

    // Complaint Timeline
    history: [historySchema],

    // Chat Messages
    messages: [messageSchema],
  },
  {
    timestamps: true,
  },
);

// =======================
// Generate Complaint ID
// =======================
ticketSchema.pre("save", async function () {
  if (!this.complaintId) {
    const count = await mongoose.models.Ticket.countDocuments();
    this.complaintId = `CMP-${1001 + count}`;
  }
});

export default mongoose.model("Ticket", ticketSchema);

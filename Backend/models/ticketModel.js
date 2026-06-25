import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const ticketSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["open", "in-progress", "resolved"], default: "open" },
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  category: { type: String, enum: ["Order", "Payment", "Technical", "Other"], default: "Other" },
  response: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  messages: [messageSchema]
}, { timestamps: true });

export default mongoose.model("Ticket", ticketSchema);

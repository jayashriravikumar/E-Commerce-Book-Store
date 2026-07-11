import mongoose from "mongoose";

const paymentMethodSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },

    cardHolderName: {
      type: String,
      required: true,
      trim: true,
    },

    cardNumber: {
      type: String,
      required: true,
    },

    expiryMonth: {
      type: String,
      required: true,
    },

    expiryYear: {
      type: String,
      required: true,
    },

    cardType: {
      type: String,
      enum: ["Visa", "MasterCard", "RuPay", "Amex", "Other"],
      default: "Other",
    },

    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "PaymentMethod",
  paymentMethodSchema
);
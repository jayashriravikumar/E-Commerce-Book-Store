import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Orders",
        "Payment",
        "Shipping",
        "Returns",
        "Coupons",
        "Books",
        "Account",
      ],
      default: "Orders",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("FAQ", faqSchema);
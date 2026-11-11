import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },

  discount: {
    type: Number,
    required: true,
  },

  expiryDate: {
  type: Date,
  required: true,
},

minimumOrderAmount: {
  type: Number,
  default: 0,
},

usageLimit: {
  type: Number,
  default: 1,
},

usedCount: {
  type: Number,
  default: 0,
},

maximumDiscount: {
  type: Number,
  default: 0,
},

  active: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Coupon", couponSchema);
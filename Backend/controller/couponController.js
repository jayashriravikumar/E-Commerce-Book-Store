import Coupon from "../models/couponModel.js";
import HandleError from "../helper/handleError.js";

export const createCoupon = async (req, res, next) => {
  const coupon = await Coupon.create(req.body);

  res.status(201).json({
    success: true,
    coupon,
  });
};

export const applyCoupon = async (req, res, next) => {
  const { code } = req.body;

  const coupon = await Coupon.findOne({
    code: code.toUpperCase(),
    active: true,
  });

  if (!coupon) {
    return next(
      new HandleError("Invalid Coupon", 400)
    );
  }

  res.status(200).json({
    success: true,
    discount: coupon.discount,
  });
};
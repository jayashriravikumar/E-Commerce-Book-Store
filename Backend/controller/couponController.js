import Coupon from "../models/couponModel.js";
import HandleError from "../helper/handleError.js";

export const createCoupon = async (req, res, next) => {
   console.log(req.body);
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

export const getAllCoupons = async (req, res, next) => {
  const coupons = await Coupon.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    coupons,
  });
};

export const updateCoupon = async (req, res, next) => {
  let coupon = await Coupon.findById(req.params.id);

  if (!coupon) {
    return next(new HandleError("Coupon not found", 404));
  }

  coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    coupon,
  });
};

export const deleteCoupon = async (req, res, next) => {
  const coupon = await Coupon.findById(req.params.id);

  if (!coupon) {
    return next(new HandleError("Coupon not found", 404));
  }

  await coupon.deleteOne();

  res.status(200).json({
    success: true,
    message: "Coupon deleted successfully",
  });
};
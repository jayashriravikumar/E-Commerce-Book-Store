import Newsletter from "../models/newsletterModel.js";
import HandleError from "../helper/handleError.js";
import { sendEmail } from "../helper/sendEmail.js";

// Subscribe to Newsletter
export const subscribeNewsletter = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return next(new HandleError("Please enter your email", 400));
    }

    // Check if already subscribed
    const existingSubscriber = await Newsletter.findOne({
      email: email.toLowerCase(),
    });

    if (existingSubscriber) {
      return next(
        new HandleError("This email is already subscribed.", 400)
      );
    }

    // Save subscriber
    const subscriber = await Newsletter.create({
      email: email.toLowerCase(),
    });

    // Send confirmation email
    const message = `
Welcome to BookStore Newsletter!

Thank you for subscribing.

You'll now receive:

• New Book Arrivals
• Exclusive Discounts
• Promotional Offers
• Reading Recommendations

Happy Reading!
`;

    await sendEmail({
      email: subscriber.email,
      subject: "Welcome to BookStore Newsletter",
      message,
    });

    res.status(201).json({
      success: true,
      message: "Newsletter subscription successful.",
    });

  } catch (error) {
    next(error);
  }
};

// Admin - Get all subscribers
export const getAllSubscribers = async (req, res, next) => {
  try {

    const subscribers = await Newsletter.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: subscribers.length,
      subscribers,
    });

  } catch (error) {
    next(error);
  }
};

// Unsubscribe
export const unsubscribeNewsletter = async (req, res, next) => {
  try {

    const { email } = req.body;

    const subscriber = await Newsletter.findOne({
      email: email.toLowerCase(),
    });

    if (!subscriber) {
      return next(
        new HandleError("Subscriber not found.", 404)
      );
    }

    await Newsletter.deleteOne({
      email: email.toLowerCase(),
    });

    res.status(200).json({
      success: true,
      message: "Successfully unsubscribed.",
    });

  } catch (error) {
    next(error);
  }
};
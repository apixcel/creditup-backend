import { stripe } from "../app";
import { catchAsyncError } from "../utils/catchAsyncError";
import sendResponse from "../utils/sendResponse";

export const createStripePaymentIntent = catchAsyncError(
  async (req, res, next) => {
    const { amount = 0 } = req.body;
    const payAmount = Number(amount) * 100;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: payAmount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    sendResponse(res, {
      data: paymentIntent.client_secret,
      message: "successfully get payment intent",
      success: true,
    });
  }
);

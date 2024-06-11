import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { stripe } from "../app";
import Customer from "../models/customer.model";
import CustomerAddress from "../models/customerAddress.model";
import CreditUp from "../models/customerCreditUp.model";
import CustomerDetails from "../models/customerDetails.model";
import { User } from "../models/userModel";
import { catchAsyncError } from "../utils/catchAsyncError";
import createToken from "../utils/jwtToken";
import sendResponse from "../utils/sendResponse";
import { findUserByEmailOrNumber } from "../utils/user";

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

export const confirmPaymentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;
  console.log(body);

  const isExist = await findUserByEmailOrNumber(body.emailOrNumber);
  if (isExist) {
    return sendResponse(res, {
      data: null,
      message: "User already exists with this email or number",
      statusCode: 400,
      success: false,
    });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const result = await User.create([body], { session });
    const customerAddress = await CustomerAddress.create([body], { session });
    const customerCredit = await CreditUp.create([body], { session });
    const customerDetails = await CustomerDetails.create([body], { session });

    const customerObj = {
      customerAddress: customerAddress[0]._id,
      auth: result[0]._id,
      creditUp: customerCredit[0]._id,
      customerDetail: customerDetails[0]._id,
    };

    const customer = await Customer.create([{ ...customerObj, ...body }], {
      session,
    });
    const { password, ...user } = result[0].toObject();

    const token = createToken(user, "7d");

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      data: user,
      message: "User created successfully",
      statusCode: 200,
      success: true,
      token,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    next(error);
    sendResponse(res, {
      data: null,
      message: "Failed to create user",
      statusCode: 500,
      success: false,
    });
  }
};

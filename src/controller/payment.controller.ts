import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { stripe } from "../app";
import Circumstances from "../models/circumstance.model";
import Customer from "../models/customer.model";
import CustomerAddress from "../models/customerAddress.model";
import CreditUp from "../models/customerCreditUp.model";
import CustomerDetails from "../models/customerDetails.model";
import { User } from "../models/userModel";
import { appendDataInSheetController } from "../services/googApi.service";
import { catchAsyncError } from "../utils/catchAsyncError";
import createToken from "../utils/jwtToken";
import sendResponse from "../utils/sendResponse";
import { findUserByEmailOrNumber } from "../utils/user";
const calculateBillingCycleAnchor = (desiredDate: string) => {
  const today = new Date();
  const nextBillingDate = new Date(desiredDate);

  if (nextBillingDate <= today) {
    nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);
  }

  return Math.floor(nextBillingDate.getTime() / 1000); // Convert to Unix timestamp
};

export const createSubscriptionSession = catchAsyncError(async (req, res) => {
  const { email, paymentMethodId, date } = req.body;
  const planId = process.env.PRICING_BASIC;
  console.log(planId);

  try {
    // Create customer
    const customer = await stripe.customers.create({
      email,
      payment_method: paymentMethodId,
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // Create subscription
    const billingCycle = calculateBillingCycleAnchor(date);
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ plan: planId }],
      expand: ["latest_invoice.payment_intent"],
      billing_cycle_anchor: billingCycle,
      proration_behavior: "none",
      // trial_end: billingCycle - 1,
    });

    if (subscription.status !== "active") {
      return res.json({
        success: false,
        message: "Incomplete status",
        data: null,
      });
    }

    res.send({
      success: true,
      data: subscription,
      message: "Successfully create subscription session",
    });
  } catch (error: any) {
    res
      .status(400)
      .send({ success: false, message: error.message, data: null });
  }
});

export const createStripePaymentIntent = catchAsyncError(
  async (req, res, next) => {
    const { amount = 24.99 } = req.body;
    const payAmount = Number(amount) * 100;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: payAmount,
      currency: "gbp",
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

  const isExist = await findUserByEmailOrNumber(body.email);
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
    // const newCreditUp = new CreditUp(body.creditUp);
    const creditUP = await CreditUp.create([{ credits: body.creditUp }], {
      session,
    });

    const customerDetails = await CustomerDetails.create([body], { session });
    const circumstances = await Circumstances.create([body], { session });

    const bodyReplica = { ...body };

    [
      "customerAddress",
      "auth",
      "creditUp",
      "customerDetail",
      "circumstances",
    ].forEach((val) => delete bodyReplica[val]);

    const customerObj = {
      customerAddress: customerAddress[0]._id,
      auth: result[0]._id,
      creditUp: creditUP[0]._id,
      customerDetail: customerDetails[0]._id,
      circumstances: circumstances[0]._id,
      ...bodyReplica,
    };

    const customer = await Customer.create([customerObj], {
      session,
    });
    const { password, ...user } = result[0].toObject();

    const token = createToken(user, "7d");

    const { creditUp, ...rest } = req.body;

    const sheetArr: Record<string, unknown> = { ...rest };

    creditUp.forEach((data: any, i: number) => {
      sheetArr.lender =
        i === 0
          ? `${sheetArr.lender || ""} ${data.lender}`
          : `${sheetArr.lender || ""}, ${data.lender}`;
      sheetArr.outstandingBalance =
        i === 0
          ? `${sheetArr.outstandingBalance || ""} ${data.outstandingBalance}`
          : `${sheetArr.outstandingBalance || ""}, ${data.outstandingBalance}`;
      sheetArr.contribute =
        i === 0
          ? `${sheetArr.contribute || ""} ${data.contribute}`
          : `${sheetArr.contribute || ""}, ${data.contribute}`;
    });

    sheetArr.total = body.creditUp?.length || 0;

    // add data in sheet
    await appendDataInSheetController(sheetArr);

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
    console.log(error);
    next(error);
    sendResponse(res, {
      data: null,
      message: "Failed to create user",
    
      statusCode: 500,
      success: false,
    });
  }
};

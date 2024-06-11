import { Request, Response } from "express";
import Customer from "../models/customer.model";
import CustomerAddress from "../models/customerAddress.model";
import CreditUp from "../models/customerCreditUp.model";
import CustomerDetails from "../models/customerDetails.model";
import AppError from "../utils/appError";
import { catchAsyncError } from "../utils/catchAsyncError";
import sendResponse from "../utils/sendResponse";
import { findCustomerByEmailOrNumber } from "../utils/user";

export const updateCustomer = catchAsyncError(
  async (req: Request, res: Response) => {
    const data = req.body;

    console.log(data);
    const user = req.user;

    if (!user) {
      throw new AppError(400, "Uncought user not found");
    }
    const emailOrNumber = user.emailOrNumber;

    const isExist = await findCustomerByEmailOrNumber(emailOrNumber);

    if (!isExist) {
      return sendResponse(res, {
        data: null,
        message: "User doesn't exist!",
        statusCode: 404,
        success: false,
      });
    }

    const updateCustomer = await Customer.findByIdAndUpdate(isExist._id, data, {
      new: true,
      runValidators: true,
    });

    if (!updateCustomer) {
      return res.status(404).json({
        message: "Customer not found!",
      });
    }

    sendResponse(res, {
      message: "successfully updated customer",
      data: updateCustomer,
      success: true,
    });
  }
);

export const updateCustomerAddressController = catchAsyncError(
  async (req: Request, res: Response) => {
    const { data } = req.body;
    const user = req.user;

    if (!user) {
      throw new AppError(400, "Uncought user not found");
    }
    const emailOrNumber = user.emailOrNumber;

    const isExist = await findCustomerByEmailOrNumber(emailOrNumber);

    if (!isExist) {
      return sendResponse(res, {
        data: null,
        message: "User doesn't exist!",
        statusCode: 404,
        success: false,
      });
    }

    if (!data) {
      return res.status(404).json({
        message: "You must add data",
      });
    }

    const updateCustomerAddress = await CustomerAddress.findByIdAndUpdate(
      isExist._id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updateCustomerAddress) {
      return res.status(404).json({
        message: "Customer not found!",
      });
    }

    sendResponse(res, {
      message: "Customer successfully updated!",
      data: updateCustomerAddress,
      success: true,
    });
  }
);
export const updateCustomerCreditUpController = catchAsyncError(
  async (req, res) => {
    const body = req.body;
    const user = req.user;

    if (!user) {
      throw new AppError(400, "Uncought user not found");
    }
    const emailOrNumber = user.emailOrNumber;
    const isExistCustomer = await findCustomerByEmailOrNumber(emailOrNumber);

    if (!isExistCustomer) {
      return sendResponse(res, {
        message: "User not found",
        success: false,
        data: null,
        statusCode: 404,
      });
    }

    const update = await CreditUp.findByIdAndUpdate(
      isExistCustomer.creditUp,
      body,
      {
        new: true,
      }
    );

    sendResponse(res, {
      message: "successfully updated credit info",
      data: update,
      success: true,
    });
  }
);
export const updateCustomerDetailsController = catchAsyncError(
  async (req, res) => {
    const body = req.body;
    const user = req.user;

    if (!user) {
      throw new AppError(400, "Uncought user not found");
    }
    const emailOrNumber = user.emailOrNumber;
    const isExistCustomer = await findCustomerByEmailOrNumber(emailOrNumber);

    if (!isExistCustomer) {
      return sendResponse(res, {
        message: "User not found",
        success: false,
        data: null,
        statusCode: 404,
      });
    }

    const update = await CustomerDetails.findByIdAndUpdate(
      isExistCustomer.customerAddress,
      body,
      {
        new: true,
      }
    );

    sendResponse(res, {
      message: "successfully updated credit info",
      data: update,
      success: true,
    });
  }
);

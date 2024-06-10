import { Request, Response } from "express";
import Customer from "../models/customer.model";
import sendResponse from "../utils/sendResponse";

export const updateCustomer = async (req: Request, res: Response) => {
  const { data } = req.body;

  const email = "sakibsarkar707@gmail.com";
  const isExist = await Customer.findOne({ emailOrNumber: email });

  if (!isExist) {
    return sendResponse(res, {
      data: null,
      message: "User not found!",
      statusCode: 404,
      success: false,
    });
  }

  if (!data) {
    return res.status(404).json({
      message: "You must add data",
    });
  }

  try {
    const updateCustomer = await Customer.findByIdAndUpdate(
      isExist._id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updateCustomer) {
      return res.status(404).json({
        message: "Customer not found!",
      });
    }

    res.status(204).json({
      message: "Customer successfully updated!",
      customer: updateCustomer,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

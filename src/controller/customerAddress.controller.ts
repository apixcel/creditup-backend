import { Request, Response } from "express";
import CustomerAddress from "../models/customerAddress.model";
import sendResponse from "../utils/sendResponse";
import {
  findCustomerByEmailOrNumber,
  findUserByEmailOrNumber,
} from "../utils/user";
import Customer from "../models/customer.model";

export const updateCustomerAddress = async (req: Request, res: Response) => {
  const { data } = req.body;

  const email = "sakibsarkar707@gmail.com";
  const isExist = await findCustomerByEmailOrNumber(email);

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

  try {
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

    res.status(204).json({
      message: "Customer successfully updated!",
      customerAddress: updateCustomerAddress,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

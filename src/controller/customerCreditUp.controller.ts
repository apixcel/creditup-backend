import AppError from "../utils/appError";
import { catchAsyncError } from "../utils/catchAsyncError";
import { findCustomerByEmailOrNumber } from "../utils/user";

export const updateCustomerCreditController = catchAsyncError(
  async (req, res) => {
    const user = req.user;
    if (!user) {
      throw new AppError(400, "Uncought user not found");
    }
    const emailOrNumber = user.emailOrNumber;
    const isExistCustomer = await findCustomerByEmailOrNumber
  }
);

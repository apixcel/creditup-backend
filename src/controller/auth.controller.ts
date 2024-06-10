import bcrypt from "bcrypt";
import Customer from "../models/customer.model";
import CustomerAddress from "../models/customerAddress.model";
import CreditUp from "../models/customerCreditUp.model";
import CustomerDetails from "../models/customerDetails.model";
import { User } from "../models/userModel";
import { catchAsyncError } from "../utils/catchAsyncError";
import createToken from "../utils/jwtToken";
import sendResponse from "../utils/sendResponse";
import { bcryptSalRound, findUserByEmailOrNumber } from "../utils/user";
export const registerController = catchAsyncError(async (req, res, next) => {
  const { body } = req;
  const isExist = await findUserByEmailOrNumber(body.emailOrNumber);
  if (isExist) {
    return sendResponse(res, {
      data: null,
      message: "User already exist in this email or number",
      statusCode: 400,
      success: false,
    });
  }
  const result = await User.create(body);
  const customerAdress = await CustomerAddress.create({});
  const customerCredit = await CreditUp.create({});
  const customerDetails = await CustomerDetails.create({});

  const customerObj = {
    customerAddress: customerAdress._id,
    auth: result._id,
    creditUp: customerCredit._id,
    customerDetail: customerDetails._id,
  };

  const customer = await Customer.create({
    ...customerObj,
    emailOrNumber: body.emailOrNumber,
  });
  const { password, ...user } = result.toObject();

  const token = createToken(user, "7d");

  res.status(200).json({
    data: user,
    message: "User creaeted successfully",
    statusCode: 200,
    success: true,
    token,
  });
});
export const loginController = catchAsyncError(async (req, res, next) => {
  const { emailOrNumber, password } = req.body;
  const user = await findUserByEmailOrNumber(emailOrNumber);
  if (!user) {
    return sendResponse(res, {
      data: null,
      message: "User not found",
      statusCode: 404,
      success: false,
    });
  }

  const isPasswordMathced = await bcrypt.compare(password, user.password);
  if (!isPasswordMathced) {
    return sendResponse(res, {
      data: null,
      message: "Password didn't matched",
      statusCode: 401,
      success: false,
    });
  }

  const { password: pass, ...restUser } = user.toObject();

  const token = createToken(restUser, "7d");

  res.status(200).json({
    data: restUser,
    message: "Successfully loged in",
    statusCode: 200,
    success: true,
    token: token,
  });
});
export const passwordResetController = catchAsyncError(
  async (req, res, next) => {
    const { emailOrNumber, newPassword, oldPassword } = req.body;
    const user = await findUserByEmailOrNumber(emailOrNumber);
    if (!user) {
      return sendResponse(res, {
        data: null,
        message: "User not found",
        statusCode: 404,
        success: false,
      });
    }
    console.log(user.password);

    const isPasswordMathced = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordMathced) {
      return sendResponse(res, {
        data: null,
        message: "Password didn't matched",
        statusCode: 401,
        success: false,
      });
    }

    const newBcryptedPassword = await bcrypt.hash(newPassword, bcryptSalRound);
    await User.findOneAndUpdate(
      { emailOrNumber },
      { password: newBcryptedPassword },
      { new: true }
    );
    sendResponse(res, {
      data: null,
      success: true,
      message: "password updated successfully",
      statusCode: 200,
    });
  }
);

import bcrypt from "bcrypt";
import { User } from "../models/userModel";
import { catchAsyncError } from "../utils/catchAsyncError";
import createToken from "../utils/jwtToken";
import sendResponse from "../utils/sendResponse";
import { bcryptSalRound, findUserByEmailOrNumber } from "../utils/user";

export const checkIsExist = catchAsyncError(async (req, res) => {
  const { emailOrNumber } = req.body;
  const isExist = await findUserByEmailOrNumber(emailOrNumber);
  if (isExist) {
    return res.json({
      success: false,
      message: "User already exist in this email or number",
      data: null,
      duplicate: true,
    });
  }
  res.json({
    success: true,
    message: "ok :)",
    data: null,
    duplicate: false,
  });
});

export const loginController = catchAsyncError(async (req, res, next) => {
  const { emailOrNumber, password, userType } = req.body;
  try {
    const user = await User.findOne({ emailOrNumber, userType }).select(
      "+password"
    );

    if (!user) {
      return sendResponse(res, {
        data: null,
        message: `No ${userType} found on this emailOrNumber.`,
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
  } catch (error) {
    console.log(error);
  }
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

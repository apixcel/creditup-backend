import Customer from "../models/customer.model";
import { User } from "../models/userModel";

export const findUserByEmailOrNumber = async (emailOrNumber: string) => {
  const result = await User.findOne({
    $or: [{ email: emailOrNumber }, { phone: emailOrNumber }],
  }).select("+password");
  return result;
};
export const findCustomerByEmailOrNumber = async (emailOrNumber: string) => {
  const result = await Customer.findOne({
    $or: [{ email: emailOrNumber }, { phone: emailOrNumber }],
  });
  return result;
};
export const bcryptSalRound = 10 as const;

import express from "express";
import {
  updateCustomer,
  updateCustomerAddressController,
  updateCustomerCreditUpController,
  updateCustomerDetailsController,
} from "../controller/customer.controller";
import { isAuthenticatedUser } from "../middlewares/auth";
import { validSchema } from "../middlewares/validShema";
import { customerCreditupValidationSchema } from "../validation/customerValidationSchema";
const router = express.Router();

router.patch("/update", isAuthenticatedUser, updateCustomer);
router.patch(
  "/update/credit",
  validSchema(customerCreditupValidationSchema),
  isAuthenticatedUser,
  updateCustomerCreditUpController
);
router.patch(
  "/update/address",
  isAuthenticatedUser,
  updateCustomerAddressController
);
router.patch(
  "/update/details",
  isAuthenticatedUser,
  updateCustomerDetailsController
);
export default router;

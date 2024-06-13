"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customer_controller_1 = require("../controller/customer.controller");
const auth_1 = require("../middlewares/auth");
const validShema_1 = require("../middlewares/validShema");
const customerValidationSchema_1 = require("../validation/customerValidationSchema");
const router = express_1.default.Router();
router.patch("/update", auth_1.isAuthenticatedUser, customer_controller_1.updateCustomer);
router.patch("/update/credit", (0, validShema_1.validSchema)(customerValidationSchema_1.customerCreditupValidationSchema), auth_1.isAuthenticatedUser, customer_controller_1.updateCustomerCreditUpController);
router.patch("/update/address", auth_1.isAuthenticatedUser, customer_controller_1.updateCustomerAddressController);
router.patch("/update/details", auth_1.isAuthenticatedUser, customer_controller_1.updateCustomerDetailsController);
exports.default = router;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCustomerDetailsController = exports.updateCustomerCreditUpController = exports.updateCustomerAddressController = exports.updateCustomer = void 0;
const customer_model_1 = __importDefault(require("../models/customer.model"));
const customerAddress_model_1 = __importDefault(require("../models/customerAddress.model"));
const customerCreditUp_model_1 = __importDefault(require("../models/customerCreditUp.model"));
const customerDetails_model_1 = __importDefault(require("../models/customerDetails.model"));
const appError_1 = __importDefault(require("../utils/appError"));
const catchAsyncError_1 = require("../utils/catchAsyncError");
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const user_1 = require("../utils/user");
exports.updateCustomer = (0, catchAsyncError_1.catchAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const user = req.user;
    if (!user) {
        throw new appError_1.default(400, "Uncought user not found");
    }
    const emailOrNumber = user.emailOrNumber;
    const isExist = yield (0, user_1.findCustomerByEmailOrNumber)(emailOrNumber);
    if (!isExist) {
        return (0, sendResponse_1.default)(res, {
            data: null,
            message: "User doesn't exist!",
            statusCode: 404,
            success: false,
        });
    }
    const updateCustomer = yield customer_model_1.default.findByIdAndUpdate(isExist._id, data, {
        new: true,
        runValidators: true,
    });
    if (!updateCustomer) {
        return res.status(404).json({
            message: "Customer not found!",
        });
    }
    (0, sendResponse_1.default)(res, {
        message: "successfully updated customer",
        data: updateCustomer,
        success: true,
    });
}));
exports.updateCustomerAddressController = (0, catchAsyncError_1.catchAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = req.body;
    const user = req.user;
    if (!user) {
        throw new appError_1.default(400, "Uncought user not found");
    }
    const emailOrNumber = user.emailOrNumber;
    const isExist = yield (0, user_1.findCustomerByEmailOrNumber)(emailOrNumber);
    if (!isExist) {
        return (0, sendResponse_1.default)(res, {
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
    const updateCustomerAddress = yield customerAddress_model_1.default.findByIdAndUpdate(isExist._id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!updateCustomerAddress) {
        return res.status(404).json({
            message: "Customer not found!",
        });
    }
    (0, sendResponse_1.default)(res, {
        message: "Customer successfully updated!",
        data: updateCustomerAddress,
        success: true,
    });
}));
exports.updateCustomerCreditUpController = (0, catchAsyncError_1.catchAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const user = req.user;
    if (!user) {
        throw new appError_1.default(400, "Uncought user not found");
    }
    const emailOrNumber = user.emailOrNumber;
    const isExistCustomer = yield (0, user_1.findCustomerByEmailOrNumber)(emailOrNumber);
    if (!isExistCustomer) {
        return (0, sendResponse_1.default)(res, {
            message: "User not found",
            success: false,
            data: null,
            statusCode: 404,
        });
    }
    const update = yield customerCreditUp_model_1.default.findByIdAndUpdate(isExistCustomer.creditUp, body, {
        new: true,
    });
    (0, sendResponse_1.default)(res, {
        message: "successfully updated credit info",
        data: update,
        success: true,
    });
}));
exports.updateCustomerDetailsController = (0, catchAsyncError_1.catchAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const user = req.user;
    if (!user) {
        throw new appError_1.default(400, "Uncought user not found");
    }
    const emailOrNumber = user.emailOrNumber;
    const isExistCustomer = yield (0, user_1.findCustomerByEmailOrNumber)(emailOrNumber);
    if (!isExistCustomer) {
        return (0, sendResponse_1.default)(res, {
            message: "User not found",
            success: false,
            data: null,
            statusCode: 404,
        });
    }
    const update = yield customerDetails_model_1.default.findByIdAndUpdate(isExistCustomer.customerAddress, body, {
        new: true,
    });
    (0, sendResponse_1.default)(res, {
        message: "successfully updated credit info",
        data: update,
        success: true,
    });
}));

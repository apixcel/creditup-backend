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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmPaymentController = exports.createStripePaymentIntent = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("../app");
const circumstance_model_1 = __importDefault(require("../models/circumstance.model"));
const customer_model_1 = __importDefault(require("../models/customer.model"));
const customerAddress_model_1 = __importDefault(require("../models/customerAddress.model"));
const customerCreditUp_model_1 = __importDefault(require("../models/customerCreditUp.model"));
const customerDetails_model_1 = __importDefault(require("../models/customerDetails.model"));
const userModel_1 = require("../models/userModel");
const googApi_service_1 = require("../services/googApi.service");
const catchAsyncError_1 = require("../utils/catchAsyncError");
const jwtToken_1 = __importDefault(require("../utils/jwtToken"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const user_1 = require("../utils/user");
exports.createStripePaymentIntent = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount = 24.99 } = req.body;
    const payAmount = Number(amount) * 100;
    const paymentIntent = yield app_1.stripe.paymentIntents.create({
        amount: payAmount,
        currency: "gbp",
        payment_method_types: ["card"],
    });
    (0, sendResponse_1.default)(res, {
        data: paymentIntent.client_secret,
        message: "successfully get payment intent",
        success: true,
    });
}));
const confirmPaymentController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    console.log(body);
    const isExist = yield (0, user_1.findUserByEmailOrNumber)(body.emailOrNumber);
    if (isExist) {
        return (0, sendResponse_1.default)(res, {
            data: null,
            message: "User already exists with this email or number",
            statusCode: 400,
            success: false,
        });
    }
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const result = yield userModel_1.User.create([body], { session });
        const customerAddress = yield customerAddress_model_1.default.create([body], { session });
        // const newCreditUp = new CreditUp(body.creditUp);
        const creditUP = yield customerCreditUp_model_1.default.create([{ credits: body.creditUp }], {
            session,
        });
        const customerDetails = yield customerDetails_model_1.default.create([body], { session });
        const circumstances = yield circumstance_model_1.default.create([body], { session });
        const bodyReplica = Object.assign({}, body);
        [
            "customerAddress",
            "auth",
            "creditUp",
            "customerDetail",
            "circumstances",
        ].forEach((val) => delete bodyReplica[val]);
        const customerObj = Object.assign({ customerAddress: customerAddress[0]._id, auth: result[0]._id, creditUp: creditUP[0]._id, customerDetail: customerDetails[0]._id, circumstances: circumstances[0]._id }, bodyReplica);
        console.log(customerObj);
        const customer = yield customer_model_1.default.create([customerObj], {
            session,
        });
        const _a = result[0].toObject(), { password } = _a, user = __rest(_a, ["password"]);
        const token = (0, jwtToken_1.default)(user, "7d");
        const _b = req.body, { creditUp } = _b, rest = __rest(_b, ["creditUp"]);
        const sheetArr = Object.assign({}, rest);
        // [
        //   {
        //     "lender": "Bank of Example",
        //     "outstandingBalance": 15000.50,
        //     "contribute": 300.75
        //   },
        //   {
        //     "lender": "Example Credit Union",
        //     "outstandingBalance": 8200.00,
        //     "contribute": 150.00
        //   }
        // ]
        creditUp.forEach((data) => {
            sheetArr.lender = `${sheetArr.lender || ""}, ${data.lender}`;
            sheetArr.outstandingBalance = `${sheetArr.outstandingBalance || ""}, ${data.outstandingBalance}`;
            sheetArr.contribute = `${sheetArr.contribute || ""}, ${data.contribute}`;
        });
        // add data in sheet
        (0, googApi_service_1.appendDataInSheetController)(sheetArr);
        yield session.commitTransaction();
        session.endSession();
        res.status(200).json({
            data: user,
            message: "User created successfully",
            statusCode: 200,
            success: true,
            token,
        });
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        console.error(error);
        next(error);
        (0, sendResponse_1.default)(res, {
            data: null,
            message: "Failed to create user",
            statusCode: 500,
            success: false,
        });
    }
});
exports.confirmPaymentController = confirmPaymentController;

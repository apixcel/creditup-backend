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
exports.passwordResetController = exports.loginController = exports.checkIsExist = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = require("../models/userModel");
const catchAsyncError_1 = require("../utils/catchAsyncError");
const jwtToken_1 = __importDefault(require("../utils/jwtToken"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const user_1 = require("../utils/user");
exports.checkIsExist = (0, catchAsyncError_1.catchAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { emailOrNumber } = req.body;
    const isExist = yield (0, user_1.findUserByEmailOrNumber)(emailOrNumber);
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
}));
exports.loginController = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { emailOrNumber, password, userType } = req.body;
    try {
        const user = yield userModel_1.User.findOne({ emailOrNumber, userType }).select("+password");
        if (!user) {
            return (0, sendResponse_1.default)(res, {
                data: null,
                message: `No ${userType} found on this emailOrNumber.`,
                statusCode: 404,
                success: false,
            });
        }
        const isPasswordMathced = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordMathced) {
            return (0, sendResponse_1.default)(res, {
                data: null,
                message: "Password didn't matched",
                statusCode: 401,
                success: false,
            });
        }
        const _a = user.toObject(), { password: pass } = _a, restUser = __rest(_a, ["password"]);
        const token = (0, jwtToken_1.default)(restUser, "7d");
        res.status(200).json({
            data: restUser,
            message: "Successfully loged in",
            statusCode: 200,
            success: true,
            token: token,
        });
    }
    catch (error) {
        console.log(error);
    }
}));
exports.passwordResetController = (0, catchAsyncError_1.catchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { emailOrNumber, newPassword, oldPassword } = req.body;
    const user = yield (0, user_1.findUserByEmailOrNumber)(emailOrNumber);
    if (!user) {
        return (0, sendResponse_1.default)(res, {
            data: null,
            message: "User not found",
            statusCode: 404,
            success: false,
        });
    }
    const isPasswordMathced = yield bcrypt_1.default.compare(oldPassword, user.password);
    if (!isPasswordMathced) {
        return (0, sendResponse_1.default)(res, {
            data: null,
            message: "Password didn't matched",
            statusCode: 401,
            success: false,
        });
    }
    const newBcryptedPassword = yield bcrypt_1.default.hash(newPassword, user_1.bcryptSalRound);
    yield userModel_1.User.findOneAndUpdate({ emailOrNumber }, { password: newBcryptedPassword }, { new: true });
    (0, sendResponse_1.default)(res, {
        data: null,
        success: true,
        message: "password updated successfully",
        statusCode: 200,
    });
}));

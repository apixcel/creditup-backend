"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
// CustomerDetail Schema
const CustomerDetailSchema = new Schema({
    describe: { type: String, required: false, default: "" },
    title: { type: String, required: false, default: "" },
    dateOfBirth: { type: String, required: false, default: "" },
    email: { type: String, required: false, default: "" },
    status: { type: String, required: false, default: "" },
    total: { type: Number, required: false, default: "" },
    paymentDate: { type: String, required: false, default: "" },
});
const CustomerDetails = mongoose_1.default.model("CustomerDetails", CustomerDetailSchema);
exports.default = CustomerDetails;

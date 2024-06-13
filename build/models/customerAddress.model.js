"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
// CustomerAddress Schema
const CustomerAddressSchema = new Schema({
    buildingNumber: {
        type: String,
        required: false,
        default: "",
    },
    subBuildingName: {
        type: String,
        required: false,
        default: "",
    },
    buildingName: {
        type: String,
        required: false,
        default: "",
    },
    streetName: {
        type: String,
        required: false,
        default: "",
    },
    city: {
        type: String,
        required: false,
        default: "",
    },
    country: {
        type: String,
        required: false,
        default: "",
    },
});
const CustomerAddress = mongoose_1.default.model("CustomerAddress", CustomerAddressSchema);
exports.default = CustomerAddress;

import mongoose, { Schema } from "mongoose";

// Customer Schema
const CustomerSchema = new Schema({
  emailOrNumber: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
    required: false,
    default: "",
  },
  phone: {
    type: String,
    required: false,
    default: "",
  },
  address: {
    type: String,
    required: false,
    default: "",
  },
  postCode: {
    type: Number,
    required: false,
    default: "",
  },
  customerDetail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CustomerDetails",
  },
  customerAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CustomerAddress",
  },
  auth: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  creditUp: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CreditUp",
  },
  circumstances: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Circumstance",
  },
});

const Customer = mongoose.model("Customer", CustomerSchema);

export default Customer;

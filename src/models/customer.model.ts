import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Customer Schema
const CustomerSchema = new Schema({
  emailOrNumber: { type: String },
  customerName: { type: String },
  phone: { type: String },
  address: { type: String },
  postCode: { type: String },
  customerDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CustomerDetails",
  },
  customerAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CustomerAddress",
  },
  creditUp: { type: mongoose.Schema.Types.ObjectId, ref: "CreditUp" },
});

const Customer = mongoose.model("Customer", CustomerSchema);

export default Customer;

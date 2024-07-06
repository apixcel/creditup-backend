import mongoose from "mongoose";
const Schema = mongoose.Schema;

// CustomerDetail Schema
const CustomerDetailSchema = new Schema({
  describe: { type: String, required: false, default: "" },
  title: { type: String, required: false, default: "" },
  dateOfBirth: { type: String, required: false, default: "" },
  email: { type: String,  required: false, default: "" },
  status: { type: String, required: false, default: "" },
  total: { type: Number, required: false, default: "" },
  paymentDate: { type: String, required: false, default: "" },
});

const CustomerDetails = mongoose.model("CustomerDetails", CustomerDetailSchema);

export default CustomerDetails;

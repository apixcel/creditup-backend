import mongoose from "mongoose";
const Schema = mongoose.Schema;

// CustomerDetail Schema
const CustomerDetailSchema = new Schema({
  describe: { type: String, required: false, default: "" },
  title: { type: String, required: false, default: "" },
  firstName: { type: String, required: false, default: "" },
  lastName: { type: String, required: false, default: "" },
  dateOfBirth: { type: Date },
  email: { type: String, unique: true, required: false, default: "" },
  status: { type: String, required: false, default: "" },
  total: { type: Number, required: false, default: "" },
  paymentDate: { type: Date, required: false, default: "" },
});

const CustomerDetails = mongoose.model("CustomerDetails", CustomerDetailSchema);

export default CustomerDetails;

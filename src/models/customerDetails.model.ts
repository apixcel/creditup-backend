import mongoose from "mongoose";
const Schema = mongoose.Schema;

// CustomerDetail Schema
const CustomerDetailSchema = new Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  describe: { type: String },
  title: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  dateOfBirth: { type: Date },
  email: { type: String, unique: true },
  password: { type: String },
  status: { type: String },
  total: { type: Number },
  paymentDate: { type: Date },
});

const CustomerDetails = mongoose.model("CustomerDetails", CustomerDetailSchema);

export default CustomerDetails;

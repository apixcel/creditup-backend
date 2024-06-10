import mongoose from "mongoose";
const Schema = mongoose.Schema;

// CreditUp Schema
const CreditUpSchema = new Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  lender: { type: String },
  outstandingBalance: { type: Number },
  contribute: { type: Number },
  anotherLander: { type: Number },
});

const CreditUp = mongoose.model("CreditUpSchema", CreditUpSchema);

export default CreditUp;

import mongoose from "mongoose";
const Schema = mongoose.Schema;

// CreditUp Schema
const CreditUpSchema = new Schema({
  lender: {
    type: String,
    default: "",
    required: false,
  },
  outstandingBalance: {
    type: Number,
    default: 0,
    required: false,
  },
  contribute: {
    type: Number,
    default: 0,
    required: false,
  },
  anotherLander: {
    type: Number,
    default: 0,
    required: false,
  },
});

const CreditUp = mongoose.model("CreditUpSchema", CreditUpSchema);

export default CreditUp;

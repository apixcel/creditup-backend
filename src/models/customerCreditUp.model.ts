import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the schema for individual credit entries
const CreditEntrySchema = new Schema({
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
});

// Define the main schema as an array of the credit entries
const CreditUpSchema = new Schema({
  credits: [CreditEntrySchema],
});

const CreditUp = mongoose.model("CreditUp", CreditUpSchema);

export default CreditUp;

import mongoose, { Schema } from "mongoose";

// Define the Circumstances schema
const circumstancesSchema = new Schema({
  totalDebtLevel: {
    type: Number,
    required: true,
  },
  curCreditorRepayment: {
    type: Number,
    required: true,
  },
  totalLender: {
    type: Number,
    required: true,
  },
  newCreditorRepayment: {
    type: Number,
    required: true,
  },
  monthlySaving: {
    type: Number,
    required: true,
  },
  yearlySaving: {
    type: Number,
    required: true,
  },
});

// Create a model from the schema
const Circumstances = mongoose.model("Circumstance", circumstancesSchema);

export default Circumstances;

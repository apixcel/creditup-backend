import mongoose from "mongoose";
const Schema = mongoose.Schema;

// CustomerAddress Schema
const CustomerAddressSchema = new Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  postCode: { type: String },
  buildingNumber: { type: String },
  subBuildingName: { type: String },
  buildingName: { type: String },
  streetName: { type: String },
  city: { type: String },
  country: { type: String },
});

const CustomerAddress = mongoose.model(
  "CustomerAddress",
  CustomerAddressSchema
);

export default CustomerAddress;

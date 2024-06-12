import mongoose from "mongoose";
const Schema = mongoose.Schema;

// CustomerAddress Schema
const CustomerAddressSchema = new Schema({
  buildingNumber: {
    type: String,
    required: false,
    default: "",
  },
  subBuildingName: {
    type: String,
    required: false,
    default: "",
  },
  buildingName: {
    type: String,
    required: false,
    default: "",
  },
  streetName: {
    type: String,
    required: false,
    default: "",
  },
  city: {
    type: String,
    required: false,
    default: "",
  },
  country: {
    type: String,
    required: false,
    default: "",
  },
});

const CustomerAddress = mongoose.model(
  "CustomerAddress",
  CustomerAddressSchema
);

export default CustomerAddress;

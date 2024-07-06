import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { bcryptSalRound } from "../utils/user";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    userType: {
      type: String,
      enum: ["agent", "customer"],
      required: true,
      default: "customer",
    },
    isProccesscompleted: {
      type: Boolean,
      default: false,
    },

    // add others details of user= ===>
  },
  {
    timestamps: true,
  }
);

// hashing password and save into DB
userSchema.pre("save", async function (next) {
  const user = this; // doc
  user.password = await bcrypt.hash(user.password, bcryptSalRound);
  next();
});

export const User = mongoose.model("User", userSchema);

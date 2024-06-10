import { Request, Response } from "express";
import CustomerAddress from "../models/customerAddress.model";
import sendResponse from "../utils/sendResponse";
import {
  findCustomerByEmailOrNumber,
  findUserByEmailOrNumber,
} from "../utils/user";
import Customer from "../models/customer.model";



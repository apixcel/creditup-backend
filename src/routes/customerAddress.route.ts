import express from "express";
import { updateCustomerAddress } from "../controller/customerAddress.controller";
const router = express.Router();

router.patch("/update", updateCustomerAddress);

export default router;

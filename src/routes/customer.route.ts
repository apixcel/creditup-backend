import express from "express";
import { updateCustomer } from "../controller/customer.controller";
const router = express.Router();

router.patch("/update", updateCustomer);

export default router;

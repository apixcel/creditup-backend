import express, { Request, Response } from "express";
import Customer from "../models/customer.model";
const router = express.Router();

// Create a new customer
router.post("/create", async (req: Request, res: Response) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not created! Please try again!",
      });
    }
    res.status(201).json({
      success: true,
      message: "Customer data successfully created!",
      data: customer,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Get all customers
router.get("/get/all", async (req: Request, res: Response) => {
  try {
    const customers = await Customer.find({});
    if (!customers) {
      return res.status(404).json({
        success: false,
        message: "Customers not found!",
      });
    }
    res.status(200).json({
      success: true,
      message: "Customers data successfully retrieved!",
      data: customers,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Get a single customer by ID
router.get("/get/:id", async (req: Request, res: Response) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found!",
      });
    }
    res.status(200).json({
      success: true,
      message: "Customer data successfully retrieved!",
      data: customer,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Update a customer by ID
router.patch("/update/:id", async (req: Request, res: Response) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found!",
      });
    }
    res.status(204).json({
      success: true,
      message: "Customer data successfully updated!",
      data: customer,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a customer by ID
router.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found!",
      });
    }
    res.status(204).json({
      success: true,
      message: "Customer data successfully deleted!",
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default router;

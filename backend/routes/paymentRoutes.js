/*
import express from "express";
import razorpayInstance from "../utils/razorpay.js";

const router = express.Router();

router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // amount in paisa
      currency: "INR",
      receipt: "order_rcptid_" + new Date().getTime(),
    };

    const order = await razorpayInstance.orders.create(options);
    res.status(200).json({ orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create Razorpay order" });
  }
});

export default router;
*/
// routes/paymentRoutes.js

import express from "express";
import { createRazorpayOrder } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-order", createRazorpayOrder);

export default router;

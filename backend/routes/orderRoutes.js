import express from "express";
const router = express.Router();

import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} from "../controllers/orderController.js";

import authMiddleware, { adminMiddleware } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

// @route   POST /api/orders
// @desc    Create a new order
// @access  Private (User)
router.post("/", authMiddleware, addOrderItems);

// @route   GET /api/orders/myorders
// @desc    Get current user's orders
// @access  Private (User)
router.get("/myorders", authMiddleware, getMyOrders);

// @route   GET /api/orders
// @desc    Get all orders
// @access  Private (Admin)
router.get("/", authMiddleware, adminMiddleware, getOrders);

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Private (Owner or Admin)
router.get("/:id", authMiddleware, checkId, getOrderById);

// @route   PUT /api/orders/:id/pay
// @desc    Mark order as paid
// @access  Private (Owner or Admin)
router.put("/:id/pay", authMiddleware, checkId, updateOrderToPaid);

// @route   PUT /api/orders/:id/deliver
// @desc    Mark order as delivered
// @access  Private (Admin)
router.put("/:id/deliver", authMiddleware, adminMiddleware, checkId, updateOrderToDelivered);

export default router;

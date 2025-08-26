import express from "express";
const router = express.Router();

import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

import authMiddleware, { adminMiddleware } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public
router.get("/", getCategories);

// @route   GET /api/categories/:id
// @desc    Get category by ID
// @access  Public
router.get("/:id", checkId, getCategoryById);

// @route   POST /api/categories
// @desc    Create new category
// @access  Private/Admin
router.post("/", authMiddleware, adminMiddleware, createCategory);

// @route   PUT /api/categories/:id
// @desc    Update category by ID
// @access  Private/Admin
router.put("/:id", authMiddleware, adminMiddleware, checkId, updateCategory);

// @route   DELETE /api/categories/:id
// @desc    Delete category by ID
// @access  Private/Admin
router.delete("/:id", authMiddleware, adminMiddleware, checkId, deleteCategory);

export default router;

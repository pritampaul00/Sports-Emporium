import express from "express";
const router = express.Router();

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductFilters,
  getAllProducts,
  getAllBrands
} from "../controllers/productController.js";

import authMiddleware, { adminMiddleware } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

// @route   GET /api/products
// @desc    Get all products (optional filters: category, subcategory, pageNumber)
// @access  Public
router.get("/", getProducts);
router.get('/all', getAllProducts);

// @route   GET /api/brands
// @desc    Get all brands
// @access  Public
router.get("/brands", getAllBrands);

// @route   GET /api/products/search?q=...
// @desc    Search product names (autocomplete)
// @access  Public
router.get("/search", searchProducts);

router.get("/filters", getProductFilters); 

// @route   GET /api/products/:id
// @desc    Get product by ID
// @access  Public
router.get("/:id", checkId, getProductById);

// @route   POST /api/products
// @desc    Create a new product
// @access  Private/Admin
router.post("/", authMiddleware, adminMiddleware, createProduct);

// @route   PUT /api/products/:id
// @desc    Update a product
// @access  Private/Admin
router.put("/:id", authMiddleware, adminMiddleware, checkId, updateProduct);

// @route   DELETE /api/products/:id
// @desc    Delete a product
// @access  Private/Admin
router.delete("/:id", authMiddleware, adminMiddleware, checkId, deleteProduct);

export default router;

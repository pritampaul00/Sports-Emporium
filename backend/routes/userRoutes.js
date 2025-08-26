// routes/userRoutes.js
import express from "express";
const router = express.Router();

import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  updatePassword,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateUserAddress,
  addUserAddress,
  deleteUserAddress,
  setDefaultAddress
} from "../controllers/userController.js";
//import protect from '../middlewares/authMiddleware.js';
import {updateUserCart, getUserCart} from "../controllers/userController.js";

import authMiddleware from '../middlewares/authMiddleware.js'; // ✅ Name matches usage
import { adminMiddleware } from "../middlewares/authMiddleware.js";

//router.patch('/addresses/:index/default', authMiddleware, setDefaultAddress);

import checkId from "../middlewares/checkId.js";

// Register a new user
router.post("/register", registerUser);

// Login user & get token
router.post("/login", loginUser);

// Logout user
router.post("/logout", logoutUser);

// Get current user profile
router.get("/profile", authMiddleware, getUserProfile);
router.get("/me", authMiddleware, getUserProfile);

//Update Password
router.put("/update-password", authMiddleware, updatePassword);

//Add-adresses
router.post("/addresses", authMiddleware, addUserAddress);
router.patch("/addresses/:id/default", authMiddleware, setDefaultAddress);

// PUT /api/users/addresses/:id - Update a user address
router.put("/addresses/:id", authMiddleware, updateUserAddress);

//Delete-addresses
router.delete("/addresses/:id", authMiddleware, deleteUserAddress);

// Update current user profile
//router.put("/profile", authMiddleware, updateUserProfile);
router.route("/profile").put(authMiddleware, updateUserProfile);

//Cart
router.put("/cart", authMiddleware, updateUserCart);
router.get("/cart", authMiddleware, getUserCart);


// Admin: Get all users
router.get("/", authMiddleware, adminMiddleware, getUsers);

// Admin: Get user by ID
router.get("/:id", authMiddleware, adminMiddleware, checkId, getUserById);

// Admin: Update user by ID
router.put("/:id", authMiddleware, adminMiddleware, checkId, updateUser);

// Admin: Delete user by ID
router.delete("/:id", authMiddleware, adminMiddleware, checkId, deleteUser);

export default router;

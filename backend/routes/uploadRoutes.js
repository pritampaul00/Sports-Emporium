import express from "express";
const router = express.Router();

import { upload, uploadImage } from "../controllers/uploadController.js";
import authMiddleware, { adminMiddleware } from "../middlewares/authMiddleware.js";

// POST /api/upload - upload image (admin only)
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  uploadImage
);

export default router;

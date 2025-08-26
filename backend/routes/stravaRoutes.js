import express from "express";
import { exchangeStravaToken } from "../controllers/stravaController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/exchange-token", authMiddleware, exchangeStravaToken);

export default router;

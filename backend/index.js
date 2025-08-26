import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

import connectDB from "./config/db.js"; // Your DB connection file
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import membershipRoutes from "./routes/membershipRoutes.js";
import stravaRoutes from "./routes/stravaRoutes.js";


import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(express.json()); // For parsing application/json
app.use(cookieParser());  // For parsing cookies
app.use(cors({
    origin: 'http://localhost:5173', // or your frontend URL
    credentials: true, // This is required to accept cookies from client
  }));          // Enable CORS for frontend requests (configure as needed)
app.use(morgan("dev"));   // Logging HTTP requests in dev

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/membership", membershipRoutes);
app.use("/api/strava", stravaRoutes);



// Serve static assets (uploads folder)
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Root endpoint
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

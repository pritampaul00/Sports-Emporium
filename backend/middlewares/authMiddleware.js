import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";
import admin from "firebase-admin"; // Firebase Admin SDK

// Middleware to authenticate with local JWT or Firebase token
const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token provided");
  }

  try {
    let decoded;
    let user;

    // Attempt local JWT verification
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      user = await User.findById(decoded.id).select("-password");
    } catch (err) {
      // If JWT fails, try Firebase token
      const firebaseUser = await admin.auth().verifyIdToken(token);
      if (firebaseUser) {
        user = await User.findOne({ email: firebaseUser.email });

        if (!user) {
          user = await User.create({
            name: firebaseUser.name || firebaseUser.email.split("@")[0],
            email: firebaseUser.email,
            password: "", // Random or blank
            isOAuthUser: true,
          });
        }
      }
    }

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});

// Middleware to restrict access to admins only
const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as admin");
  }
};

// ✅ Export default and named
export { authMiddleware as default, adminMiddleware };

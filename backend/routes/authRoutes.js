// routes/authRoutes.js
import express from "express";
import admin from "../config/firebaseAdmin.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/social-login", async (req, res) => {
  const { token } = req.body;

  try {
    const decoded = await admin.auth().verifyIdToken(token);

    let user = await User.findOne({ email: decoded.email });
    if (!user) {
      user = await User.create({
        name: decoded.name,
        email: decoded.email,
        image: decoded.picture,
        password: "", // optional
        role: "user",
        provider: "google",
      });
    }

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: jwtToken,
    });
  } catch (error) {
    console.error("Firebase login error:", error);
    res.status(401).json({ message: "Invalid Firebase token" });
  }
});

export default router;

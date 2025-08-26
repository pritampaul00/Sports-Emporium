// routes/membershipRoutes.js
import express from "express";
import User from "../models/userModel.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// @route   POST /api/membership/activate
// @desc    Activate or upgrade membership
// @access  Private
router.post("/activate", authMiddleware, async (req, res) => {
  try {
    const { level, durationInMonths } = req.body;

    if (!level || !durationInMonths) {
      return res.status(400).json({ message: "Missing membership level or duration" });
    }

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const start = new Date();
    const end = new Date();
    end.setMonth(end.getMonth() + durationInMonths);

    user.membership = {
      level,
      startDate: start,
      endDate: end,
      isActive: true,
    };

    await user.save();

    res.status(200).json({
      message: "Membership activated",
      membership: user.membership,
    });
  } catch (error) {
    console.error("Membership activation error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/membership/status
// @desc    Get user's membership status
// @access  Private
router.get("/status", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("membership");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ membership: user.membership });
  } catch (error) {
    console.error("Get membership status error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

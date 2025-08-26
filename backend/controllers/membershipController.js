// controllers/membershipController.js
import User from "../models/userModel";

export const activateMembership = async (req, res) => {
  try {
    const userId = req.user._id;
    const { level = "Basic", durationInMonths = 12 } = req.body;

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(startDate.getMonth() + durationInMonths);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        membership: {
          isActive: true,
          level,
          startDate,
          endDate,
        },
      },
      { new: true }
    );

    res.status(200).json({
      message: "Membership activated successfully",
      membership: updatedUser.membership,
    });
  } catch (err) {
    console.error("Activate Membership Error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};


export const getMembershipStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("membership");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ membership: user.membership });
  } catch (err) {
    console.error("Get Membership Status Error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

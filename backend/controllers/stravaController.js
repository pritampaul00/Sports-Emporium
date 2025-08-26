import axios from "axios";
import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";

export const exchangeStravaToken = asyncHandler(async (req, res) => {
  const { code } = req.body;

  const client_id = process.env.STRAVA_CLIENT_ID;
  const client_secret = process.env.STRAVA_CLIENT_SECRET;

  try {
    const { data } = await axios.post("https://www.strava.com/oauth/token", {
      client_id,
      client_secret,
      code,
      grant_type: "authorization_code",
    });

    console.log("✅ Strava token exchange response:", data);

    const user = await User.findById(req.user._id);
    user.strava = {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_at: data.expires_at,
      athlete: data.athlete,
    };
    await user.save();

    res.status(200).json({ message: "Strava connected" });

  } catch (error) {
    console.error("❌ Strava token exchange failed:", error.response?.data || error.message);

    res.status(500).json({
      message: "Failed to connect to Strava",
      errors: error.response?.data?.errors || [],
    });
  }
});

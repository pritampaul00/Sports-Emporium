// utils/createToken.js
import jwt from "jsonwebtoken";

const createToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN ||"30d",
  });

  // Set cookie with token
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // only send cookie over HTTPS in prod
    sameSite: "strict", // CSRF protection
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
  });
  return token; // ✅ IMPORTANT: Return the token
};

export default createToken;


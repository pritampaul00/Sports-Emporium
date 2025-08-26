import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config(); // ✅ Load .env before using process.env

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

console.log("Razorpay KEY_ID:", process.env.RAZORPAY_KEY_ID);
console.log("Razorpay SECRET:", process.env.RAZORPAY_SECRET);

export default razorpayInstance;


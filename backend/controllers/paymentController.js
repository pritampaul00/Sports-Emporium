import razorpayInstance from "../utils/razorpay.js";

export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ message: "Invalid amount provided" });
    }

    const amountInPaisa = Math.round(parseFloat(amount) * 100); // Convert float rupees to integer paisa

    const options = {
      amount: amountInPaisa,
      currency: "INR",
      receipt: "order_rcptid_" + new Date().getTime(),
    };

    const order = await razorpayInstance.orders.create(options);

    res.status(200).json({
      orderId: order.id,
      amount: order.amount, // this is in paisa
      currency: order.currency,
    });
  } catch (err) {
    console.error("❌ Razorpay order error:", err);
    res.status(500).json({ message: "Failed to create Razorpay order", error: err.message });
  }
};

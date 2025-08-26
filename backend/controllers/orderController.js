import asyncHandler from "../middlewares/asyncHandler.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private (user)
export const addOrderItems = asyncHandler(async (req, res) => {
  try {
    const {
      orderItems = [],        // [{ productId, qty }, ...]
      membershipOrderItems = [],  // 🆕 new field
      shippingAddress,
      paymentMethod,
      taxPrice = 0,
      shippingPrice = 0,
    } = req.body;

    if (!orderItems.length && !membershipOrderItems.length) {
      res.status(400);
      throw new Error("No order items");
    }

    // Build detailed product items
    const detailedOrderItems = await Promise.all(
      orderItems.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product) {
          console.error("❌ Product not found:", item.productId);
          throw new Error(`Product not found: ${item.productId}`);
        }
        return {
          name: product.name,
          qty: item.qty,
          image: product.images[0],
          price: product.price,
          product: product._id,
        };
      })
    );

    const itemsPrice = detailedOrderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );

    const membershipPrice = membershipOrderItems.reduce(
      (acc, m) => acc + m.price,
      0
    );

    const totalPrice = itemsPrice + membershipPrice + taxPrice + shippingPrice;

    const order = new Order({
      user: req.user._id,
      orderItems: detailedOrderItems,
      membershipOrderItems, // 🆕
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error("🔥 Error in addOrderItems:", error.message);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private (owner or admin)
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  // Check if user is owner or admin
  if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    res.status(401);
    throw new Error("Not authorized to view this order");
  }

  res.json(order);
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private (owner or admin)
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user");

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  // Check if authorized
  if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    res.status(401);
    throw new Error("Not authorized to update this order");
  }

  // ✅ Update order payment details
  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.email_address,
  };

  // ✅ Handle membership activation if present
  if (order.membershipOrderItems?.length > 0) {
    const { level, duration, price } = order.membershipOrderItems[0]; // assuming only 1 membership per order

    const now = new Date();
    const existingEnd = order.user.membership?.endDate;
    const startDate = now;

    // If current membership is still valid, extend it
    let endDate;
    if (existingEnd && new Date(existingEnd) > now) {
      endDate = new Date(existingEnd);
      endDate.setMonth(endDate.getMonth() + duration);
    } else {
      endDate = new Date();
      endDate.setMonth(endDate.getMonth() + duration);
    }

    order.user.membership = {
      isActive: true,
      level,
      startDate,
      endDate,
    };

    await order.user.save();
  }

  const updatedOrder = await order.save();
  res.json(updatedOrder);
});


// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.isDelivered = true;
  order.deliveredAt = Date.now();

  const updatedOrder = await order.save();
  res.json(updatedOrder);
});

// @desc    Get logged-in user's orders
// @route   GET /api/orders/myorders
// @access  Private (user)
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name").sort({ createdAt: -1 });
  res.json(orders);
});

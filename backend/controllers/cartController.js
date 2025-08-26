// POST /api/cart
exports.saveCart = async (req, res) => {
  const { items } = req.body; // [{ productId, quantity }]
  const userId = req.user._id;

  const updated = await Cart.findOneAndUpdate(
    { user: userId },
    { items },
    { upsert: true, new: true }
  );
  res.status(200).json(updated);
};
// GET /api/cart
exports.getCart = async (req, res) => {
  const userId = req.user._id;
  const cart = await Cart.findOne({ user: userId }).populate("items.productId");
  res.json(cart || { items: [] });
};

const express = require('express')
const Cart = require('../models/Cart.js')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router();

// 🛒 Get cart for logged-in user
router.get("/", protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate("items.itemId");
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ➕ Add item to cart
router.post("/add", protect, async (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] });
    }

    // check if item exists in cart
    const existingItem = cart.items.find(i => i.itemId.toString() === itemId);

    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      cart.items.push({ itemId, quantity: quantity || 1 });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ❌ Remove item from cart
router.delete("/remove/:itemId", protect, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.items = cart.items.filter(i => i.itemId.toString() !== req.params.itemId);
    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


// 🔄 Update item quantity
router.put("/update/:itemId", protect, async (req, res) => {
  try {
    const { quantity } = req.body;
    if (quantity < 1) return res.status(400).json({ error: "Quantity must be >= 1" });

    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const item = cart.items.find(i => i.itemId.toString() === req.params.itemId);
    if (!item) return res.status(404).json({ error: "Item not in cart" });

    item.quantity = quantity;
    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});



module.exports = router;

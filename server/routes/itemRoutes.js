const express = require("express");
const Item = require("../models/Item");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @route POST /items
 * @desc Create new item
 */
router.post("/", protect, async (req, res) => {
  try {
    const { name, price, category } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newItem = new Item({ name, price, category });
    await newItem.save();

    res.status(201).json({ message: "Item created", item: newItem });
  } catch (err) {
    console.error("Create item error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * @route GET /items
 * @desc Get all items with optional filters
 */
router.get("/", async (req, res) => {
  try {
    const { category, minPrice, maxPrice } = req.query;

    let filter = {};
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const items = await Item.find(filter);
    res.json(items);
  } catch (err) {
    console.error("Get items error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * @route GET /items/:id
 * @desc Get single item
 */
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch (err) {
    console.error("Get item error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * @route PUT /items/:id
 * @desc Update item
 */
router.put("/:id", protect, async (req, res) => {
  try {
    const { name, price, category } = req.body;
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { name, price, category },
      { new: true }
    );
    if (!updatedItem) return res.status(404).json({ error: "Item not found" });
    res.json({ message: "Item updated", item: updatedItem });
  } catch (err) {
    console.error("Update item error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * @route DELETE /items/:id
 * @desc Delete item
 */
router.delete("/:id", protect, async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ error: "Item not found" });
    res.json({ message: "Item deleted" });
  } catch (err) {
    console.error("Delete item error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

const express = require("express");
const User = require("../models/User");

const router = express.Router();

// POST /addUser
router.post("/addUser", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // simple validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // create new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "User added successfully", user: newUser });
  } catch (err) {
    console.error("Error adding user:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

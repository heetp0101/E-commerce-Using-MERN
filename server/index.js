const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const User = require("./models/User");
const app = express();
const addUser = require('./api/addUser')
const UserRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const itemRoutes = require('./routes/itemRoutes')
const cartRoutes = require('./routes/cartRoutes')

// middleware
app.use(cors());
app.use(express.json());


// connect to MongoDB
connectDB();


app.use("/auth", authRoutes);

app.use("/items", itemRoutes);

app.use("/api/cart", cartRoutes);

// health check route
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "ecommerce-api",
    timestamp: new Date().toISOString(),
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});

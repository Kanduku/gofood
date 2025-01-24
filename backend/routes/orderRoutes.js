const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// Place an Order
router.post("/", async (req, res) => {
  try {
    const { user, restaurant, items, totalAmount, deliveryTime } = req.body;

    if (!user || !restaurant || !items || !totalAmount) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const newOrder = new Order({ user, restaurant, items, totalAmount, deliveryTime });
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Failed to place order." });
  }
});

// Get All Orders (Admin Access or Modify as Needed)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate("restaurant").populate("user");
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders." });
  }
});

// Get Orders for a Specific User
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ user: userId }).populate("restaurant");
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ error: "Failed to fetch user orders." });
  }
});

module.exports = router;

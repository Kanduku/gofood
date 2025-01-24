const express = require("express");
const Restaurant = require("../models/Restaurant");

const router = express.Router();

// Get All Restaurants
router.get("/", async (req, res) => {
  try {
    const restaurants = await Restaurant.find().populate("reviews.user", "name");
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Single Restaurant by ID
router.get("/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate("reviews.user", "name");
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search Restaurants by Name or Cuisine
router.get("/search", async (req, res) => {
  try {
    const { name, cuisine } = req.query;
    const query = {};

    if (name) query.name = { $regex: new RegExp(name, "i") };
    if (cuisine) query.cuisine = { $regex: new RegExp(cuisine, "i") };

    const restaurants = await Restaurant.find(query);
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin - Add a New Restaurant
router.post("/admin", async (req, res) => {
  try {
    const { name, location, cuisine, img, menu } = req.body;

    // Validation checks
    if (!name || !location || !cuisine) {
      return res.status(400).json({ error: "Name, location, and cuisine are required." });
    }

    // Create new restaurant instance
    const newRestaurant = new Restaurant({
      name,
      location,
      cuisine,
      img,
      menu,
    });

    // Save the new restaurant to the database
    const savedRestaurant = await newRestaurant.save();

    // Respond with the saved restaurant
    res.status(201).json(savedRestaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Update a Restaurant by ID
router.put("/:id", async (req, res) => {
  try {
    const { name, location, cuisine, img, menu } = req.body;

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      { name, location, cuisine, img, menu },
      { new: true, runValidators: true }
    );

    if (!updatedRestaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    res.status(200).json(updatedRestaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a Restaurant by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);

    if (!deletedRestaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a Menu Item to a Restaurant
router.post("/:id/menu", async (req, res) => {
  try {
    const { name, desc, price, img } = req.body;

    if (!name || !price) {
      return res.status(400).json({ error: "Menu item name and price are required." });
    }

    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    restaurant.menu.push({ name, desc, price, img });
    await restaurant.save();

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a Menu Item in a Restaurant
router.put("/:id/menu/:menuId", async (req, res) => {
  try {
    const { name, desc, price, img } = req.body;

    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    const menuItem = restaurant.menu.id(req.params.menuId);
    if (!menuItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }

    menuItem.name = name || menuItem.name;
    menuItem.desc = desc || menuItem.desc;
    menuItem.price = price || menuItem.price;
    menuItem.img = img || menuItem.img;

    await restaurant.save();
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a Menu Item from a Restaurant
router.delete("/:id/menu/:menuId", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    const menuItem = restaurant.menu.id(req.params.menuId);
    if (!menuItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }

    menuItem.remove();
    await restaurant.save();

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a Review to a Restaurant
router.post("/:id/review", async (req, res) => {
  try {
    const { user, rating, comment } = req.body;

    if (!user || !rating) {
      return res.status(400).json({ error: "User and rating are required." });
    }

    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    restaurant.reviews.push({ user, rating, comment });
    await restaurant.save();

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a Review
router.put("/:id/review/:reviewId", async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    const review = restaurant.reviews.id(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;

    await restaurant.save();
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a Review from a Restaurant
router.delete("/:id/review/:reviewId", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    const review = restaurant.reviews.id(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    review.remove();
    await restaurant.save();

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

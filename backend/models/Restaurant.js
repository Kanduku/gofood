const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
    name: { type: String, required: true, unique: true }, // Unique restaurant name
    location: { type: String, required: true,  }, // Unique location
    cuisine: { type: [String], required: true },
    img: { type: String }, // Optional image field for the restaurant
    menu: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() }, // Unique ID for each menu item
        name: { type: String, required: true,}, // Unique name for menu items
        desc: { type: String },
        price: { type: Number, required: true },
        img: { type: String },
      },
    ],
    reviews: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() }, // Unique ID for each review
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, required: true },
        comment: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);

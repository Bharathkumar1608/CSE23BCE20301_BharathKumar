const mongoose = require("mongoose");

const foodDonationSchema = new mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodCategory",
      required: true
    },
    foodName: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 0
    },
    pickupAddress: {
      type: String,
      required: true
    },
    expiryDate: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ["available", "requested", "assigned", "delivered", "cancelled"],
      default: "available"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("FoodDonation", foodDonationSchema);

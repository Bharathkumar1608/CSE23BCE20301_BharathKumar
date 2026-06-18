const mongoose = require("mongoose");

const deliveryStatusSchema = new mongoose.Schema(
  {
    donation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodDonation",
      required: true
    },
    request: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DonationRequest"
    },
    volunteer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Volunteer",
      required: true
    },
    status: {
      type: String,
      enum: ["assigned", "picked_up", "delivered", "cancelled"],
      default: "assigned"
    },
    pickupTime: {
      type: Date
    },
    deliveryTime: {
      type: Date
    },
    notes: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("DeliveryStatus", deliveryStatusSchema);

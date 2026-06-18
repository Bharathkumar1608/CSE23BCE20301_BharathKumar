const mongoose = require("mongoose");

const donationRequestSchema = new mongoose.Schema(
  {
    ngo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NGO",
      required: true
    },
    donation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodDonation",
      required: true
    },
    quantityRequested: {
      type: Number,
      required: true,
      min: 1
    },
    notes: {
      type: String
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "completed"],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("DonationRequest", donationRequestSchema);

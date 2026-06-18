const express = require("express");
const router = express.Router();
const DonationRequest = require("../models/DonationRequest");
const FoodDonation = require("../models/FoodDonation");

router.post("/", async (req, res) => {
  try {
    const donation = await FoodDonation.findById(req.body.donation);

    if (!donation) {
      return res.status(404).json({ message: "Food donation not found" });
    }

    if (donation.status !== "available") {
      return res.status(400).json({ message: "Food donation is not available" });
    }

    if (Number(req.body.quantityRequested) > donation.quantity) {
      return res.status(400).json({ message: "Requested quantity is more than available quantity" });
    }

    const request = await DonationRequest.create({
      ...req.body,
      status: "completed"
    });

    donation.quantity -= Number(req.body.quantityRequested);
    donation.status = donation.quantity > 0 ? "available" : "delivered";
    await donation.save();

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const requests = await DonationRequest.find()
      .populate("ngo")
      .populate("donation");
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const request = await DonationRequest.findById(req.params.id)
      .populate("ngo")
      .populate("donation");

    if (!request) {
      return res.status(404).json({ message: "Donation request not found" });
    }

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const request = await DonationRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )
      .populate("ngo")
      .populate("donation");

    if (!request) {
      return res.status(404).json({ message: "Donation request not found" });
    }

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const request = await DonationRequest.findByIdAndDelete(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Donation request not found" });
    }

    res.json({ message: "Donation request deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

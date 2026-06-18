const express = require("express");
const router = express.Router();
const FoodDonation = require("../models/FoodDonation");
const NGO = require("../models/NGO");
const DonationRequest = require("../models/DonationRequest");

router.post("/", async (req, res) => {
  try {
    const donation = await FoodDonation.create(req.body);
    res.status(201).json(donation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const donations = await FoodDonation.find()
      .populate("restaurant")
      .populate("category");
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/:id/take", async (req, res) => {
  try {
    const quantityRequested = Number(req.body.quantityRequested);

    if (!req.body.ngo) {
      return res.status(400).json({ message: "NGO is required" });
    }

    if (!quantityRequested || quantityRequested < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const ngo = await NGO.findById(req.body.ngo);

    if (!ngo) {
      return res.status(404).json({ message: "NGO not found" });
    }

    const donation = await FoodDonation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: "Food donation not found" });
    }

    if (donation.status !== "available" || donation.quantity === 0) {
      return res.status(400).json({ message: "Food donation is not available" });
    }

    if (quantityRequested > donation.quantity) {
      return res.status(400).json({ message: "Requested quantity is more than available quantity" });
    }

    await DonationRequest.create({
      ngo: req.body.ngo,
      donation: donation._id,
      quantityRequested,
      notes: req.body.notes,
      status: "completed"
    });

    donation.quantity -= quantityRequested;
    donation.status = donation.quantity > 0 ? "available" : "delivered";
    await donation.save();

    const updatedDonation = await FoodDonation.findById(donation._id)
      .populate("restaurant")
      .populate("category");

    res.json(updatedDonation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const donation = await FoodDonation.findById(req.params.id)
      .populate("restaurant")
      .populate("category");

    if (!donation) {
      return res.status(404).json({ message: "Food donation not found" });
    }

    res.json(donation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const donation = await FoodDonation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
      .populate("restaurant")
      .populate("category");

    if (!donation) {
      return res.status(404).json({ message: "Food donation not found" });
    }

    res.json(donation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const donation = await FoodDonation.findByIdAndDelete(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: "Food donation not found" });
    }

    res.json({ message: "Food donation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

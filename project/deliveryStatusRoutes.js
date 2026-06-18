const express = require("express");
const router = express.Router();
const DeliveryStatus = require("../models/DeliveryStatus");

router.post("/", async (req, res) => {
  try {
    const delivery = await DeliveryStatus.create(req.body);
    res.status(201).json(delivery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const deliveries = await DeliveryStatus.find()
      .populate("donation")
      .populate("request")
      .populate("volunteer");
    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const delivery = await DeliveryStatus.findById(req.params.id)
      .populate("donation")
      .populate("request")
      .populate("volunteer");

    if (!delivery) {
      return res.status(404).json({ message: "Delivery status not found" });
    }

    res.json(delivery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const delivery = await DeliveryStatus.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )
      .populate("donation")
      .populate("request")
      .populate("volunteer");

    if (!delivery) {
      return res.status(404).json({ message: "Delivery status not found" });
    }

    res.json(delivery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const delivery = await DeliveryStatus.findByIdAndDelete(req.params.id);

    if (!delivery) {
      return res.status(404).json({ message: "Delivery status not found" });
    }

    res.json({ message: "Delivery status deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

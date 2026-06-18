const express = require("express");
const router = express.Router();
const NGO = require("../models/NGO");

router.post("/", async (req, res) => {
  try {
    const ngo = await NGO.create(req.body);
    res.status(201).json(ngo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const ngos = await NGO.find();
    res.json(ngos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const ngo = await NGO.findById(req.params.id);

    if (!ngo) {
      return res.status(404).json({ message: "NGO not found" });
    }

    res.json(ngo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const ngo = await NGO.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!ngo) {
      return res.status(404).json({ message: "NGO not found" });
    }

    res.json(ngo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const ngo = await NGO.findByIdAndDelete(req.params.id);

    if (!ngo) {
      return res.status(404).json({ message: "NGO not found" });
    }

    res.json({ message: "NGO deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

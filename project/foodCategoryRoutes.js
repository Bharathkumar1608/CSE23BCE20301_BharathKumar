const express = require("express");
const router = express.Router();
const FoodCategory = require("../models/FoodCategory");

router.post("/", async (req, res) => {
  try {
    const category = await FoodCategory.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const categories = await FoodCategory.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const category = await FoodCategory.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Food category not found" });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const category = await FoodCategory.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!category) {
      return res.status(404).json({ message: "Food category not found" });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const category = await FoodCategory.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Food category not found" });
    }

    res.json({ message: "Food category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

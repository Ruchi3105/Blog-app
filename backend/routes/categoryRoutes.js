const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Category = require("../models/categoryModel");

router.post("/", authMiddleware,async (req, res) => {
  try {
    const existingCategory = await Category.findOne({ name: req.body.name });

    if (existingCategory) {
      return res.status(400).json({ error: "Category already exists!" });
    }
    const category = await Category.create(req.body);
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

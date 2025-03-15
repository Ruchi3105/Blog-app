const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

router.post("/register", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) return res.status(500).json({ message: "User already exists" });
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
      profilePic: req.body.profilePic,
    });
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(404).json({ message: "Invalid credentials" });

    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated)
      return res.status(404).json({ message: "Invalid credentials" });

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const Post = require("../models/postModel");
const authMiddleware = require("../middlewares/authMiddleware");

router.put("/:id", authMiddleware, async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      if (req.body.password) {
        const password = req.body.password;
        if (password.length < 6) {
          return res
            .status(400)
            .json({ message: "Password must be at least 6 characters long" });
        }
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    return res
      .status(401)
      .json({ message: "You can only update your account" });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  if (req.user.id === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json("User not found");
      }
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User deleted successfully" });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    return res
      .status(401)
      .json({ message: "You can only delete your account" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

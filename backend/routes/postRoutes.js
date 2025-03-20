const router = require("express").Router();
const User = require("../models/userModel");
const Post = require("../models/postModel");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/create", authMiddleware, async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      res.status(200).json(updatedPost);
    } else {
      res.status(400).json({ message: "You can only update your post" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      await post.deleteOne();
      res.status(200).json({ message: "Post has been deleted" });
    } else {
      res.status(400).json({ message: "You can only delete your post" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  const username = req.query.users;
  const catName = req.query.cat;
  try {
    let post;
    if (username) {
      post = await Post.find({ username });
    } else if (catName) {
      post = await Post.find({ categories: { $in: [catName] } });
    } else {
      post = await Post.find();
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

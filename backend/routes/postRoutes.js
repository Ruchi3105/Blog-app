const router = require("express").Router();
const User = require("../models/userModel");
const Post = require("../models/postModel");
const Comment = require("../models/comment");
const authMiddleware = require("../middlewares/authMiddleware");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { title, desc } = req.body;

    // Generate summary using Gemini Flash model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Summarize the following blog post in 1 concise sentence:\n\n${desc} \n\nTitle: ${title}`;

    const result = await model.generateContent(prompt);
    const summary = result.response.text().trim();

    const postData = {
      ...req.body,
      summary: summary || "Summary not available.",
    };

    const post = await Post.create(postData);
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

router.post("/:postId/create-comment", authMiddleware, async (req, res) => {
  const { postId } = req.params;
  const { username, comment } = req.body;

  if (!username || !comment) {
    return res
      .status(400)
      .json({ message: "USername and comment are required." });
  }

  try {
    const newComment = new Comment({
      postId,
      username,
      comment,
    });

    const savedComment = await Comment.create(newComment);
    res.status(201).json(savedComment);
  } catch (error) {
    console.error("Error saving comment:", error);
    res.status(500).json({ message: "Server error while saving comment." });
  }
});

router.delete("/:commentId/delete", authMiddleware, async (req, res) => {
  const { commentId } = req.params;
  const { username } = req.body;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found." });
    }
    if (comment.username !== username) {
      return res
        .status(403)
        .json({ message: "You can only delete your own comments." });
    }
    await Comment.findByIdAndDelete(commentId);
    res.status(200).json({ message: "Comment deleted successfully." });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Server error while deleting comment." });
  }
});

// PUT /api/comments/:commentId/like
router.put("/:commentId/like", authMiddleware, async (req, res) => {
  const { commentId } = req.params;
  const { userId } = req.body;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment)
      return res.status(404).json({ message: "Comment not found." });

    const hasLiked = comment.likes.includes(userId);
    const hasDisliked = comment.dislikes.includes(userId);

    if (hasLiked) {
      comment.likes.pull(userId); // remove like
    } else {
      comment.likes.push(userId); // add like
      if (hasDisliked) comment.dislikes.pull(userId); // remove dislike if present
    }

    await comment.save();
    res.status(200).json({ message: "Like toggled", comment });
  } catch (err) {
    console.error("Error toggling like:", err);
    res.status(500).json({ message: "Server error." });
  }
});

// PUT /api/comments/:commentId/dislike
router.put("/:commentId/dislike", authMiddleware, async (req, res) => {
  const { commentId } = req.params;
  const { userId } = req.body;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment)
      return res.status(404).json({ message: "Comment not found." });

    const hasDisliked = comment.dislikes.includes(userId);
    const hasLiked = comment.likes.includes(userId);

    if (hasDisliked) {
      comment.dislikes.pull(userId); // remove dislike
    } else {
      comment.dislikes.push(userId); // add dislike
      if (hasLiked) comment.likes.pull(userId); // remove like if present
    }

    await comment.save();
    res.status(200).json({ message: "Dislike toggled", comment });
  } catch (err) {
    console.error("Error toggling dislike:", err);
    res.status(500).json({ message: "Server error." });
  }
});

router.get("/:postId/comments", async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.find({ postId }).sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Server error while fetching comments." });
  }
});

module.exports = router;

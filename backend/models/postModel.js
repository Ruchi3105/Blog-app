const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      set: (value) => value.replace(/\s+/g, " ").trim(),
    },
    desc: {
      type: String,
      required: true,
      trim: true,
      set: (value) => value.replace(/\s+/g, " ").trim(),
    },
    summary: {
      type: String,
      required: true,
      trim: true,
      set: (value) => value.replace(/\s+/g, " ").trim(),
    },
    username: {
      type: String,
      required: true,
      trim: true,
      set: (value) => value.replace(/\s+/g, " ").trim(),
    },
    photo: {
      type: String,
      default: "",
    },
    categories: {
      type: [String], // explicitly an array of strings
      required: true,
      validate: {
        validator: (arr) => arr.length > 0,
        message: "At least one category must be selected.",
      },
      set: (arr) => [
        ...new Set(arr.map((cat) => cat.trim().replace(/\s+/g, " "))),
      ],
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);

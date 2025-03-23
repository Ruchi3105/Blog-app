const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      set: (value) => value.replace(/\s+/g, " ").trim(),
    },
    desc: {
      type: String,
      require: true,
      trim: true,
      set: (value) => value.replace(/\s+/g, " ").trim(),
    },
    username: {
      type: String,
      require: true,
      trim: true,
      set: (value) => value.replace(/\s+/g, " ").trim(),
    },
    photo: {
      type: String,
      default: "",
    },
    categories: {
      type: Array,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);

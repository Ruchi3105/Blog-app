const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      set: (value) => value.replace(/\s+/g, " ").trim(),
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", categorySchema);

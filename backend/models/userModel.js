const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      set: (value) => value.replace(/\s+/g, " ").trim(),
    },
    email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      set: (value) => value.replace(/\s+/g, " ").trim(),
    },
    password: {
      type: String,
      require: true,
      trim: true,
      minlength: 6,
      set: (value) => value.replace(/\s+/g, " ").trim(),
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    console.log(connect.connection.host);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = connectDB;

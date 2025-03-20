const jwt = require("jsonwebtoken");
const dotenv=require('dotenv').config()

const authMiddleware = (req, res, next) => {
  const token = req.cookies.auth_token;
  if (!token)
    return res
      .status(403)
      .json({ message: "Access denied. No token provided." });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;

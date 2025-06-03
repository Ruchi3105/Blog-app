const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/dbConnection");
const multer = require("multer");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const path = require("path");

const app = express();

app.use(express.json());
app.use(cookieParser());

connectDB();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

const port = process.env.PORT || 3000;

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Set up Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // Cloudinary folder where images will be stored
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    res.status(200).json({ url: req.file.path });
  } catch (err) {
    res.status(500).json({ error: "File upload failed" });
  }
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));



// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
// });

app.listen(port, () => {
  console.log(`Server is running on the port: ${port}`);
});

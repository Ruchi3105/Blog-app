const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/dbConnection");
const multer = require("multer");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

app.use(cors({ origin: "https://blog-app-frontend-kz34fxasj-ruchis-projects-5f7e0e46.vercel.app", credentials: true }));
app.use(express.json());
app.use(cookieParser());

connectDB();

const port = process.env.PORT || 3000;

app.use("/images", express.static(path.join(__dirname, "images")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    res.status(200).json({ message: "File has been uploaded successfully" });
  } catch (err) {
    res.status(500).json({ error: "File upload failed" });
  }
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));

app.listen(port, () => {
  console.log(`Server is running on the port: ${port}`);
});

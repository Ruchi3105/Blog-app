const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/dbConnection");
const multer = require("multer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

const port = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post(
  "/api/upload",
  upload.single("file", (req, res) => {
    res.status(200).json("File has been uploaded");
  })
);

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));

app.listen(port, () => {
  console.log(`Server is running on the port: ${port}`);
});

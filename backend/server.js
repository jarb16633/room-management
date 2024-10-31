require("dotenv").config();
var express = require("express");
var morgan = require("morgan");
var connectDB = require("./utils/connectDB");
var cors = require("cors");
var authRoutes = require("./routes/authRoutes.js");
var roomRoutes = require("./routes/roomRoutes.js");

const app = express();

// Middlewares
app.use(express.json());

// Morgan logging
app.use(morgan("tiny"));

// Cors
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
  })
);
// For testing purpose
app.get("/", (req, res) => {
  res.send("Hello, world");
});

// Connect to Database
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/room", roomRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

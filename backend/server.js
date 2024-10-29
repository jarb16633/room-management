require("dotenv").config();
var express = require("express");
var morgan = require("morgan");
var connectDB = require("./utils/connectDB");
var authRoutes = require("./routes/authRoutes.js");

const app = express();

// Middlewares
app.use(express.json());

// Morgan logging
app.use(morgan("tiny"));

// For testing purpose
app.get("/", (req, res) => {
  res.send("Hello, world");
});

// Connect to Database
connectDB();

// Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

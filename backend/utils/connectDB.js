const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose
      .connect("mongodb://localhost:27017/room-management")
      .then(() => console.log("Connected to MongoDB"));
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
    process.exit(1);
  }
};

module.exports = connectDB;

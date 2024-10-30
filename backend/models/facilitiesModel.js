const mongoose = require("mongoose");

const facilitiesSchema = mongoose.Schema({
  type: String,
  enum: ["wifi", "tv", "aircon", "fridge", "furniture"],
});

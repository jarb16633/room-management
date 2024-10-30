const mongoose = require("mongoose");

const MeterReadingSchema = new mongoose.Schema(
  {
    electricity: {
      current: { type: Number, default: 0 },
      previous: { type: Number, default: 0 },
      unitsUsed: { type: Number, default: 0 },
      pricePerUnit: { type: Number, default: 5 },
      total: { type: Number, default: 0 },
    },
    water: {
      current: { type: Number, default: 0 },
      previous: { type: Number, default: 0 },
      unitsUsed: { type: Number, default: 0 },
      pricePerUnit: { type: Number, default: 20 },
      total: { type: Number, default: 0 },
    },
    readingDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Meter", MeterReadingSchema);

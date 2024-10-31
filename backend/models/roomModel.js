const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

// Define MeterReading Schema inline
const MeterReadingSchema = new mongoose.Schema({
  electricity: {
    current: { type: Number, required: true },
    previous: { type: Number, required: true },
    unitsUsed: { type: Number },
    pricePerUnit: { type: Number, default: 5 },
    total: { type: Number },
  },
  water: {
    current: { type: Number, required: true },
    previous: { type: Number, required: true },
    unitsUsed: { type: Number },
    pricePerUnit: { type: Number, default: 20 },
    total: { type: Number },
  },
  readingDate: { type: Date, default: Date.now },
});

// Define Additional Service Schema inline
const AdditionalServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  isActive: { type: Boolean, default: true },
});

// Define Facilities Schema inline
const FacilitiesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, default: "working" },
  lastChecked: { type: Date },
});

const RoomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    floor: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["standard", "deluxe", "suite"],
      default: "standard",
    },
    basePrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "occupied", "maintenance", "reserved"],
      default: "available",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    meterReading: [MeterReadingSchema],
    currentMeterReading: {
      electricity: { type: Number, default: 0 },
      water: { type: Number, default: 0 },
    },
    additionalServices: [AdditionalServiceSchema],
    facilities: [FacilitiesSchema],
    notes: { type: String },
    lastMaintenanceDate: [
      {
        date: { type: Date },
        description: { type: String },
        cost: { type: Number },
        performedBy: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Virtual field for calculating current bill
RoomSchema.virtual("currentBill").get(function () {
  const lastReading = this.meterReading[this.meterReading.length - 1];
  if (!lastReading) return 0;

  return {
    electricity: lastReading.electricity.total,
    water: lastReading.water.total,
    base: this.basePrice,
    additionalServices: this.additionalServices
      .filter((service) => service.isActive)
      .reduce((total, service) => total + service.price, 0),
    total:
      lastReading.electricity.total +
      lastReading.water.total +
      this.basePrice +
      this.additionalServices
        .filter((service) => service.isActive)
        .reduce((total, service) => total + service.price, 0),
  };
});

// Method to update meter reading
RoomSchema.methods.updateMeterReadings = function (readings) {
  const newReading = {
    electricity: {
      current: readings.electricity,
      previous: this.currentMeterReading.electricity,
      unitsUsed: readings.electricity - this.currentMeterReading.electricity,
      pricePerUnit: 5,
      total: (readings.electricity - this.currentMeterReading.electricity) * 5,
    },
    water: {
      current: readings.water,
      previous: this.currentMeterReading.water,
      unitsUsed: readings.water - this.currentMeterReading.water,
      pricePerUnit: 20,
      total: (readings.water - this.currentMeterReading.water) * 20,
    },
    readingDate: new Date(),
  };

  this.meterReading.push(newReading);
  this.currentMeterReading = {
    electricity: readings.electricity,
    water: readings.water,
  };
};

RoomSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
  deletedBy: true,
});

module.exports = mongoose.model("Room", RoomSchema);

const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const RoomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    meterReading: {
      electricity: {
        type: Number,
        default: 0,
      },
      water: {
        type: Number,
        default: 0,
      },
    },
    additionalServices: [
      {
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

RoomSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
  deletedBy: true,
});

module.exports = mongoose.model("Room", RoomSchema);

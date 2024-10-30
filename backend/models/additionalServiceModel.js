const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const AdditionalServicesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    defaultPrice: { type: Number, required: true },
    category: {
      type: String,
      enum: ["food", "laundry", "cleaning", "maintenance", "other"],
      default: "other",
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

AdditionalServicesSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
  deletedBy: true,
});

module.exports = mongoose.model("Services", AdditionalServicesSchema);

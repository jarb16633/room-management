const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const AdditionalServicesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
});

AdditionalServicesSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
  deletedBy: true,
});

module.exports = mongoose.model("Services", AdditionalServicesSchema);

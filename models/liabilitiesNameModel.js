const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const liabilityNameSchema = Schema({
  liabilityName: { type: String, required: true },
  liabilityType: { type: String, required: true },
  valueAmt: { type: Schema.Types.ObjectId, ref: "LiabilityValue " },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

liabilityNameSchema.virtual("liabilityvalue", {
  ref: "LiabilityValue",
  localField: "_id",
  foreignField: "liability",
});

liabilityNameSchema.set("toObject", { virtuals: true });
liabilityNameSchema.set("toJSON", { virtuals: true });

const LiabilityName = mongoose.model("LiabilityName", liabilityNameSchema);

module.exports = LiabilityName;

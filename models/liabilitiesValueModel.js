const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const liabilityValueSchema = Schema({
  liability: { type: Schema.Types.ObjectId, ref: "LiabilityName" },
  valueAmt: { type: Number, required: true },
  date: { type: Date },
});
const LiabilityValue = mongoose.model("LiabilityValue", liabilityValueSchema);

module.exports = LiabilityValue;

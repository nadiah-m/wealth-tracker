const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const liabilitySchema = Schema({
  liabilityName: { type: String, required: true },
  liabilityType: { type: String, required: true },
  valueAmt: { type: Number, required: true },
  date: { Date },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const Liability = mongoose.model("Liability", liabilitySchema);

module.exports = Liability;

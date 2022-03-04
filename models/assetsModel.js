const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assetSchema = Schema({
  assetName: { type: String, required: true },
  assetType: { type: String, required: true },
  valueAmt: { type: Number, required: true },
  date: { type: Date },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const Asset = mongoose.model("Asset", assetSchema);

module.exports = Asset;

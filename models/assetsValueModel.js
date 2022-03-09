const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assetValueSchema = Schema({
  asset: { type: Schema.Types.ObjectId, ref: "AssetName" },
  valueAmt: { type: Number, required: true },
  date: { type: Date },
});

const AssetValue = mongoose.model("AssetValue", assetValueSchema);

module.exports = AssetValue;

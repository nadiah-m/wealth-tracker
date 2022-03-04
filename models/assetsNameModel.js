const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assetNameSchema = Schema({
  assetName: { type: String, required: true },
  assetType: { type: String, required: true },
});

const AssetName = mongoose.model("AssetName", assetNameSchema);

module.exports = AssetName;

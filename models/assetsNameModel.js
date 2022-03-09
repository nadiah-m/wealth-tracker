const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assetNameSchema = Schema({
  assetName: { type: String, required: true },
  assetType: { type: String, required: true },
  valueAmt: { type: Schema.Types.ObjectId, ref: "AssetValue" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

assetNameSchema.virtual("assetvalue", {
  ref: "AssetValue",
  localField: "_id",
  foreignField: "asset",
});

assetNameSchema.set("toObject", { virtuals: true });
assetNameSchema.set("toJSON", { virtuals: true });

const AssetName = mongoose.model("AssetName", assetNameSchema);

module.exports = AssetName;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./usersModel");

const assetProjectionSchema = Schema({
  assetName: { type: String, required: true },
  initialAmt: { type: Number, required: true, default: 0 },
  contributionAmt: { type: Number, required: true, default: 0 },
  interestRate: { type: Number, required: true, default: 0 },
  frequency: { type: Number, required: true, default: 1 },
  years: { type: Number, required: true },
  assetProjectionUser: { type: Schema.Types.ObjectId, ref: "User" },
});

const AssetProjection = mongoose.model(
  "AssetProjection",
  assetProjectionSchema
);

module.exports = AssetProjection;

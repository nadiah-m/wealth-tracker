const express = require("express");
const router = express.Router();
const AssetProjection = require("../models/assetProjectionModel");

router.get("/seed", async (req, res) => {
  const seedAssetProjection = [
    {
      assetName: "S&P 500",
      initialAmt: 5000,
      contributionAmt: 1000,
      interestRate: 7,
      frequency: 1,
      years: 10,
      assetProjectionUser: "621d035e545415409124cad4",
    },
    {
      assetName: "CPF",
      initialAmt: 20000,
      contributionAmt: 800,
      interestRate: 2.5,
      frequency: 1,
      years: 20,
      assetProjectionUser: "621d035e545415409124cad4",
    },
    {
      assetName: "Bond",
      initialAmt: 1000,
      contributionAmt: 500,
      interestRate: 4,
      frequency: 1,
      years: 20,
      assetProjectionUser: "621d035e545415409124cad4",
    },
  ];
  try {
    await AssetProjection.deleteMany({});
    const createdAssetProjection = await AssetProjection.create(
      seedAssetProjection
    );
    res.status(200).json({
      status: "ok",
      message: "seeded asset projections",
      data: { createdAssetProjection },
    });
  } catch (error) {
    res.json({ status: "ok", message: "error.message" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const AssetProjection = require("../models/assetProjectionModel");

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.json({ status: "not ok", message: "Token is not valid" });
      }
      req.user = user;
      next();
    });
  } else {
    res.json({ status: "not ok", message: "Please login or sign up" });
  }
};

router.post("/new", verify, async (req, res) => {
  const currentUser = req.user.id;
  console.log(currentUser);
  const newAssetProjection = {
    assetName: req.body.assetName,
    initialAmt: req.body.initialAmt,
    contrAmt: req.body.contrAmt,
    intRate: req.body.intRate,
    frequency: req.body.frequency,
    years: req.body.years,
    futureValues: req.body.futureValues,
    user: req.body.user,
  };
  if (currentUser !== newAssetProjection.user) {
    res.json({
      status: "not ok",
      message: "Please login with the correct username",
    });
  }
  try {
    const createdNewAssetProjection = await AssetProjection.create(
      newAssetProjection
    );

    res.status(200).json({
      status: "ok",
      message: "created new asset projection",
      data: {
        createdNewAssetProjection,
      },
    });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

//* delete asset projection
router.delete("/:assetprojid", async (req, res) => {
  const { assetprojid } = req.params;
  try {
    const deletedAssetProj = await AssetProjection.findByIdAndDelete(
      assetprojid
    );

    res.status(200).json({
      status: "ok",
      message: "deleted asset",
      data: { deletedAssetProj },
    });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

module.exports = router;

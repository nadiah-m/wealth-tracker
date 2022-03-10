const express = require("express");
const router = express.Router();
const AssetValue = require("../models/assetsValueModel");
const AssetName = require("../models/assetsNameModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


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

//*get all assets
router.get("/", async (req, res) => {
  try {
    const allAssets = await AssetName.find({}).populate("assetvalue");

    res.status(200).json({
      status: "ok",
      message: "get all assets name",
      data: { allAssets },
    });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

//* create new asset
router.post("/new", verify, async (req, res) => {
  const currentUser = req.user.id;

  const newAssetName = {
    assetName: req.body.assetName,
    assetType: req.body.assetType,
    user: req.body.user,
  };
  if (currentUser !== newAssetName.user) {
    res.json({
      status: "not ok",
      message: "Please login with the correct username",
    });
  }
  try {
    const createdNewAsset = await AssetName.create(newAssetName);
    const newValueAmt = {
      asset: createdNewAsset._id,
      valueAmt: req.body.valueAmt,
      date: req.body.date,
    };
    const createdNewValue = await AssetValue.create(newValueAmt);
    res.status(200).json({
      status: "ok",
      message: "created new asset",
      data: {
        AssetName: createdNewAsset,
        ValueAmt: createdNewValue,
      },
    });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

//* update latest amount of current asset
router.post("/:assetid/updateAmt", async (req, res) => {
  const { assetid } = req.params;

  try {
    const foundAsset = await AssetName.findById(assetid);
    const newAssetAmt = {
      asset: assetid,
      valueAmt: req.body.valueAmt,
      date: req.body.date,
    };
    const createUpdatedAmt = await AssetValue.create(newAssetAmt);
    res.status(200).json({
      status: "ok",
      message: "updated asset amount",
      data: createUpdatedAmt,
    });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

//* get individual asset
router.get("/:assetid", verify, async (req, res) => {
  const { assetid } = req.params;
  try {
    const assetName = await AssetName.findById(assetid);
    const assetValue = await AssetValue.find({ asset: assetid }).sort({
      date: -1,
    });
    res.status(200).json({
      status: "ok",
      message: "get individual asset",
      data: { assetName, assetValue },
    });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

//* edit asset
router.put("/:assetid", async (req, res) => {
  const { assetid } = req.params;
  const changedAssetName = {
    assetName: req.body.assetName,
    assetType: req.body.assetType,
  };
  try {
    const editedAssetName = await AssetName.findByIdAndUpdate(
      assetid,
      changedAssetName,
      {
        new: true,
      }
    );
    res
      .status(200)
      .json({ status: "ok", message: "edited asset", data: editedAssetName });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

//* delete asset
router.delete("/:assetid", async (req, res) => {
  const { assetid } = req.params;
  try {
    const deletedAsset = await AssetName.findByIdAndDelete(assetid);
    const deleteAssetValue = await AssetValue.deleteMany({ asset: assetid });
    res.status(200).json({
      status: "ok",
      message: "deleted asset",
      data: { deletedAsset, deleteAssetValue },
    });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

module.exports = router;

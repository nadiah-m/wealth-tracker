const express = require("express");
const router = express.Router();
const Asset = require("../models/assetsModel");

//*seed assets
router.get("/seed", async (req, res) => {
  const seedAsset = [
    {
      assetName: "S&P 500",
      assetType: "Stock",
      valueAmt: 8000,
      date: "2022-04-03",
      user: "621f4acf1280b7827a0aa76e",
    },
    {
      assetName: "Bond",
      assetType: "Bond",
      valueAmt: 1000,
      date: "2022-04-03",
      user: "621f4acf1280b7827a0aa76e",
    },
    {
      assetName: "CPF",
      assetType: "CPF",
      valueAmt: 15000,
      date: "2022-04-03",
      user: "621f4acf1280b7827a0aa76e",
    },
  ];
  try {
    await Asset.deleteMany({});
    const createdAsset = await Asset.create(seedAsset);
    res.status(200).json({
      status: "ok",
      message: "seeded assets",
      data: { createdAsset },
    });
  } catch (error) {
    res.json({ status: "ok", message: "error.message" });
  }
});

const isAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.json({ status: "not ok", message: "please login or sign up" });
      } else {
        console.log(decodedToken);
        return next();
      }
    });
  } else {
    res.json({ status: "not ok", message: "please login or sign up" });
  }
};

//*get all assets
router.get("/", async (req, res) => {
  try {
    const allAssets = await Asset.find({});
    res
      .status(200)
      .json({ status: "ok", message: "get all assets", data: allAssets });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

//* create new asset
router.post("/new", async (req, res) => {
  const newAsset = {
    assetName: req.body.assetName,
    assetType: req.body.assetType,
    valueAmt: req.body.valueAmt,
    date: req.body.date,
  };
  try {
    const createdNewAsset = await Asset.create(newAsset);
    res.status(200).json({
      status: "ok",
      message: "created new asset",
      data: createdNewAsset,
    });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

//* get individual asset
router.get("/:assetid", async (req, res) => {
  const { assetid } = req.params;
  try {
    const foundAsset = await Asset.findById(assetid);
    res.status(200).json({
      status: "ok",
      message: "get individual asset",
      data: foundAsset,
    });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

//* edit asset
router.put("/:assetid", async (req, res) => {
  const { assetid } = req.params;
  const changedAsset = req.body;
  try {
    const editedAsset = await Asset.findByIdAndUpdate(assetid, changedAsset, {
      new: true,
    });
    res
      .status(200)
      .json({ status: "ok", message: "edited asset", data: editedAsset });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

//* delete asset
router.delete("/:assetid", async (req, res) => {
  const { assetid } = req.params;
  try {
    const deletedAsset = await Asset.findByIdAndDelete(assetid);
    res.status(200).json({
      status: "ok",
      message: "deleted asset",
      data: deletedAsset,
    });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

module.exports = router;

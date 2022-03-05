const express = require("express");
const router = express.Router();
const LiabilityValue = require("../models/liabilitiesValueModel");
const LiabilityName = require("../models/liabilitiesNameModel");

//*get all liabilities
router.get("/", async (req, res) => {
  try {
    const allLiabilities = await LiabilityName.find({}).populate(
      "liabilityvalue"
    );

    res.status(200).json({
      status: "ok",
      message: "get all liabilities name",
      data: { allLiabilities },
    });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

//* create new liability
router.post("/new", async (req, res) => {
  const newLiabilityName = {
    liabilityName: req.body.liabilityName,
    liabilityType: req.body.liabilityType,
  };

  try {
    const createdNewLiability = await LiabilityName.create(newLiabilityName);
    const newValueAmt = {
      liability: createdNewLiability._id,
      valueAmt: req.body.valueAmt,
      date: req.body.date,
    };
    const createdNewValue = await LiabilityValue.create(newValueAmt);
    res.status(200).json({
      status: "ok",
      message: "created new liability",
      data: {
        LiabilityName: createdNewLiability,
        ValueAmt: createdNewValue,
      },
    });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

module.exports = router;

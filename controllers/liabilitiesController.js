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

//* update latest amount of current liability
router.post("/:liabilityid/updateAmt", async (req, res) => {
  const { liabilityid } = req.params;

  try {
    const foundLiability = await LiabilityName.findById(liabilityid);
    const newLiabilityAmt = {
      liability: liabilityid,
      valueAmt: req.body.valueAmt,
      date: req.body.date,
    };
    const createUpdatedAmt = await LiabilityValue.create(newLiabilityAmt);
    res.status(200).json({
      status: "ok",
      message: "updated liability amount",
      data: createUpdatedAmt,
    });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

//* get individual liability
router.get("/:liabilityid", async (req, res) => {
  const { liabilityid } = req.params;
  try {
    const liabilityName = await LiabilityName.findById(liabilityid);
    const liabilityValue = await LiabilityValue.find({
      liability: liabilityid,
    }).sort({
      date: -1,
    });
    res.status(200).json({
      status: "ok",
      message: "get individual asset",
      data: { liabilityName, liabilityValue },
    });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

//* edit liability
router.put("/:liabilityid", async (req, res) => {
  const { liabilityid } = req.params;
  const changedLiabilityName = {
    liabilityName: req.body.liabilityName,
    liabilityType: req.body.liabilityType,
  };
  try {
    const editedLiabilityName = await LiabilityName.findByIdAndUpdate(
      liabilityid,
      changedLiabilityName,
      {
        new: true,
      }
    );
    res.status(200).json({
      status: "ok",
      message: "edited asset",
      data: editedLiabilityName,
    });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

//* delete liability
router.delete("/:liabilityid", async (req, res) => {
  const { liabilityid } = req.params;
  try {
    const deletedLiabilityName = await LiabilityName.findByIdAndDelete(
      liabilityid
    );
    const DeleteLiabilityValue = await LiabilityValue.deleteMany({
      liability: liabilityid,
    });

    res.status(200).json({
      status: "ok",
      message: "deleted liability",
      data: { deletedLiabilityName, DeleteLiabilityValue },
    });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

module.exports = router;

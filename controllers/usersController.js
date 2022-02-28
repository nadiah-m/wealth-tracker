const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const User = require("../models/usersModel");

//* GET seed users
router.get("/seed", async (req, res) => {
  const seedUsers = [
    {
      username: "admin123",
      email: "admin@123.com",
      password: "admin123",
    },
    {
      username: "testtest",
      email: "test@test.com",
      password: "testtest",
    },
  ];

  try {
    await User.deleteMany({});
    seedUsers.forEach((user) => {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
    });
    const seededUsers = await User.create(seedUsers);

    res
      .status(200)
      .json({ status: "ok", message: "seeded users", data: seededUsers });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

module.exports = router;

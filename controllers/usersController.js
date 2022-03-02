const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const User = require("../models/usersModel");
const jwt = require("jsonwebtoken");

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

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
};

//* post sign up
router.post("/signup", async (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  try {
    const createdUser = await User.create(req.body);
    const token = createToken(createdUser._id);
    res.json({
      status: "ok",
      message: "user created",
      data: createdUser,
      token: token,
    });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

//*get all username
router.get("/allusername", async (req, res) => {
  try {
    const allUsernames = await User.find({});
    const usernameMap = [];
    allUsernames.forEach((user) => {
      usernameMap.push({
        username: user.username,
        userid: user._id,
      });
      return usernameMap;
    });
    res
      .status(200)
      .json({ status: "ok", message: "get all username", data: usernameMap });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

module.exports = router;

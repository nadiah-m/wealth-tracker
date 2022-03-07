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

const createToken = (userid) => {
  return jwt.sign({ id: userid }, process.env.TOKEN_SECRET, {
    expiresIn: "1800s",
  });
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
    // res.cookie("jwt", token, { httpOnly: true, maxAge: 1800 });
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
        email: user.email,
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

//* log in
router.post("/login", async (req, res) => {
  try {
    const foundUser = await User.findOne({ username: req.body.username });

    if (!foundUser) {
      res.json({
        status: "not ok",
        message: "No User Found. Please login with the correct username",
      });
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        const token = createToken(foundUser._id);
        res.json({
          status: "ok",
          message: "user found",
          data: foundUser,
          token: token,
        });
      } else {
        res.json({ status: "not ok", message: "Password Does Not Match" });
      }
    }
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

// const verify = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (authHeader) {
//     const token = authHeader.split(" ")[1];
//     jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
//       if (err) {
//         return res.json({ status: "not ok", message: "Token is not valid" });
//       }
//       req.user = user;
//       next();
//     });
//   } else {
//     res.json({ status: "not ok", message: "Please login or sign up" });
//   }
// };
module.exports = router;

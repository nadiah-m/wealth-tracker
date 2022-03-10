const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const User = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const AssetName = require("../models/assetsNameModel");
const LiabilityName = require("../models/liabilitiesNameModel");

const createAccessToken = (userid) => {
  return jwt.sign({ id: userid }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1800s",
  });
};

const createRefreshToken = (userid) => {
  return jwt.sign({ id: userid }, process.env.REFRESH_TOKEN_SECRET);
};

//* GET seed users
router.get("/seed", async (req, res) => {
  const seedUsers = [
    {
      username: "admin123",
      email: "admin@123.com",
      password: "admin123",
      superAdmin: true,
    },
  ];

  try {
    await User.deleteMany({});
    seedUsers.forEach((user) => {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
    });
    const seededUsers = await User.create(seedUsers);
    const token = createToken(seedUsers._id);
    res.status(200).json({
      status: "ok",
      message: "seeded users",
      data: seededUsers,
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

//* superadmin authentication
const isSuperadmin = (req, res, next) => {
  const user = req.user;
  console.log(user.superAdmin);
  if (user && user.superAdmin === true) {
    return next();
  } else {
    res.json({ status: "not ok", message: "user is not a superadmin" });
  }
};

//* post sign up
router.post("/signup", async (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  try {
    const createdUser = await User.create(req.body);
    const accessToken = createAccessToken(createdUser._id);
    res.json({
      status: "ok",
      message: "user created",
      data: createdUser,
      accessToken: accessToken,
    });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

let refreshTokens = [];

//* refresh token
router.post("/refresh", async (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) {
    return res.json({
      status: "not ok",
      message: "You are not authenticated",
    });
  }
  if (!refreshTokens.includes(refreshToken)) {
    return res.json({
      status: "not ok",
      message: "Refresh token is not valid",
    });
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.json({ status: "not ok", message: error.message });
    }
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    console.log("after filter", refreshTokens);
    const newAccessToken = createAccessToken(user);
    const newRefreshToken = createRefreshToken(user);
    refreshTokens.push(newRefreshToken);
    console.log("after push", refreshToken);
    return res.json({
      status: "ok",
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });
});

//* log in
router.post("/login", async (req, res) => {
  try {
    const foundUser = await User.findOne({ username: req.body.username });

    if (!foundUser) {
      return res.json({
        status: "not ok",
        message: "No User Found. Please login with the correct username",
      });
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        const accessToken = createAccessToken(foundUser._id);
        const refreshToken = createRefreshToken(foundUser._id);
        refreshTokens.push(refreshToken);
        return res.json({
          status: "ok",
          message: "user found",
          data: foundUser,
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
      } else {
        return res.json({
          status: "not ok",
          message: "Password Does Not Match",
        });
      }
    }
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

router.post("/logout", verify, (req, res) => {
  const refreshToken = req.body.token;
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  console.log("refreshToken not token", refreshTokens);
  res.json({ status: "ok", message: "You have logged out successfully" });
});

//* get all users - superadmin
router.get("/superadmin", verify, isSuperadmin, async (req, res) => {
  try {
    const allUsers = await User.find({});
    res
      .status(200)
      .json({ status: "ok", message: "get all users", data: allUsers });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

//* delete users - superadmin
router.delete("/superadmin/:userid", isSuperadmin, async (req, res) => {
  const { userid } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(userid);
    res.status(200).json({
      status: "ok",
      message: "deleted user",
      data: deletedUser,
    });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

//*get user data
router.get("/:userid", verify, async (req, res) => {
  const { userid } = req.params;
  const user = req.user;
  try {
    const foundAsset = await AssetName.find({ user: userid }).populate(
      "assetvalue"
    );
    const foundLiability = await LiabilityName.find({ user: userid }).populate(
      "liabilityvalue"
    );
    if (user.id === userid) {
      res.status(200).json({
        status: "ok",
        message: "get user home page",
        data: { foundAsset, foundLiability },
      });
    } else {
      res.json({
        status: "not ok",
        message: "please login with the correct username",
      });
    }
  } catch (error) {
    res.json({ status: "ok", message: error.message });
  }
});

module.exports = router;

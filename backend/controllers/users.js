const { Router } = require("express");
const router = Router();
const { hashSync, compareSync } = require("bcrypt");
const User = require("../models/User");
const { sign } = require("jsonwebtoken");

const SALT_LENGTH = 12;

router.post("/signup", async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
      return res.json({ error: "Username already taken." });
    }

    const user = await User.create({
      username: req.body.username,
      hashedPassword: hashSync(req.body.password, SALT_LENGTH),
    });
    const token = sign(
      { username: user.username, _id: user._id },
      process.env.JWT_SECRET,
    );
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user && compareSync(req.body.password, user.hashedPassword)) {
      const token = sign(
        { username: user.username, _id: user._id },
        process.env.JWT_SECRET,
      );
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: "Invalid username or password." });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

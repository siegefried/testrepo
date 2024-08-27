const { Router } = require("express");
const router = Router();
const { sign, verify } = require("jsonwebtoken");

router.get("/sign-token", (req, res) => {
  const user = {
    _id: 1,
    username: "test",
    password: "test",
  };

  const token = sign({ user }, process.env.JWT_SECRET);
  res.json({ token });
});

router.post("/verify-token", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    res.json({ decoded });
  } catch (error) {
    res.status(401).json({ error: "Invalid token." });
  }
});

module.exports = router;

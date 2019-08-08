const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("users/login");
});

router.get("/register", (req, res) => {
  res.render("users/register");
});

router.post("/register", (req, res) => {
  console.log(req.body);
  const errors = [];
  if (req.body.password !== req.body.password2) {
    errors.push({ text: "Password do not match" });
  }
  if (req.body.password.length < 4) {
    errors.push({ text: "Password must at least be 4 characters" });
  }
  if (errors.length > 0) {
    res.render("users/register", { errors, ...req.body });
  } else {
    res.send("passed");
  }
});

module.exports = router;

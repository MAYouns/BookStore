const express = require("express");
const authService = require("../services/authService");
const userService = require('../services/userServices')
const router = express.Router();

router.post("/register", async (req, res) => {
  console.log(req.body)
  try {
    const createdUser = await authService.register(req.body);
    res.status(201).send(createdUser);
  } catch (err) {
    res.status(400).send({ "error": err.message })
  }
});

router.post("/login", async (req, res) => {
  try {
    const token = await authService.login(req.body);

    res.send({ "authToken": token, "role": await userService.getRole(req.body.username) });
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
});

module.exports = router;
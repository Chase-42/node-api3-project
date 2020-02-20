const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: process.env.WELCOME_MESSAGE || "Welcome to the server!"
  });
});

module.exports = router;

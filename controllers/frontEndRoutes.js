const express = require("express");
const router = express.Router();
const models = require('../models');

router.get("/test", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

module.exports = router;
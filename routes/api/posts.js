const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  res.json({ msg: "All went fine in POSTS." });
});

module.exports = router;
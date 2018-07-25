const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  res.json({ msg: "All went fine in USERS." });
});

module.exports = router;

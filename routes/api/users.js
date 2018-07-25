const express = require("express");
const router = express.Router();

// @route     GET /api/users/test
// @desc      Tests the post route
// @access    Private
router.get("/test", (req, res) => {
  res.json({ msg: "All went fine in USERS." });
});

module.exports = router;

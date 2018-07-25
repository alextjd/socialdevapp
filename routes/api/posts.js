const express = require("express");
const router = express.Router();

// @route     GET /api/posts/test
// @desc      Tests the post route
// @access    Public
router.get("/test", (req, res) => {
  res.json({ msg: "All went fine in POSTS." });
});

module.exports = router;

const express = require("express");
const mongoose = require("mongoose");

// Load the express router
const router = express.Router();

// @route     GET /api/profile/test
// @desc      Tests the post route
// @access    Public
router.get("/test", (req, res) => {
    res.json({ msg: "All went fine in PROFILE." });
});

module.exports = router;

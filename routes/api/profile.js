const express = require("express");
const passport = require("passport");

// Load the express router
const router = express.Router();

// Load Profile model
const Profile = require("../../models/Profile");
// Load User model
const User = require("../../models/User");

// @route     GET /api/profile/test
// @desc      Tests the post route
// @access    Public
router.get("/test", (req, res) => {
    res.json({ msg: "All went fine in PROFILE." });
});

// @route     GET /api/profile
// @desc      Get the profile of the token's user
// @access    Private
router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        // Get the profile: req.user contains the authenticated user
        Profile.findOne({ user: req.user.id })
            .then(profile => {
                if (!profile) {
                    return res
                        .status(404)
                        .json("There is no profile for this user");
                }
                res.json(profile);
            })
            .catch(err => {
                res.json(err);
            });
    }
);

module.exports = router;

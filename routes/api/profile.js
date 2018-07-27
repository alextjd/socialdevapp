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

// @route     POST /api/profile
// @desc      Create a profile for the token's user
// @access    Private
router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        // Prepare the profile values
        const profileData = {};
        profileData.user = req.user.id;
        if (req.body.handle) profileData.handle = req.body.handle;
        if (req.body.company) profileData.company = req.body.company;
        if (req.body.website) profileData.website = req.body.website;
        if (req.body.location) profileData.location = req.body.location;
        if (req.body.status) profileData.status = req.body.status;
        // Split skills CSV into array
        if (typeof req.body.skills !== "undefined") {
            profileData.skills = req.body.skills.split(",");
        }
        if (req.body.bio) profileData.bio = req.body.bio;
        if (req.body.githubusername)
            profileData.githubusername = req.body.githubusername;
        if (req.body.experience) profileData.experience = req.body.experience;
        if (req.body.education) profileData.education = req.body.education;
        // Set individually the social networks
        profileData.social = {};
        if (req.body.twitter) profileData.social.twitter = req.body.twitter;
        if (req.body.instagram)
            profileData.social.instagram = req.body.instagram;

        Profile.findOne({ user: req.user.id })
            .then(profile => {
                // Update the user's profile
                if (profile) {
                    // findOneAndUpdate(filter, new info, return new info?)
                    Profile.findOneAndUpdate(
                        { user: req.user.id },
                        profileData,
                        { new: true }
                    )
                        .then(() => {
                            res.json(profile);
                        })
                        .catch(err => {
                            res.json(err);
                        });
                }
                // Create a new profile for the user
                else {
                    // The handle must be unique
                    Profile.findOne({ handle: req.user.handle }).then(
                        profile => {
                            // Handle already taken
                            if (profile) {
                                res.status(400).json({
                                    msg: "Handle already taken"
                                });
                            }
                            // Save the new profile
                            new Profile(profileData).save().then(profile => {
                                res.json(profile);
                            });
                        }
                    );
                }
            })
            .catch(err => {
                res.json(err);
            });
    }
);

module.exports = router;

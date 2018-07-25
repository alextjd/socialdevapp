const express = require("express");
const fetch = require("node-fetch");
const bcryp = require("bcryptjs");

// Load the express router
const router = express.Router();

// Load User model
const User = require("../../models/User");

// @route     GET /api/users/test
// @desc      Tests the post route
// @access    Private
router.get("/test", (req, res) => {
  res.json({ msg: "All went fine in USERS." });
});

// @route     GET /api/users/register
// @desc      Register a new user
// @access    Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    // Check if email is already taken
    if (user) {
      return res.status(400).json({ msg: "This email is already taken" });
    }
    // Register the user
    const new_user = new User({
      name: req.body.name,
      email: req.body.email,
      pwd: req.body.pwd
    });
    // Encrypt the password
    bcryp.genSalt((err, salt) => {
      bcryp.hash(new_user.pwd, salt, (err, hash) => {
        if (err) throw err;
        new_user.pwd = hash;
        // Save the new user
        new_user
          .save()
          .then(user => {
            res.json(user);
          })
          .catch(err => {
            console.log(err);
          });
      });
    });
  });
});

// @route     GET /api/users/register
// @desc      Try to grab the avatar from github
// @access    Public
// router.get("/avatar", (req, res) => {
//   fetch("https://api.github.com/users/alextjd")
//     .then(res => res.json())
//     .then(body => console.log(body.avatar_url));
// });

module.exports = router;

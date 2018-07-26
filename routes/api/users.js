const express = require("express");
const jwt = require("jsonwebtoken");
const bcryp = require("bcryptjs");
const passport = require("passport");

// Get the secret key for the token
const secret = require("../../config/keys").secret;

// Load the express router
const router = express.Router();

// Load User model
const User = require("../../models/User");

// @route     GET /api/users/test
// @desc      Tests the post route
// @access    Public
router.get("/test", (req, res) => {
  res.json({ msg: "All went fine in USERS" });
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

// @route     GET /api/users/login
// @desc      Login for registered users
// @access    Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const pwd = req.body.pwd;
  User.findOne({ email: email }).then(user => {
    // Check if the email exists in the db
    if (!user) {
      return res
        .status(401)
        .json({ msg: "No account linked to the email provided" });
    }
    // Check the passwords
    bcryp.compare(pwd, user.pwd, (err, match) => {
      if (err) throw err;
      if (match) {
        // Prepare the payload
        const payload = { id: user.id, name: user.name };
        // Generate and return the token
        jwt.sign(payload, secret, { expiresIn: "12h" }, (err, token) => {
          if (err) throw err;
          res.json({ token: `Bearer ${token}`, msg: "Correct login" });
        });
      } else {
        res.status(401).json({ msg: "Incorrect password" });
      }
    });
  });
});

// @route     GET /api/users/current
// @desc      Return the user of the current token
// @access    Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ msg: "Yayyy" });
  }
);

// TODO: create method to use the github avatar in this app

module.exports = router;

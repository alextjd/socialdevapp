const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const moongoose = require("mongoose");

// Import the users schema
const User = moongoose.model("users");
// Import the keys
const keys = require("../config/keys");

// Prepare the options of the extraction
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.secret
};

// Use the passport-jwt functionality
const strategy = passport => {
  passport.use(
    new JwtStrategy(options, (payload, done) => {
      console.log(payload);
    })
  );
};

module.exports = strategy;

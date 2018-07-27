const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const moongoose = require("mongoose");

// Import the users schema
const User = moongoose.model("users");
// Import the keys
const keys = require("../config/keys");

// Prepare the options of the extraction
const options = {
    // Were to look for the token
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    // Secret to decode it
    secretOrKey: keys.secret
};

// Extract the user whose id is in the payload
const strategy = passport => {
    passport.use(
        new JwtStrategy(options, (payload, done) => {
            User.findById(payload.id)
                .then(user => {
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                })
                .catch(err => {
                    console.log(err);
                });
        })
    );
};

module.exports = strategy;

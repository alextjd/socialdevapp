const express = require("express");
const mongoose = require("mongoose"); // Communication interface with MongoDB
const bodyParser = require("body-parser"); // Necessary to read HTTP request data
const passport = require("passport");

// Import the application modules
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

// Initialize espress
const app = express();
// DB config
const db = require("./config/keys").mongoURI;

// BodyParser middleware to read HTTP request data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect with MongoDB
mongoose
    .connect(db)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch(err => {
        console.log(err);
    });

// Passport middleware for authentication
app.use(passport.initialize());
// Passport configuration
require("./config/passport")(passport);

// User routes
app.use("/api/users", users);
// Profile routes
app.use("/api/profile", profile);
// Posts routes
app.use("/api/posts", posts);

// Set the port; first element for Heroku
const port = process.env.PORT || 5000;

// Set the app to run on the port
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

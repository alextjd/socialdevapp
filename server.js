const express = require("express");
const moongoose = require("mongoose"); // Communication interface with MongoDB
const bodyParser = require("body-parser"); // Necessary to read HTTP request data

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

// Initialize espress
const app = express();

// Setup the app to be able to read HTTP request data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = require("./config/keys").mongoURI;

// Connect with MongoDB
moongoose
  .connect(db)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(err => {
    console.log(err);
  });

// Method to call when requests to '/' are received
app.get("/", (req, res) => {
  res.send("Hello there");
});

// User routes
app.use("/api/users", users);
// Profile routes
app.use("/api/profile", profile);
// Posts routes
app.use("/api/posts", posts);

// Set the port. First element for Heroku
const port = process.env.PORT || 5000;

// Set the app to run on the port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

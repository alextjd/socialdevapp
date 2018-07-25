const express = require("express");
const moongoose = require("mongoose"); // Communication interface with MongoDB

// Initialize espress
const app = express();

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

// Set the port. First element for Heroku
const port = process.env.PORT || 5000;

// Set the app to run on the port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

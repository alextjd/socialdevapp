// Import express
const express = require("express");
// Initialize espress
const app = express();

// Method to call when requests to '/' are received
app.get("/", () => {
  res.send("Hello");
});

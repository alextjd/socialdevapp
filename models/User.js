// Define objects and map them to MongoDB
const moongoose = require("mongoose");
const Schema = moongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  pwd: {
    type: String,
    required: true
  },
  img: {
    type: String
  },
  date: {
    type: Date,
    defaul: Date.now
  }
});

module.exports = moongoose.model("users", UserSchema);

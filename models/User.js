// Define objects and map them to MongoDB
const moongoose = require("moongoose");
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
    type: String,
    required: true
  },
  date: {
    type: Date,
    defaul: Date.now
  }
});

module.exports = mongoose.model("users", UserSchema);

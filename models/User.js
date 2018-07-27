// Define objects and map them to MongoDB
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

module.exports = mongoose.model("users", UserSchema);

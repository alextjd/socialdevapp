// Define objects and map them to MongoDB
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
    user: {
        // Id of a user object
        type: Schema.Types.ObjectId,
        // Reference to the collection of that id
        ref: "users"
    },
    handle: {
        type: String,
        required: true,
        max: 40
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String,
        max: 200
    },
    githubusername: {
        type: String
    },
    // Previous professional experience
    experience: [
        {
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            // Starting date
            from: {
                type: Date,
                required: true
            },
            // End date: could still be in the company
            to: {
                type: Date
            },
            // Check if still in the company
            curret: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    // Previous academic experience
    education: [
        {
            title: {
                type: String,
                required: true
            },
            school: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            // Starting date
            from: {
                type: Date,
                required: true
            },
            // End date: could still be in the degree
            to: {
                type: Date
            },
            // Still in the school
            curret: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    social: {
        twitter: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    // Date of the registration in the app
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("profile", ProfileSchema);

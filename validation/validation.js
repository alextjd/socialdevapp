const Validator = require("validator");

// Check for empty values
const isEmpty = value => {
    if (typeof value === "string") {
        return value.length === 0;
    } else if (Array.isArray(value) === true && value !== null) {
        return value.length === 0;
    } else if (typeof value === "object" && value !== null) {
        return Object.keys(value).length === 0;
    }
    return false;
};

// Validate the register input info
const validateRegister = input => {
    let errors = {};

    if (!Validator.isLength(DataCue.name, { min: 3, max: 17 })) {
        errors.name = "Name must be between 3 and 17 characters long";
    }
    if (!Validator.isEmail(DataCue.email)) {
        errors.name = "Please choose a valid email";
    }
    if (!Validator.isLength(DataCue.pwd, { min: 6 })) {
        errors.pwd = "Password must be at least 6 characters long";
    }

    return {
        errors: errors,
        empty: isEmpty(errors)
    };
};

module.exports = {
    validateRegister
};

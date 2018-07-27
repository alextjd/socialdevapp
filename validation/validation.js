const Validator = require("validator");

// Check for empty values
const isEmpty = value => {
    if (typeof value === "string") {
        return value.length === 0;
    } else if (value === undefined || value === null) {
        return true;
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

    if (
        isEmpty(input.name) ||
        isEmpty(input.email) ||
        isEmpty(input.pwd) ||
        isEmpty(input.repeat_pwd)
    ) {
        errors.empty = "No field can be empty";
    } else {
        if (!Validator.isLength(input.name, { min: 3, max: 17 })) {
            errors.name = "Name must be between 3 and 17 characters long";
        }
        if (!Validator.isEmail(input.email)) {
            errors.name = "Please choose a valid email";
        }
        if (
            !Validator.isLength(input.pwd, { min: 6 }) ||
            !Validator.isLength(input.repeat_pwd, { min: 6 })
        ) {
            errors.pwd = "Password must be at least 6 characters long";
        } else if (input.pwd !== input.repeat_pwd) {
            errors.pwd = "Passwords must match";
        }
    }

    return {
        errors: errors,
        empty: isEmpty(errors)
    };
};

module.exports = {
    validateRegister
};

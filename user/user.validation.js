const { body } = require('express-validator');

const registrationValidationRules = [
    body('name')
        .isString().withMessage('Name must be a string')
        .notEmpty().withMessage('Name is required'),

    body('email')
        .isEmail().withMessage('Invalid email address')
        .normalizeEmail()
        .notEmpty().withMessage('Email is required'),

    body('password')
        .isString().withMessage('Password must be a string')
        .isLength({ min: 6 }).withMessage('Password must be at least 8 characters long'),
];

const loginValidationRules = [
    body('name')
        .isString().withMessage('Name must be a string')
        .notEmpty().withMessage('Name is required'),

    body('email')
        .isEmail().withMessage('Invalid email address')
        .normalizeEmail()
        .notEmpty().withMessage('Email is required'),

    body('password')
        .isString().withMessage('Password must be a string')
        .isLength({ min: 6 }).withMessage('Password must be at least 8 characters long'),
];

const preferenceValidationRules = [
    body('preferences.categories')
        .optional()
        .isArray().withMessage('Categories must be an array of strings')
        .custom((arr) => arr.every(item => typeof item === 'string')).withMessage('Each category must be a string'),

    body('preferences.languages')
        .optional()
        .isArray().withMessage('Languages must be an array of strings')
        .custom((arr) => arr.every(item => typeof item === 'string')).withMessage('Each language must be a string'),
]


module.exports = {
    registrationValidationRules,
    loginValidationRules,
    preferenceValidationRules
};

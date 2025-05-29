const express = require("express");
const { register, login, getPreferences, updatePreferences } = require("./user.controller");
const authMiddleware = require("../middleware");
const { registrationValidationRules, loginValidationRules, preferenceValidationRules } = require("./user.validation");
const router = express.Router();

router.post("/register", registrationValidationRules, register)
router.post("/login", loginValidationRules, login)
router.get("/preferences", authMiddleware, getPreferences);
router.put("/preferences", authMiddleware, preferenceValidationRules, updatePreferences)

module.exports = router
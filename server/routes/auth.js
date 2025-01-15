const express = require("express")
const router = express.Router()

const { sendOTP, signup, login, resetPassword } = require("../controller/auth")
const { auth } = require("../middleware/auth")

// Authentication routes

router.post("/send-otp", sendOTP)
router.post('/signup', signup)
router.post("/login", login)
router.post("/changePassword", resetPassword)

module.exports = router
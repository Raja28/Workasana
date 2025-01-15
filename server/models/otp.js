
const mongoose = require("mongoose")
const { otpMailSender } = require("../utils/otpMailSender")

const otpSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 60 * 5
    }
}, 
// {timestamps: true}
)

async function sendMail(email, otp) {
    try {
        await otpMailSender(email, otp)
    } catch (error) {
        console.log(error);
        throw error
        
    }
}

otpSchema.pre("save", async function(next) {
    await sendMail(this.email, this.otp)
    next()
})

module.exports = mongoose.model("OTP", otpSchema)
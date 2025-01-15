
const OTP = require("../models/otp")
const otpGenerator = require("otp-generator")
const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const TaskModel = require("../models/task")
const UsersModel = require("../models/user")
const TagsModel = require("../models/tag")
const ProjectsModel = require("../models/project")
const TeamsModel = require("../models/team")

exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email Required"
            })
        }

        const userAlreadyExist = await User.findOne({ email: email })

        if (userAlreadyExist) {
            return res.status(400).json({
                success: false,
                message: "User Already Exist, Please Login"
            })
        }

        let otp = otpGenerator.generate(4,
            {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            }
        );

        let isOTPExist = await OTP.findOne({ otp: otp })

        if (isOTPExist) {
            otp = otpGenerator.generate(4,
                {
                    upperCaseAlphabets: false,
                    specialChars: false,
                    specialChars: false
                }
            );

            isOTPExist = await OTP.findOne({ otp: otp })
        }

        const newOTP = await OTP.create({
            email,
            otp
        })

        if (newOTP) {
            res.status(200).json({
                success: true,
                message: "OTP Sent Successfully"
            })
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Failed To Send OTP"
        })

    }
}

exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword, otp } = req.body


        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(400).json({
                success: false,
                message: "All Feilds Required"
            })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password & ConfirmPassword Not Matching, Try Again."
            })
        }

        const userRecentOTP = await OTP.find({ email: email }).sort({ createdAt: -1 }).limit(1)

        if (userRecentOTP.length === 0) {
            return res.status(400).json({
                success: false,
                message: "OTP Not Found"
            })
        } else if (userRecentOTP[0].otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            })
        }

        const encrtptedPassword = await bcrypt.hash(password, 10)

        let newUser = await User.create({
            firstName,
            lastName,
            email,
            password: encrtptedPassword
        })
        newUser.password = undefined

        const tokenPayload = {
            _id: newUser._id,
            email: newUser.email
        }

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "24h" })

        const user = {
            firstName,
            lastName,
            email, _id: newUser._id,
            token,
            profileImage: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}%20${lastName}`
        }


        res.status(200).json({
            success: true,
            message: 'Signup Successfull',
            user,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Failed to SignUp"
        })

    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
console.log(email, password);

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email & Password Required"
            })
        }

        const isUserRegistered = await User.findOne({ email: email });
console.log(isUserRegistered);

        if (!isUserRegistered) {
            return res.status(401).json({
                success: false,
                message: "User Not Registered, Please Signup"
            })
        }


        // ['project', 'team', "owners", "tags"]
        const task = await TaskModel.find({})
            .populate({ path: "owners", select: { firstName: 1, lastName: 1 } })
            .populate("tags")
            .populate("team")
            .populate("project")

        const owners = await UsersModel.find({}).select({ "firstName": 1, "lastName": 1, })
        const tags = await TagsModel.find({})
        const projects = await ProjectsModel.find({})
        const teams = await TeamsModel.find({})

        if (await bcrypt.compare(password, isUserRegistered.password)) {

            const tokenPayload = {
                _id: isUserRegistered._id,
                email: isUserRegistered.email
            }

            const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "24h" })
            isUserRegistered.password = undefined
            const user = isUserRegistered.toObject()
            user.profileImage = `https://api.dicebear.com/5.x/initials/svg?seed=${isUserRegistered.firstName}%20${isUserRegistered.lastName}`


            return res.status(200).json({
                success: true,
                message: "Login Successfull",
                user,
                token: token,
                tasks: task.length > 0 ? task : [],
                owners: owners.length > 0 ? owners : [],
                tags: tags.length > 0 ? tags : [],
                projects: projects.length > 0 ? projects : [],
                teams: teams.length > 0 ? teams : [],
            })

        } else {
            return res.status(401).json({
                success: false,
                message: `Invalid Password`,
            })
        }

    } catch (error) {
        console.error(error)

        return res.status(500).json({
            success: false,
            message: `Login Failed, Please Try Again`,
        })
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const { password, confirmPassword, email } = req.body

        if (!password || !confirmPassword || !email) {
            return res.status(400).json({
                success: false,
                message: "All Feilds Required"
            })
        }

        const userDetails = await User.findOne({ email: email })

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "User Not Registered, Please Signup"
            })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password & ConfirmPassword Not Matching, Try Again."
            })
        }

        const hashedPassword = bcrypt.hash(password, 10);

        const updatedUser = await User.findOneAndUpdate({ email: email }, { password: hashedPassword }, { new: true })

        return res.status(200).json({
            success: true,
            message: "Password Reset Successfull"
        })

    } catch (error) {
        console.error("Error occurred while sending email:", error)
        return res.status(500).json({
            success: false,
            message: "Error occurred while sending email",
            error: error.message,
        })
    }
}
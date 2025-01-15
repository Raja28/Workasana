const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.auth = async (req, res, next) => {
    try {
        const token = req.body.token || req.header("Authorization").replace("Bearer ", "")

        if (!token) {

            return res.status(401).json({
                success: false,
                message: "Token Missing"
            })
        }

        try {

            const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decodedToken

        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token Expired or Invalid"
            });
        }
        next()

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Error While Validating Token"
        })

    }
}
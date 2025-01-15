const { connection } = require("./config/DBConnection")
const express = require("express")
const bodyParser = require('body-parser')
const app = express()
app.use(express.json())
app.use(bodyParser.json())

require("dotenv").config()
const cors = require("cors")
app.use(
    cors({
        // origin: 'http://localhost:5173', // frontend link
        origin: "*",
        credentials: true
    })
);

PORT = process.env.PORT || 4000

const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")

connection()

app.use("/auth", authRoutes)
app.use("/user", userRoutes)

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Workasna server is up..."
    })
})

app.listen(PORT, () => {
    console.log("Server Workasana running on port :", PORT);
})

const express = require("express")
const router = express.Router()

const { fetchUserDetails, createProject, createTeam, addTag, addTask, updateTaskDetails, fetchUsersName, deleteTask } = require("../controller/user")
const { auth } = require("../middleware/auth")


router.get("/get-userDetails", auth, fetchUserDetails)
router.post("/new-project", auth, createProject)  
router.post("/new-team", auth, createTeam) 
router.post("/new-tag", addTag) 
router.post("/new-task", addTask) 
router.post("/get-taskDeatils", ) 
router.post("/update-task",auth, updateTaskDetails) 
router.get("/fetchUsersName", fetchUsersName)
router.post("/delete-task", auth, deleteTask)

module.exports = router
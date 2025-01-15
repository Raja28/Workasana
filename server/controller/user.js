const ProjectModel = require("../models/project")
const UserModel = require("../models/user")
const TeamModel = require("../models/team")
const TagModel = require("../models/tag")
const TaskModel = require("../models/task")

exports.fetchUserDetails = async (req, res) => {
    try {

        const { email } = req.user

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email Required"
            })
        }

        const userDetail = await UserModel.findOne({ email })

        if (!userDetail) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            })
        }
        userDetail.password = undefined

        res.status(200).json({
            success: true,
            message: 'User Found',
            user: userDetail
        })

    } catch (error) {
        console.log("Fetch User Details Err :", error);
        res.status(500).json({
            success: false,
            message: "Internal Sever Error"
        })
    }

}

exports.createProject = async (req, res) => {
    try {
        const { project, description = undefined } = req.body

        if (!project) {
            return res.status(400).json({
                success: false,
                message: "Project Name Required"
            })
        }

        const projectExists = await ProjectModel.findOne({ project })

        if (projectExists) {
            return res.status(400).json({
                success: false,
                message: "Project Exists"
            })
        }

        const newProject = await ProjectModel.create({ name: project, description })

        if (newProject) {
            return res.status(201).json({
                success: true,
                message: "Project Created Successfully",
                project: newProject
            })
        } else {
            return res.status(400).json({
                success: true,
                message: "Failed To Created Project, Try Again",
            })
        }

    } catch (error) {
        console.log("createProject Err :", error);
        res.status(500).json({
            success: false,
            message: "Internal Sever Error"
        })
    }
}

exports.createTeam = async (req, res) => {
    try {
        const { team, description = undefined } = req.body


        if (!team) {
            return res.status(400).json({
                success: false,
                message: "Team Name Required"
            })
        }

        const teamExists = await TeamModel.findOne({ name: team })

        if (teamExists) {
            return res.status(400).json({
                success: false,
                message: "Team Exists"
            })
        }

        const newTeam = await TeamModel.create({ name: team, description })

        if (newTeam) {
            return res.status(201).json({
                success: true,
                message: "Team Created Successfully",
                team: newTeam
            })
        } else {
            return res.status(400).json({
                success: true,
                message: "Failed To Created Team, Try Again",
            })
        }

    } catch (error) {
        console.log("createTeam Err :", error);
        res.status(500).json({
            success: false,
            message: "Internal Sever Error"
        })
    }
}

exports.addTag = async (req, res) => {
    try {
        const { tag } = req.body

        if (!tag) {
            return res.status(400).json({
                success: false,
                message: "Tag Name Required"
            })
        }

        const tagExists = await TagModel.findOne({ name: tag })

        if (tagExists) {
            return res.status(400).json({
                success: false,
                message: "Tag Already Exists"
            })
        }

        const newTag = await TagModel.create({ name: tag })

        if (newTag) {
            return res.status(201).json({
                success: true,
                message: "Tag Created Successfully",
                tag: newTag
            })
        } else {
            return res.status(400).json({
                success: true,
                message: "Failed To Created Tag, Try Again",
            })
        }

    } catch (error) {
        console.log("addTag Err :", error);
        res.status(500).json({
            success: false,
            message: "Internal Sever Error"
        })
    }
}

exports.addTask = async (req, res) => {
    try {

        const { taskName, project, team, owners, tags = undefined, dueDate, status } = req.body
        const { user } = req

        if (!taskName || !project || !team || !owners || !dueDate || !status) {
            return res.status(400).json({
                success: false,
                message: "All Feilds Required"
            })
        }

        const taskExists = await TaskModel.findOne({ taskName })

        if (taskExists) {
            return res.status(400).json({
                success: false,
                message: "Task Already Exists"
            })
        }

        const newTask = await TaskModel.create({
            name: taskName,
            project,
            team,
            owners,
            dueDate,
            status,
            tags
        })

        const task = await TaskModel.findById({ _id: newTask._id })
            .populate({ path: "owners", select: { firstName: 1, lastName: 1 } })
            .populate("tags")
            .populate("team")
            .populate("project")

        if (newTask) {
            return res.status(201).json({
                success: true,
                message: "Task Created Successfully",
                task: task
            })
        } else {
            return res.status(400).json({
                success: true,
                message: "Failed To Created Task, Try Again",
            })
        }

    } catch (error) {
        console.log("addTask Err :", error);
        res.status(500).json({
            success: false,
            message: "Internal Sever Error"
        })
    }
}

exports.updateTaskDetails = async (req, res) => {
    try {

        const { name = undefined,
            project = undefined,
            team = undefined,
            owners = undefined,
            tags = undefined,
            dueDate = undefined,
            status = undefined,
            taskId = undefined } = req.body

        const { user } = req

        if (!taskId) {
            return res.status(400).json({
                success: false,
                message: "Task ID Required"
            })
        }

        const taskDetail = await TaskModel.findById(taskId)

        if (!taskDetail) {
            return res.status(404).json({
                success: false,
                message: "Task Not Found"
            })
        }

        if (name) {
            taskDetail.name = name
        }

        if (project) {
            taskDetail.project = project
        }

        if (team) {
            taskDetail.team = team
        }

        if (owners) {
            taskDetail.owners = [...owners]
        }

        if (tags) {
            taskDetail.tags = [...tags]
        }

        if (dueDate) {
            taskDetail.dueDate = dueDate
        }

        if (status) {
            taskDetail.status = status
        }

        await taskDetail.save()

        const updatedtask = await TaskModel.findById(taskId)
            .populate({ path: "owners", select: { firstName: 1, lastName: 1 } })
            .populate(["tags", "team", "project"])
            .exec()

        res.status(201).json({
            success: true,
            message: "Task Updated Successfully",
            updatedtask
        })

    } catch (error) {
        console.log("updateTaskDetails", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })

    }
}


exports.deleteTask = async (req, res) => {
    try {
        const { taskId } = req.body
        const { user } = req

        if (!taskId) {
            return res.status(400).json({
                success: false,
                message: "Task ID Required"
            })
        }

        const task = await TaskModel.findByIdAndDelete(taskId)

        if (!task) {
            return res.status(400).json({
                success: false,
                message: "Task not found"
            })
        }

        await UserModel.findByIdAndUpdate(user._id, {
            $pull: {
                'tasks': task._id
            }
        })

        return res.status(201).json({
            success: true,
            message: 'Task deleted successfully',
            task
        })

    } catch (error) {
        console.log("deleteTask", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


exports.fetchUsersName = async (req, res) => {
    try {
        const name = await UserModel.find({}).select({ "firstName": 1, "lastName": 1, })
        return res.status(200).json({
            name
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}
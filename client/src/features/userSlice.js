import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { ADD_NEW_PROJECT_API, ADD_NEW_TAG_API, ADD_NEW_TASK_API, ADD_NEW_TEAM_API, DELETE_TASK_API, FETCH_TASK_DETAILS_API, FETCH_USER_DETAILS_API, UPDATE_TASK_API } from "../utils/api";
import { useToken } from "../hooks/useToken";
import { FaJar } from "react-icons/fa6";


export const fetchUserDetails = createAsyncThunk('posts/fetchUserDetails', async (data, { rejectWithValue }) => {
    const toastId = toast.loading("Please Wait...")
    try {
        const token = useToken()
        const userData = await axios.post(FETCH_USER_DETAILS_API, { token })

        if (userData?.data?.sucess) {
            toast.dismiss(toastId)

        }
        return userData?.data?.user

    } catch (error) {
        toast.dismiss(toastId)
        toast.error(error.response?.data?.message)
        return rejectWithValue(error.response?.data?.message)
    }
})

// export const fetchTaskDetails = createAsyncThunk("posts/fetchTaskDetails", async (taskId, {rejectWithValue})=>{
//     try {
//         const response = await axios.post(FETCH_TASK_DETAILS_API, {taskId})

//         return response?.data?.task
//     } catch (error) {
//         return rejectWithValue(error?.response?.data?.message)
//     }
// })

export const addNewProject = createAsyncThunk("posts/addNewProject", async (projectDetails, { rejectWithValue }) => {
    const toastId = toast.loading("Please Wait...")

    try {

        const response = await axios.post(ADD_NEW_PROJECT_API, projectDetails, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })

        if (response?.data?.success) {
            toast.dismiss(toastId)
            toast.success("Project Add Successfully")
        }

        return response?.data?.project
    } catch (error) {
        toast.dismiss(toastId)
        toast.error(error?.response?.data?.message)
        return rejectWithValue(error?.response?.data?.message)
    }
})

export const addNewTeam = createAsyncThunk("posts/addNewTeam", async (teamDetails, { rejectWithValue }) => {
    const toastId = toast.loading("Please Wait...")

    try {
        const response = await axios.post(ADD_NEW_TEAM_API, teamDetails, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })

        if (response?.data?.success) {
            toast.dismiss(toastId)
            toast.success("Team Add Successfully")
        }

        return response?.data?.team
    } catch (error) {
        toast.dismiss(toastId)
        toast.error(error?.response?.data?.message)
        return rejectWithValue(error?.response?.data?.message)
    }
})

export const addNewTag = createAsyncThunk("posts/addNewTag", async (tagDetails, { rejectWithValue }) => {
    const toastId = toast.loading("Please Wait...")

    try {
        const response = await axios.post(ADD_NEW_TAG_API, tagDetails, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })

        if (response?.data?.success) {
            toast.dismiss(toastId)
            toast.success("Tag Add Successfully")
        }

        return response?.data?.tag
    } catch (error) {
        toast.dismiss(toastId)
        toast.error(error?.response?.data?.message)
        return rejectWithValue(error?.response?.data?.message)
    }
})

export const addNewTask = createAsyncThunk("posts/addNewTask", async (taskDetails, { rejectWithValue }) => {
    const toastId = toast.loading("Please Wait...")

    try {
        const response = await axios.post(ADD_NEW_TASK_API, taskDetails, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })

        if (response?.data?.success) {
            toast.dismiss(toastId)
            toast.success("Task Added Successfully")
        }
        console.log("new task added response ", response?.data);

        return response?.data?.task
    } catch (error) {
        toast.dismiss(toastId)
        toast.error(error?.response?.data?.message)
        return rejectWithValue(error?.response?.data?.message)
    }
})

export const updateTask = createAsyncThunk("posts/updateTask", async (taskDetails, { rejectWithValue }) => {
    const toastId = toast.loading("Please Wait...")
    // console.log(taskDetails);

    try {
        const response = await axios.post(UPDATE_TASK_API, taskDetails, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })

        if (response?.data?.success) {
            toast.dismiss(toastId)
            toast.success("Task Updated Successfully")
        }
        // console.log("new task updated response ", response?.data);

        return response?.data?.updatedtask
    } catch (error) {
        toast.dismiss(toastId)
        toast.error(error?.response?.data?.message)
        return rejectWithValue(error?.response?.data?.message)
    }
})

export const deleteTask = createAsyncThunk('posts/deleteTask', async (taskId, { rejectWithValue }) => {
    const toastId = toast.loading('Please wait...')
    try {
        const response = await axios.post(DELETE_TASK_API, { taskId }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response?.data?.success) {
            toast.dismiss(toastId)
            toast.success('Task deleted')
        }

        return response?.data?.task
    } catch (error) {
        toast.dismiss(toastId)
        return rejectWithValue(error?.response?.data?.message)
    }
})

const initialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    tasks: localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [],
    projects: localStorage.getItem('projects') ? JSON.parse(localStorage.getItem('projects')) : [],
    owners: localStorage.getItem('owners') ? JSON.parse(localStorage.getItem('owners')) : [],
    tags: localStorage.getItem('tags') ? JSON.parse(localStorage.getItem('tags')) : [],
    teams: localStorage.getItem('teams') ? JSON.parse(localStorage.getItem('teams')) : [],
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    filterData: [],
    status: "idle",
    error: null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state,) => {
            state.user = JSON.parse(localStorage.getItem("user"))
            state.token = localStorage.getItem("token")
            state.tasks = JSON.parse(localStorage.getItem("tasks"))

            state.projects = JSON.parse(localStorage.getItem("projects"))
            state.owners = JSON.parse(localStorage.getItem("owners"))
            state.tags = JSON.parse(localStorage.getItem("tags"))
            state.teams = JSON.parse(localStorage.getItem("teams"))

        },
        setStatus: (state, {payload})=>{
            state.status = payload ? payload : 'idle'
        },

        clearUser: (state) => { //logout
            localStorage.clear()
            state.user = null
            state.tasks = null
            state.projects = null
            state.owners = null
            state.tags = null
            state.teams = null
            state.token = null

        },
        setFilterData: (state, { payload }) => {
            state.filterData = payload ? payload : state.tasks
        }
    },

    extraReducers: (builder) => {

        builder.addCase(fetchUserDetails.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(fetchUserDetails.fulfilled, (state, { payload }) => {
            state.status = "success",
                state.user = payload
        })
        builder.addCase(fetchUserDetails.rejected, (state, { payload }) => {
            state.status = "error"
            state.error = payload
        })

        // addNewProject
        builder.addCase(addNewProject.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(addNewProject.fulfilled, (state, { payload }) => {
            let projects = JSON.parse(localStorage.getItem("projects"))

            projects = projects?.length > 0 ? [...projects, payload] : [payload]
            localStorage.setItem("projects", JSON.stringify(projects))
            state.status = "success"
            state.projects = JSON.parse(localStorage.getItem("projects"))
        })
        builder.addCase(addNewProject.rejected, (state, { payload }) => {
            state.status = "error"
            state.error = payload
        })

        // addNewTeam
        builder.addCase(addNewTeam.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(addNewTeam.fulfilled, (state, { payload }) => {
            let teams = JSON.parse(localStorage.getItem("teams"))
            // console.log(projects);

            teams = teams?.length > 0 ? [...teams, payload] : [payload]
            localStorage.setItem("teams", JSON.stringify(teams))
            state.status = "success"
            state.teams = JSON.parse(localStorage.getItem("teams"))
        })
        builder.addCase(addNewTeam.rejected, (state, { payload }) => {
            state.status = "error"
            state.error = payload
        })


        // addNewTag
        builder.addCase(addNewTag.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(addNewTag.fulfilled, (state, { payload }) => {
            let tags = JSON.parse(localStorage.getItem("tags"))
            // console.log(projects);

            tags = tags?.length > 0 ? [...tags, payload] : [payload]
            localStorage.setItem("tags", JSON.stringify(tags))
            state.status = "success"
            state.tags = JSON.parse(localStorage.getItem("tags"))
        })
        builder.addCase(addNewTag.rejected, (state, { payload }) => {
            state.status = "error"
            state.error = payload
        })


        // addNewTask
        builder.addCase(addNewTask.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(addNewTask.fulfilled, (state, { payload }) => {
            let tasks = JSON.parse(localStorage.getItem("tasks"))

            tasks = tasks?.length > 0 ? [...tasks, payload] : [payload]
            localStorage.setItem("tasks", JSON.stringify(tasks))
            state.status = "success"
            state.tasks = JSON.parse(localStorage.getItem("tasks"))
        })
        builder.addCase(addNewTask.rejected, (state, { payload }) => {
            state.status = "error"
            state.error = payload
        })


        // updateTask
        builder.addCase(updateTask.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(updateTask.fulfilled, (state, { payload }) => {
            console.log("payload", payload);

            let tasks = JSON.parse(localStorage.getItem("tasks"))
            const updateIndex = tasks.findIndex(task => task._id === payload._id)
            tasks[updateIndex] = payload
            localStorage.setItem("tasks", JSON.stringify(tasks))
            state.status = "success"
            state.tasks = JSON.parse(localStorage.getItem("tasks"))
        })
        builder.addCase(updateTask.rejected, (state, { payload }) => {
            state.status = "error"
            state.error = payload
        })

        builder.addCase(deleteTask.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(deleteTask.fulfilled, (state, { payload }) => {
          
            let tasks = JSON.parse(localStorage.getItem('tasks'))
            const index = state?.tasks.findIndex(task => task._id === payload._id)
            tasks.splice(index, 1)
            localStorage.setItem('tasks', JSON.stringify(tasks))
            state.tasks.splice(index, 1);
            state.status = 'success'
        })
        builder.addCase(deleteTask.rejected, (state, { payload }) => {
            state.status = 'error',
                state.error = payload
        })
    }
})
export const { setUser, clearUser, setFilterData, setStatus } = userSlice.actions
export default userSlice.reducer
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import toast from "react-hot-toast"
import { LOGIN_API, SEND_OTP_API, SIGNUP_API } from "../utils/api"
import { useToken } from "../hooks/useToken"
// import {useToken} from "../hooks/useToken"

export const sendOTP = createAsyncThunk("posts/sendOTP", async (email, { rejectWithValue }) => {
    const toastId = toast.loading("Sending OTP")
    try {

        const otpResponse = await axios.post(SEND_OTP_API, { email })
        if (otpResponse.data.success) {
            toast.dismiss(toastId)
            toast.success("OTP Sent")
        }

    } catch (error) {

        toast.dismiss(toastId)
        toast.error(error?.response?.data.message)
        return rejectWithValue(error?.response?.data.message)
    }
})

export const signup = createAsyncThunk("posts/signup", async (signupData, { rejectWithValue }) => {
    const toastId = toast.loading("Please Wait...")
    try {

        const signupResponse = await axios.post(SIGNUP_API, signupData);
        if (signupResponse.data.success) {
            toast.dismiss(toastId)
            toast.success("Signup Successfull")
        }
        // console.log(signupResponse?.data);

        return signupResponse?.data?.user
    } catch (error) {
        console.log(error);
        toast.dismiss(toastId)
        toast.error(error?.response.data.message)
        return rejectWithValue(error?.response.data.message)
    }
})

export const login = createAsyncThunk('posts', async (formData, { rejectWithValue }) => {
    const toastId = toast.loading("Verifying User")
    try {
        const response = await axios.post(LOGIN_API, formData)

        if (response?.data?.success) {
            toast.dismiss(toastId)
            toast.success("Login Successful")
        }

        return response?.data
    } catch (error) {
        toast.dismiss(toastId)
        toast.error(error?.response?.data?.message)
        return rejectWithValue(error?.response?.data?.message)
    }
})

const initialState = {
    userData: null,
    status: "idle",
    error: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserData: (state, { payload }) => {
            state.userData = payload
        },
        setAuthStatus: (state, { payload }) => {
            state.status = payload
        },
        resetAuthSlice: (state) => {
            state.userData = null
            state.status = "idle"
            state.error = null
        }
    },

    extraReducers: (builder) => {
        //OTP
        builder.addCase(sendOTP.pending, (state,) => {
            state.status = "loading"
        });
        builder.addCase(sendOTP.fulfilled, (state, { payload }) => {
            state.status = "success"
        })
        builder.addCase(sendOTP.rejected, (state, { payload }) => {
            state.status = "error"
            state.error = payload
        })

        // signup
        builder.addCase(signup.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(signup.fulfilled, (state, { payload }) => {

            state.status = "success"
            state.userData = payload
            localStorage.setItem("token", payload?.token)
            localStorage.setItem("user", JSON.stringify(payload.user))
            localStorage.setItem("task", JSON.stringify(payload?.task))

        })
        builder.addCase(signup.rejected, (state, { payload }) => {
            state.status = "error"
            state.error = payload
        })

        // Login
        builder.addCase(login.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(login.fulfilled, (state, { payload }) => {
            
            localStorage.setItem("token", payload?.token)
            localStorage.setItem("user", JSON.stringify(payload.user))
            localStorage.setItem("tasks", JSON.stringify(payload?.tasks))
            localStorage.setItem("teams", JSON.stringify(payload?.teams))
            localStorage.setItem("projects", JSON.stringify(payload?.projects))
            localStorage.setItem("tags", JSON.stringify(payload?.tags))
            localStorage.setItem("owners", JSON.stringify(payload?.owners))
            state.status = "success"
            // state.userData = payload
        })
        builder.addCase(login.rejected, (state, { payload }) => {
            state.status = "error"
            state.error = payload
        })
    }
})




export const { setUserData, setAuthStatus, resetAuthSlice } = authSlice.actions
export default authSlice.reducer
// const BASEURL = "http://localhost:3000"
const BASEURL = "https://workasana-server-nine.vercel.app"

//Auth
export const SEND_OTP_API = BASEURL + "/auth/send-otp"
export const SIGNUP_API = BASEURL + "/auth/signup"
export const LOGIN_API = BASEURL + "/auth/login"

//Profile/User
export const FETCH_USER_DETAILS_API = BASEURL + "/user/get-userDetails"
export const FETCH_TASK_DETAILS_API = BASEURL + "/user/get-taskDeatils"
export const ADD_NEW_PROJECT_API = BASEURL + "/user/new-project"
export const ADD_NEW_TEAM_API = BASEURL + "/user/new-team"
export const ADD_NEW_TAG_API = BASEURL + "/user/new-tag"
export const ADD_NEW_TASK_API = BASEURL + "/user/new-task"
export const UPDATE_TASK_API = BASEURL + "/user/update-task"
export const DELETE_TASK_API = BASEURL + "/user/delete-task"
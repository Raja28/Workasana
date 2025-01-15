import { useEffect, useState } from "react"
import Footer from "../components/common/Footer"
import Header from "../components/common/Header"
import { asanaLogo } from "../assets/images"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { sendOTP, setUserData } from "../features/authSlice";
import Loading from "./Loading";

function Signup() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const { status, error, userData } = useSelector(state => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [signupData, setSignupData] = useState({
        firstName: "", lastName: "", email: "", password: "", confirmPassword: ""
    })

    useEffect(() => {
        if (status === "success" && userData !== null) {
            navigate("/signup/verification")
        }
        if (userData !== null) {

            setSignupData({ ...userData, password: "", confirmPassword: "" })

        }

    }, [status])

    function onChangeHandler(e) {
        const { value, name } = e.target

        setSignupData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function handlerSignup(e) {

        e.preventDefault()


        const { firstName, lastName, email, password, confirmPassword } = signupData

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            toast.error("All Fields Required")
            return
        }

        dispatch(setUserData(signupData))
        dispatch(sendOTP(email))
        setSignupData({
            firstName: "", lastName: "", email: "", password: "", confirmPassword: ""
        })

    }

    return (
        <>
            <main className="container mt-3 min-vh-100" >
                {status === "loading" && <Loading />

                }
                {status === "error" && <div>{error}</div>}
                {status !== "loading" &&
                    <section>
                        <div className=" container" >
                            <div className="row d-flex flex-column align-items-center">
                                <div className="col-md-6 d-flex flex-column align-items-center mt-3">
                                    <img
                                        src={asanaLogo}
                                        alt="asana logo"
                                        className="w-50 "
                                    />
                                    <div className="border border-secondary border-opacity-25 shadow-sm w-100 rounded mt-2 mb-2 d-flex flex-column">
                                        <h3 className=" text-center text-warning-emphasis fw-semibold">Signup</h3>
                                        <form onSubmit={handlerSignup} className="p-4">
                                            {/* First & Last Name */}
                                            <div className="d-flex gap-2 flex-md-nowrap flex-lg-nowrap flex-wrap">
                                                <div className="form-floating mb-3 w-100">
                                                    <input
                                                        name="firstName"
                                                        value={signupData.firstName}
                                                        type="firstName"
                                                        className="form-control"
                                                        id="floatingfirstName"
                                                        onChange={onChangeHandler}
                                                        placeholder="First name" />
                                                    <label htmlFor="floatingfirstName">First name</label>
                                                </div>

                                                <div className="form-floating mb-3 w-100">
                                                    <input
                                                        name="lastName"
                                                        value={signupData.lastName}
                                                        type="lastName"
                                                        className="form-control"
                                                        id="floatingLastname"
                                                        onChange={onChangeHandler}
                                                        placeholder="Last name" />
                                                    <label htmlFor="floatingLastname">Last name</label>
                                                </div>

                                            </div>
                                            <div className="form-floating mb-3">
                                                <input
                                                    name="email"
                                                    value={signupData.email}
                                                    type="email"
                                                    className="form-control"
                                                    id="floatingEmail"
                                                    onChange={onChangeHandler}
                                                    placeholder="name@example.com" />
                                                <label htmlFor="floatingEmail">Email address</label>
                                            </div>

                                            <div className="d-flex gap-2 flex-md-nowrap flex-lg-nowrap flex-wrap">

                                                <div className="form-floating position-relative border w-100">
                                                    <div className="position-absolute end-0 p-3"
                                                        onClick={() => setShowPassword(prev => !prev)} >
                                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                    </div>
                                                    <input
                                                        name="password"
                                                        value={signupData.password}
                                                        type={showPassword ? "text" : "password"}
                                                        className="form-control"
                                                        id="floatingPassword"
                                                        onChange={onChangeHandler}
                                                        placeholder="Password" />

                                                    <label htmlFor="floatingPassword">Password</label>

                                                </div>
                                                <div className="form-floating position-relative border w-100">
                                                    <div className="position-absolute end-0 p-3"
                                                        onClick={() => setShowConfirmPassword(prev => !prev)} >
                                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                                    </div>
                                                    <input
                                                        name="confirmPassword"
                                                        value={signupData.confirmPassword}
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        className="form-control"
                                                        id="floatingConfirmPassword"
                                                        disabled={status == "loading" ? true : false}
                                                        onChange={onChangeHandler}
                                                        placeholder="Confirm password" />

                                                    <label htmlFor="floatingConfirmPassword">Confirm password</label>

                                                </div>

                                            </div>

                                            <div className="text-end" >
                                                <Link to={""}
                                                    className="text-decoration-none text-danger">
                                                    Forget Password
                                                </Link>
                                            </div>

                                            <div className=" mt-2 d-flex justify-content-center">
                                                <button
                                                    disabled={status == "loading" ? true : false}
                                                    className="btn btn-outline-danger w-75 p-2 fw-semibold ">Signup</button>
                                            </div>
                                        </form>
                                        <div className="text-center mb-2">
                                            <Link to={"/"} className="text-secondary">Login</Link>
                                        </div>
                                    </div>
                                </div>
                                <div>

                                </div>


                            </div>
                        </div>
                    </section >
                }
            </main >
        </>
    )

}
export default Signup
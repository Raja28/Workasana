import { Link, useNavigate, } from "react-router-dom"
import { asanaLogo } from "../assets/images";
import { useEffect, useState } from "react"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { login, resetAuthSlice, sendOTP, setUserData } from "../features/authSlice";
import toast from "react-hot-toast";
import { setUser } from "../features/userSlice";
// import Footer from "../components/Footer";

function Login() {

    const [formData, setFormData] = useState({ email: "", password: "" })
    const [showPassword, setShowPassword] = useState(false)

    const { userData, status } = useSelector(state => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (status === "success") {
            // dispatch(setUser(userData))
            navigate("/dashboard")
            dispatch(setUser())
            dispatch(resetAuthSlice())
        }

    }, [status])

    function onChangeHandler(e) {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function handlerOnSubmit(e) {
        e.preventDefault()

        if (!formData.email || !formData.password) {
            console.log(formData);

            toast.error("All Feilds Required")
            return
        }
        dispatch(login(formData))

        setFormData({
            email: "",
            password: ""
        })
    }

    return (
        <>
            {/* <main className="w-100  mt-5" >
                <section>
                    <div className=" container " >
                        <div className="row d-flex flex-column align-items-center vh-100">
                            <div className="col-md-5 d-flex flex-column align-items-center mt-3">
                                <img
                                    src={asanaLogo}
                                    alt="asana logo"
                                    className="w-50 "
                                />
                                <div className="border border-secondary border-opacity-25 shadow-sm w-100 rounded mt-4 d-flex flex-column">
                                    <h3 className=" text-center text-warning-emphasis fw-bold">Login</h3>
                                    <form onSubmit={handlerOnSubmit} className="p-4">
                                        <div className="form-floating mb-3">
                                            <input
                                                name="email"
                                                value={formData.email}
                                                type="email"
                                                className="form-control"
                                                id="floatingInput"
                                                onChange={onChangeHandler}
                                                placeholder="name@example.com" />
                                            <label htmlFor="floatingInput">Email address</label>
                                        </div>
                                        <div className="form-floating position-relative border">
                                            <div className="position-absolute end-0 p-3"
                                                onClick={() => setShowPassword(prev => !prev)}>
                                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                            </div>
                                            <input
                                                name="password"
                                                value={formData.password}
                                                type={showPassword ? "text" : "password"}
                                                className="form-control"
                                                id="floatingPassword"
                                                onChange={onChangeHandler}
                                                placeholder="Password" />

                                            <label htmlFor="floatingPassword">Password</label>

                                        </div>
                                        <div className="text-end" >
                                            <Link to={""}
                                                className="text-decoration-none text-danger">
                                                Forget Password
                                            </Link>
                                        </div>

                                        <div className=" my-2 d-flex justify-content-center">
                                            <button className="btn btn-outline-danger w-75 p-2 fw-semibold ">Login</button>
                                        </div>
                                    </form>
                                    <div className="text-center my-2">
                                        <Link to={"/signup"} className="text-secondary">Signup</Link>
                                    </div>
                                </div>
                            </div>
                            <div>

                            </div>


                        </div>
                    </div>
                </section>
            </main> */}
            <main style={{ backgroundImage: 'linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%)' }} >
                <div className="container vh-100 d-flex flex-wrap flex-md-nowrap align-items-center w-100">
                    <section className="w-100 ">
                        <div className=" d-flex flex-column align-items-center align-items-md-start" >
                            <p className="mb-1" style={{ maxWidth: "35%" }}>
                                <img src={asanaLogo} className="w-100 h-100" alt="asana-Logo" />
                            </p>
                            <p className="text-center text-md-start" style={{ fontSize: "12px", maxWidth: "18rem" }}>
                                Streamline your workflow and track progress effortlessly with our all-in-one task management app
                            </p>
                        </div>
                    </section>
                    <section className="mx-2 row col-lg-5 col-md-6 col ">
                        <div className="border border-secondary border-opacity-25 shadow-sm rounded  d-flex flex-column">
                            <h3 className=" text-center text-warning-emphasis fw-bold">Login</h3>
                            <form onSubmit={handlerOnSubmit} className="p-4">
                                <div className="form-floating mb-3">
                                    <input
                                        name="email"
                                        value={formData.email}
                                        type="email"
                                        className="form-control"
                                        id="floatingInput"
                                        onChange={onChangeHandler}
                                        style={{ backgroundImage: 'linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%)' }}
                                        placeholder="name@example.com" />
                                    <label htmlFor="floatingInput text-secondary">Email address</label>
                                </div>
                                <div className="form-floating position-relative border">
                                    <div className="position-absolute end-0 p-3"
                                        onClick={() => setShowPassword(prev => !prev)}>
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </div>
                                    <input
                                        name="password"
                                        value={formData.password}
                                        type={showPassword ? "text" : "password"}
                                        className="form-control"
                                        id="floatingPassword"
                                        onChange={onChangeHandler}
                                        style={{ backgroundImage: 'linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%)' }}
                                        placeholder="Password" />

                                    <label htmlFor="floatingPassword text-secondary">Password</label>

                                </div>
                                {/* <div className="text-end" >
                                    <Link to={""}
                                        className="text-decoration-none text-danger">
                                        Forget Password
                                    </Link>
                                </div> */}

                                <div className=" mt-4 d-flex justify-content-center">
                                    <button className="btn btn-outline-danger w-75 p-2 fw-semibold ">Login</button>
                                </div>
                            </form>
                            <div className="text-center my-2">
                                <Link to={"/signup"} className="text-secondary">Signup</Link>
                            </div>
                        </div>

                    </section>
                </div>
            </main >

        </>
    )

}

export default Login
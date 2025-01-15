import OtpInput from 'react-otp-input';
import Header from '../components/common/Header';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {  resetAuthSlice, sendOTP, setAuthStatus, signup } from '../features/authSlice';
import toast from 'react-hot-toast';
import Loading from './Loading';
import { setUser } from '../features/userSlice';

function VerifyOTP() {

    const [otp, setOtp] = useState('');
    const { status, error, userData } = useSelector(state => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (status === "success" && userData !== null) {
            dispatch(setAuthStatus("idle"))
        }

        if (status === "success" && localStorage.getItem("token")) {
            dispatch(setUser(userData))
            dispatch(resetAuthSlice())
            navigate("/dashboard")
        }
    }, [status])

    function handlerSubmit() {

        if (!otp) {
            toast.error("OTP Required")
            return
        }
        if (otp.split("").length < 4) {
            toast.error("OTP Must Be 4 Digit")
            return
        }

        const { firstName, lastName, email, password, confirmPassword } = userData

        let signupData = { firstName, lastName, email, password, confirmPassword, otp }
        dispatch(signup(signupData))
        setOtp("")
    }



    return (
        <>
            <Header />
            {status === "loading" && <Loading />}
            {status === "error" && <span >{error}</span>}
            {
                status !== "loading" &&
                <main>
                    <section className='vh-100 d-flex justify-content-center align-items-center'>
                        <div className='border border-secondary rounded shadow border-opacity-25' style={{ maxWidth: "21.5rem" }}>
                            <div className=' d-flex flex-column p-2 text-center' >
                                <h3>Verify Email</h3>
                                <div className=''>
                                    Workasana has send mail on {" "}
                                    <span className='fw-semibold'>{userData?.email}</span>,

                                    Enter code below.
                                </div>
                                <div className=' my-3'>
                                    <OtpInput
                                        value={otp}
                                        onChange={setOtp}
                                        numInputs={4}
                                        renderSeparator={<span>-</span>}
                                        renderInput={(props) => <input {...props}
                                            style={{ width: "48px" }}
                                            className="mx-auto rounded text-dark text-center p-1"
                                        />
                                        }

                                    />

                                </div>
                                <div className='d-flex justify-content-between px-2 '>
                                    <Link to={-1} className='text-decoration-none'>Back</Link>
                                    <p onClick={() => dispatch(sendOTP(userData.email))} className='btn text-primary m-0 p-0'>Resend Mail</p>
                                </div>

                                <div>
                                    <button
                                        disabled={status === "loading" ? true : false}
                                        onClick={() => handlerSubmit()}
                                        className='btn btn-warning w-75 mt-3'>
                                        Verify
                                    </button>
                                </div>
                            </div>

                        </div>
                    </section>
                </main>
            }
        </>
    )


}

export default VerifyOTP
import { useEffect } from "react"
import Footer from "../components/common/Footer"
import Header from "../components/common/Header"
import { useDispatch, useSelector } from "react-redux"
import { clearUser } from "../features/userSlice"
import { useNavigate } from "react-router-dom"
import { FaArrowLeftLong } from "react-icons/fa6";

function MyProfile() {
    const { status, user } = useSelector(state => state.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    function logoutHandler() {
        dispatch(clearUser())
        navigate("/dashboard")
    }

    return (
        <>
            <main style={{ marginTop: "2rem", minHeight: "calc(100vh - 5.5rem)" }}>
                <section className="container">
                    <div className="row ">
                        <div
                            onClick={() => navigate("/")}
                            role="button"
                            className="d-flex align-items-center gap-1  "
                        >
                            <span className="border p-1 btn btn-sm bg-info">
                                <FaArrowLeftLong /> Back
                            </span>
                        </div>
                        <div className="col-md-4 mx-auto">
                            <h4 className="text-center">Profile</h4>
                            <div className="card">
                                <div className="p-2 d-flex flex-column align-items-center">

                                    <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
                                    <p><strong>Email:</strong> {user?.email}</p>

                                    <p
                                        onClick={() => logoutHandler()}
                                        className="btn btn-lg- btn-warning">
                                        Logout
                                    </p>

                                </div>
                            </div>


                        </div>
                    </div>
                </section>

            </main>

        </>
    )
}

export default MyProfile
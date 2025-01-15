import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { asanaLogo } from "../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Sidebar from "../core/auth/Sidebar";
import { useFilter } from "../../hooks/useFilter";

function Header() {
    const checkWidth = 825
    const { width } = useWindowDimensions()
    const { user } = useSelector(state => state.user)
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const { filter, setFilter } = useFilter()

    // console.log(user);

    return (
        <>
            <header 
            
            className="border-bottom border-info border-opacity-50 shadow ">

                <nav 
                
                className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container">

                        <Link to={"/dashboard"}
                            className="navbar-brand "
                            style={{ maxWidth: "17%", }}
                        >

                            <img
                                src={asanaLogo}
                                alt="Asana brand"
                                className="w-100 h-100 object-fit-cover "

                            />
                        </Link>

                        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="offcanvas offcanvas-end" id="offcanvasNavbar">

                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">WorkAsana</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>


                            <div className=" d-flex justify-content-end px-4">
                                {
                                    token &&
                                    <>
                                        {width <= checkWidth && <div className="d-flex gap-2 mx-3 my-auto fw-semibold">
                                            <span>{user?.firstName}</span>
                                            <span>{user?.lastName}</span>
                                        </div>}

                                        <Link
                                            to={"/dashboard/profile"}
                                            className=""
                                            style={{ width: "2.5rem" }}>
                                            <img
                                                src={user?.profileImage}
                                                alt="user-image"
                                                className="img-fluid rounded-circle"
                                                height={"20px"}

                                            />
                                        </Link>
                                    </>
                                }

                            </div>

                            <div className="offcanvas-body ">
                                {width <= 825 && <Sidebar setFilter={setFilter} filter={filter} />}
                            </div>


                        </div>

                    </div>
                </nav>
            </header>
        </>
    )
}
export default Header
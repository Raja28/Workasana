import { FaXTwitter } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io";
import { FaSnapchat } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";

function Footer() {
    return (
        <>
            <footer className=" bg-warning mb-none">
                <div className="container py-4 d-flex flex-column justify-content-center ">
                    <div className="d-flex justify-content-center gap-4 fs-4 ">
                        < FaXTwitter />
                        < IoLogoLinkedin />
                        < FaSnapchat />
                        < BsInstagram />
                        < FaFacebook />
                    </div>
                    <div className="d-flex justify-content-center flex-wrap gap-4 fs-5 my-2 ">
                        <div>Home</div>
                        <div>Service</div>
                        <div>About</div>
                        <div>Terms</div>
                        <div>Privacy Policy</div>
                    </div>
                    <div className="d-flex justify-content-center gap-2 ">
                        <span>&copy;</span>
                        <span>Workasana. All rights reserved</span>
                    </div>
                </div>

            </footer>
        </>
    )
}

export default Footer
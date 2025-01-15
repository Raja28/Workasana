import { Outlet } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";


export default function Layout(){
    return(
        <>
        <Header  />
        <Outlet style={{ backgroundImage: 'linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%)' }}/>
        <Footer />
        </>
    )
}
import NavBar from "./Navbar"
import { Link } from "react-router-dom";


export default function Challenge() {




    return (
        <>
        <NavBar/>
        <Link to="/challengecreate" className="btn btn-primary btn-lg w-100 text-center mt-3">Create Challenge</Link>

        </>

        

    )



}
import React from "react"
import NavBar from "./Navbar"
import { Link } from "react-router-dom"

export default function Option() {


  return (
    <>
    <NavBar/>

    <Link to="/trainer" className="btn btn-primary btn-lg w-100 text-center mt-3">Push up counter</Link>
    <Link to="/Squat" className="btn btn-primary btn-lg w-100 text-center mt-3">Squat counter</Link>
    <Link to="/curl" className="btn btn-primary btn-lg w-100 text-center mt-3">Curl counter</Link>
    <Link to="/bicep-curl" className="btn btn-primary btn-lg w-100 text-center mt-3">Bicep Curl counter</Link>

    

  
      
    </>
  )
}
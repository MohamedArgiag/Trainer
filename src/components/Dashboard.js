import React from "react"
import NavBar from "./Navbar"
import { Link } from "react-router-dom"

export default function Dashboard() {


  return (
    <>
    <NavBar/>

    <Link to="/option" className="btn btn-primary btn-lg w-100 text-center mt-3">Choose Exercise</Link>

  
      
    </>
  )
}
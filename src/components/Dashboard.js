import React from "react"
import NavBar from "./Navbar"
import { Link } from "react-router-dom"

export default function Dashboard() {


  return (
    <>
    <NavBar/>

    <Link to="/trainer" className="btn btn-primary btn-lg">Start Exercise</Link>

  
      
    </>
  )
}
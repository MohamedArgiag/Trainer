import React from "react"
import NavBar from "./Navbar"
import { Link } from "react-router-dom"
import "./Options.css"

export default function Option() {


  return (
    <div style={{ justifyContent: "flex-start", flexDirection: "column", display: "flex" }}>
    <NavBar/>




    <div class="card text-white bg-primary mb-3 mt-5">
      <div class="card-body">
      <Link to="/trainer" className="btn btn-primary btn-lg w-100 text-center p-5 ">Push up counter</Link>
      </div>
    </div>

    <div class="card text-white bg-primary mb-3">
      <div class="card-body">
      <Link to="/Squat" className="btn btn-primary btn-lg w-100 text-center p-5">Squat counter</Link>
      </div>
    </div>

    <div class="card text-white bg-primary mb-3">
      <div class="card-body">
      <Link to="/curl" className="btn btn-primary btn-lg w-100 text-center p-5">Curl counter</Link>
      </div>
    </div>

    <div class="card text-white bg-primary mb-3">
      <div class="card-body">
      <Link to="/bicep-curl" className="btn btn-primary btn-lg w-100 text-center p-5">Bicep Curl counter</Link>
      </div>
    </div>


  
      
    </div>
  )
}
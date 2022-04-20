import React, { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import NavBar from "./navbar/Navbar"
import "./Settings.css"

export default function Settings() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      navigate("/login", {replace:true})
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <>
    <NavBar/>

    <h1 className="w-100 text-center mb-5">Profile </h1>

    <div className="friendName">
      <h2 className="friend">
        <strong>Email:  </strong> {currentUser.email}
      </h2>
    </div>

     
    <div className="settingDiv">
      <a href="/update-profile">
        <button className="settingButton">
          Update Password
        </button>
      </a>
    </div>

    <div className="settingDiv">
        <button onClick={handleLogout} className="LogoutButton">
          Log out
        </button>
    </div>

      
    </>
  )
}
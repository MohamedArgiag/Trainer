import React, { useRef } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"
import logo from "../img/logo4.png"
import toast, { Toaster } from "react-hot-toast";

export default function ForgotPassword() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      await resetPassword(emailRef.current.value)
      toast.success("Check your inbox for further instructions");
    } catch {
      toast.error("FAILED TO RESET PASSWORD!!!!");
    }

  }

  return (
    <>
    <Toaster />

    <div className="image">
      <img src={logo} alt="logo"/>
    </div>


    <h2 className="text-center mb-4"><strong>Password Reset</strong></h2>

    <div className="formdiv">
      <div className="title mt-4">
        <h2>Email</h2>
      </div>

      <div className="body">
        <span>
            <input type="email" ref={emailRef} required />
        </span>
      </div>


      <div className="loginDiv">
        <button className="LoginButton" onClick={handleSubmit}>Rest Password</button>
      </div>

      <div className="loginDiv">
        <a href="/login">
          <button className="forgotButton">Log In</button>
        </a>
      </div>
      
    </div>

    <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
    </div>
     
    </>
  )
}
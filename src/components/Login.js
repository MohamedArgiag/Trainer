import React, { useRef } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import logo from "../img/logo4.png"
import toast, { Toaster } from "react-hot-toast";
import './Login.css'

const Login = ()  =>{
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    try {

      await login(emailRef.current.value, passwordRef.current.value)
      navigate("/", {replace:true})
      return
    } catch(e) {
      console.log(e)
      toast.error("INVALID EMAIL OR USERNAME!!!!");
    }
    
  }

  return (
    <>
    
    <div className="image">
      <img src={logo} alt="logo"/>
    </div>
    

    <h2 className="text-center mb-4"><strong>Log In</strong></h2>

    <Toaster />

    <div className="formdiv">
      <div className="title mt-4">
        <h2>Email</h2>
      </div>

      <div className="body">
        <span>
            <input type="email" ref={emailRef} required />
        </span>

      <div className="title">
        <h2>Password</h2>
      </div>

        <span>
            <input type="password" ref={passwordRef} required />
        </span>
      </div>

      <div className="loginDiv">
        <button className="LoginButton" onClick={handleSubmit}>Log In</button>
      </div>

      <div className="loginDiv">
        <a href="/forgot-password">
          <button className="forgotButton">Forgot Password</button>
        </a>
      </div>
      
    </div>

    <div className="w-100 text-center mt-4">
        Need an account? <Link to="/signup">Sign Up</Link>
    </div>

    </>
  )
}

export default Login
import React, { useRef} from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import logo from "../img/logo4.png"
import toast, { Toaster } from "react-hot-toast";
import { db } from "../firebase";

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const navigate = useNavigate()
  
  
  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return toast.error("PASSWORDS DO NOT MATCH!!!!");
    }

    try {
      console.log('redirecting to login')
      const usersCollectionRef = db.collection("users");
      const response = await signup(emailRef.current.value, passwordRef.current.value)
      console.log('redirecting to login')
      await usersCollectionRef.doc(response.user.uid).set({
        email: response.user.email,
        uid: response.user.uid,
        friends: [],
      });
    } catch(e) {
      console.log(e)
      toast.error("Failed to create an account!!!!");
    }

    console.log('redirecting to login')
    navigate("/login") 

  }

  return (
    <>
    <Toaster />

    <div className="image">
      <img src={logo} alt="logo"/>
    </div>

    <h2 className="text-center mb-4"><strong>Create an Account</strong></h2>

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

        <div className="title">
          <h2>Password Confirmation</h2>
        </div>

        <span>
          <input type="password" ref={passwordConfirmRef} required />
        </span>
      </div>


      <div className="loginDiv">
        <button className="LoginButton mb-4" onClick={handleSubmit}>Sign Up</button>
      </div>
    </div>

    <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
    </div>

    </>
  )
}
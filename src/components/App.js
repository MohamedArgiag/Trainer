import React from "react"
import Signup from "./Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import Settings from "./Settings"
import Trainer from "./Trainer"
import Option from "./Options"
import Curl from "./Curl"
import Squat from "./Squat"
import Log from "./Log"
import Friend from "./Friend"
import Challenge from "./Challenge"
import CreateChallenge from "./CreateChallenge"
import BicepCurls from "./BicepCurls.js"
import FriendChallenge from "./FriendChallenge.js"
import Chat from "./Chat.js"

function App() {
  return (
    
      
    <div>

        <Router>
          <AuthProvider>
            <Routes>
              {/* <PrivateRoute exact path="/" component={Dashboard} /> */}
              {/* <PrivateRoute path="/update-profile" component={UpdateProfile} /> */}
              
              <Route exact path="/" element={<PrivateRoute/>}>
                <Route exact path="/" element={<Dashboard/>}/>
              </Route>
              <Route exact path="/update-profile" element={<PrivateRoute/>}>
                <Route exact path="/update-profile" element={<UpdateProfile/>}/>
              </Route>
              <Route path="/signup" element={<Signup/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/forgot-password" element={<ForgotPassword/>} />
              <Route path="/settings" element={<Settings/>} />
              <Route path="/trainer" element={<Trainer/>} />
              <Route path="/option" element={<Option/>} />
              <Route path="/curl" element={<Curl/>} />
              <Route path="/bicep-curl" element={<BicepCurls/>} />
              <Route path="/squat" element={<Squat/>} />
              <Route path="/log" element={<Log/>} />
              <Route path="/friend" element={<Friend/>} />
              <Route path="/challenge" element={<Challenge/>} />
              <Route path="/challengecreate" element={<CreateChallenge/>} />
              <Route path="/friendChallenge" element={<FriendChallenge/>} />
              <Route path="/chat" element={<Chat/>} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    
  )
}

export default App
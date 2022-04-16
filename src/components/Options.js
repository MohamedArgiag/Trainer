import React from "react"
import NavBar from "./Navbar"
import { Link } from "react-router-dom"
import "./Options.css"
import pushup from "../img/Pushups-up.png"
import pushupdown from "../img/Pushups-down.png"
import curl from "../img/curl.jpg"

export default function Option() {


  return (
    <div>
    <NavBar/>

    <div class="row">
      <div id="col1" class="column">
        <h2 class="h2">Push Up</h2>
          <img src={ pushup } alt="..."></img>
        <div className="buttonDivs">
        <a href="/trainer">
        <button class="cybr-btn">
            PUSH UPS<span aria-hidden>_</span>
            <span aria-hidden class="cybr-btn__glitch">PUSH UPS_</span>
            <span aria-hidden class="cybr-btn__tag">R25</span>
          </button>
        </a>
          
        </div>
      </div>


      <div id="col2" class="column">
        <h2 class="h2">Squat</h2>
          <img src={ pushupdown } alt="..."></img>
        <div className="buttonDivs">
        <a href="/Squat">
        <button class="cybr-btn">
            SQUAT_<span aria-hidden>_</span>
            <span aria-hidden class="cybr-btn__glitch">SQUAT_</span>
            <span aria-hidden class="cybr-btn__tag">R25</span>
          </button>
        </a>
        
        </div>
      </div>


      <div id="col3" class="column">
        <h2 class="h2">Bicep Curl</h2>
          <img src={ curl } alt="..."></img>

        <div className="buttonDivs">
          <a href="/bicep-curl">
          <button class="cybr-btn">
            BICEP CURL<span aria-hidden>_</span>
            <span aria-hidden class="cybr-btn__glitch">BICEP CURL_</span>
            <span aria-hidden class="cybr-btn__tag">R25</span>
          </button>
          </a>
        </div>
        
      </div>
    </div>


  
      
    </div>
  )
}
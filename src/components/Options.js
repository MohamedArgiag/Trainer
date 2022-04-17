<<<<<<< HEAD
import React from "react";
import NavBar from "./navbar/Navbar";
import "./Options.css";
import pushup from "../img/Pushups-up.png";
import pushupdown from "../img/Pushups-down.png";
import curl from "../img/curl.jpg";

export default function Option() {
  return (
    <div>
      <NavBar />

      <div className="optionContainer">
        <div className="workoutOption">
          <h2 class="h2">Push Up</h2>
          <img className="workoutImage" src={pushup} alt="..."></img>
          <div class="but">
            <a href="/trainer">PUSH UPS</a>
          </div>
        </div>

        <div className="workoutOption">
          <h2 class="h2">Squat</h2>
          <img className="workoutImage" src={pushupdown} alt="..."></img>
          <div class="but">
            <a href="/Squat">SQUAT</a>
          </div>
        </div>

        <div className="workoutOption">
          <h2 class="h2">Bicep Curl</h2>
          <img className="workoutImage" src={curl} alt="..."></img>

          <div class="but">
            <a href="/bicep-curl">BICEP CURL</a>
          </div>
        </div>
      </div>
    </div>
  );
}
=======
import React from "react"
import NavBar from "./Navbar"
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
        <a class="button" href="/trainer">
          <button class="but">
            PUSH UPS
          </button>
        </a>
          
        </div>
      </div>


      <div id="col2" class="column">
        <h2 class="h2">Squat</h2>
          <img src={ pushupdown } alt="..."></img>
        <div className="buttonDivs">
        <a class="button" href="/Squat">
        <button class="but">
            SQUAT
          </button>
        </a>
        
        </div>
      </div>


      <div id="col3" class="column">
        <h2 class="h2">Bicep Curl</h2>
          <img src={ curl } alt="..."></img>

        <div className="buttonDivs">
          <a class="button" href="/bicep-curl">
          <button class="but">
            BICEP CURL
          </button>
          </a>
        </div>
        
      </div>
    </div>


  
      
    </div>
  )
}
>>>>>>> 347e8eb9f612538c0fca1e6a11e27530125fe1fd

import React from "react";
import NavBar from "./navbar/Navbar";
import "./Options.css";
import pushup from "../img/Pushups-up.png";
import squat from "../img/Squat.PNG";
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
          <img className="workoutImage" src={squat} alt="..."></img>
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

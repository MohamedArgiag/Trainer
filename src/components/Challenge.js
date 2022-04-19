import NavBar from "./navbar/Navbar";
import { Link } from "react-router-dom";
import "./Challenge.css"

export default function Challenge() {
  return (
    <>
      <NavBar />

      <div className="challDiv">
        <a href="challengecreate">
          <button className="ChallButton">
            Create Challenge
          </button>

        </a>
      </div>
      
    </>
  );
}

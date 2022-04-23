import NavBar from "./navbar/Navbar";
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
      <div className="challDiv">
        <a href="pendingchallenge">
          <button className="ChallButton">
            Pending Challenge
          </button>

        </a>
      </div>
      <div className="challDiv">
        <a href="currentchallenge">
          <button className="ChallButton">
            Current Challenges
          </button>

        </a>
      </div>
    </>
  );
}
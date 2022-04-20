import NavBar from "./navbar/Navbar";
import Log from "./Log"
import Myposts from "./Myposts";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown  } from '@fortawesome/free-solid-svg-icons'
import "./Dashboard.css"

export default function Dashboard() {
  const [isActive, setIsActive] = useState(false);
  const [posts, setPosts] = useState("My Posts");
  let content;

  if(posts === "My Posts"){
    content = <Myposts/>;
  }

  if(posts === "Friend Posts"){
    content = <Log/>;
  }

  return (
    <>
      <NavBar />
      <div className="dropdowndiv">
        <div className="dropdownBtn" onClick={(e) => setIsActive(!isActive)}>
          {posts}
          <FontAwesomeIcon  icon={ faAngleDown } color="white" size="1x"></FontAwesomeIcon>
          </div>

          {isActive && (
            <div className="dropdown-content">
            <div className="dropdown-item" onClick={(e) => setPosts("My Posts")}>
              My Posts
            </div>
            <div className="dropdown-item" onClick={(e) => setPosts("Friend Posts")}>
              Friend's Posts
            </div>
          </div>
          )}
      </div>

    {content}

    </>
  );
}


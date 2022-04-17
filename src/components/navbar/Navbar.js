import React from 'react';
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faMedal, faDumbbell, faComments, faAddressBook  } from '@fortawesome/free-solid-svg-icons'
import logo from "../../img/logo4.png"

import { auth } from "../../firebase";


const NavBar= ()  =>{

    return (

      <div className="navContainer">
        <li class='logo'>
          <a href="/">
            <img src={ logo } alt="logo"></img>
          </a>
        </li>

        <li className="navButton">
          <a href="friend">
          <FontAwesomeIcon  icon={ faAddressBook } color="black" size="3x"  ></FontAwesomeIcon>
          </a>
        </li>

        <li className="navButton">
          <a href="chat">
          <FontAwesomeIcon  icon={ faComments } color="black" size="3x"  ></FontAwesomeIcon>
          </a>
        </li>

        <li className="navButton">
          <a href="option">
          <FontAwesomeIcon icon={ faDumbbell } color="black" size="3x"  ></FontAwesomeIcon>
          </a>
        </li>

        <li className="navButton">
          <a href="challenge">
          <FontAwesomeIcon icon={ faMedal } color="black" size="3x"  ></FontAwesomeIcon>
          </a>
        </li>

        <li className="navButton">
          <a href="settings">
            <FontAwesomeIcon  icon={ faGear } color="black" size="3x" ></FontAwesomeIcon>
          </a>
        </li>
      </div>
    )
}

export default NavBar;
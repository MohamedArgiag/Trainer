import React from 'react';
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faMedal, faDumbbell, faComments, faAddressBook  } from '@fortawesome/free-solid-svg-icons'
import logo from "../img/logo4.png"

import { auth } from "../firebase";


const NavBar= ()  =>{

    return (

      <>
      <ul>
        <li class='logo'>
          <a href="/">
            <img src={ logo } alt="logo"></img>
          </a>
        </li>

        <li class='contact'>
          <a href="friend">
          <FontAwesomeIcon icon={ faAddressBook } color="black" size="3x" bounce ></FontAwesomeIcon>
          </a>
        </li>

        <li class='chat'>
          <a href="chat">
          <FontAwesomeIcon icon={ faComments } color="black" size="3x" bounce ></FontAwesomeIcon>
          </a>
        </li>

        <li class='trainer'>
          <a href="option">
          <FontAwesomeIcon icon={ faDumbbell } color="black" size="3x" bounce ></FontAwesomeIcon>
          </a>
        </li>

        <li class='challenge'>
          <a href="challenge">
          <FontAwesomeIcon icon={ faMedal } color="black" size="3x" bounce ></FontAwesomeIcon>
          </a>
        </li>

        <li class='setting'>
          <a href="settings">
            <FontAwesomeIcon icon={ faGear } color="black" size="3x" spin ></FontAwesomeIcon>
          </a>
        </li>
        
      </ul>
      
      
      
        </>
    )
}

export default NavBar;
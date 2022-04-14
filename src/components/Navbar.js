import React from 'react';
import './Navbar.css'
import logo from '../img/logo.png';

const NavBar= ()  =>{

    return (
        <nav class="navbar navbar-expand-lg navbar-dark py-3 fixed-top rounded-bottom"> 
        <div class="container-fluid justify-content-center">
          <a class="navbar-brand mx-5" href="/">
            <img src={ logo } alt='logo'/>
          </a>
            <ul class="navbar-nav me-auto">
              <li class="nav-item mx-3">
                <a class="nav-link" href="log">Feed</a>
              </li>
              <li class="nav-item mx-3">
                <a class="nav-link" href="option">Trainer</a>
              </li>
              <li class="nav-item mx-3">
                <a class="nav-link" href="challenge">Challenge</a>
              </li>
              <li class="nav-item mx-3">
                <a class="nav-link" href="friend">Friend</a>
              </li>
              <li class="nav-item mx-3">
                <a class="nav-link" href="chat">Chat</a>
              </li>
              <li class="nav-item mx-3">
                <a class="nav-link" href="settings">Settings</a>
              </li>
              
              

            </ul>
        </div>
      </nav>
    )
}

export default NavBar;
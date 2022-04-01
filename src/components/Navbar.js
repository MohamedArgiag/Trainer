import React from 'react';
import './Navbar.css'
import handleLogout from './Settings'

const NavBar= ()  =>{

    return (
        <nav class="navbar navbar-expand-lg navbar-dark py-3 fixed-top">
        <div class="container-fluid">
            <ul class="navbar-nav mx-auto ">
            <li class="nav-item mx-3">
                <a class="nav-link" href="/">Home</a>
              </li>
              <li class="nav-item mx-3">
                <a class="nav-link" href="option">Trainer</a>
              </li>
              <li class="nav-item mx-3">
                <a class="nav-link" href="log">Feed</a>
              </li>
              <li class="nav-item mx-3">
                <a class="nav-link" href="friend">Friend</a>
              </li>
              <li class="nav-item mx-3">
                <a class="nav-link" href="challenge">Challenge</a>
              </li>
              <li class="nav-item mx-3">
                <a class="nav-link" href="settings">Settings</a>
              </li>
              <li class="nav-item mx-3">
                <a class="nav-link" href="login" onClick={handleLogout} >Log out</a>
              </li>
              

            </ul>
        </div>
      </nav>
    )
}

export default NavBar;
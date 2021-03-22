import React from 'react';

const Navbar = () => {

  return (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <a className="navbar-item" href="https://baez.us">Elias Baez</a>
      <a role="button" className="navbar-burger" aria-label="menu" data-target="navMenu" aria-expanded="false">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div className="navbar-menu" id="navMenu">
      <div className="navbar-start">
        <a className="navbar-item">
          Home
        </a>

        <a className="navbar-item">
          Contact
        </a>

        <div className="navbar-item has-dropdown is-hoverable">
          <a className="navbar-link">
            Work
          </a>

          <div className="navbar-dropdown">
            <a className="navbar-item">
              Poetry
            </a>
            <a className="navbar-item">
              Code
            </a>
            <a className="navbar-item">
              Prose
            </a>
            <hr className="navbar-divider"/>
              <a className="navbar-item">
                About
              </a>
          </div>
        </div>
      </div>
    
    <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
          <a className="button is-primary">
            <strong>elias@baez.us</strong>
          </a>
          <a className="button is-light">
            Poke
          </a>
        </div>
      </div>
    </div>
    </div>
  </nav>
)}

export default Navbar;
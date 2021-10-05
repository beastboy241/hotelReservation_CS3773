import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import'../css/styles.css';

function NavBar() {
  const [click, setClick] = useState(false);
  const session = UserProfile.getSession();
  console.log(session);
  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            Hotel Resevation
          </NavLink>

                  // Navigation bar //
          <ul className={click ? "nav-menu active" : "nav-menu"}>
          
          <li className="nav-item">
              <NavLink exact to="/" activeClassName="active" className="nav-links" onClick={handleClick}> Home </NavLink>
          </li>

          <li className="nav-item">
              <NavLink exact to="/" activeClassName="active" className="nav-links" onClick={handleClick}> Login </NavLink>
          </li>

          </ul>

        </div>
      </nav>
    </>

  );
}

export default NavBar;

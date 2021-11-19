import React, { useEffect, useState } from "react";
import { MenuItems } from "../pages/MenuItems";
import "../css/Navbar.css";
import session from "./SessionManager";

const Navbar = () => {
  const [state, setState] = useState({ clicked: false });
  const user = session.GetUser();

  const handleClick = () => {
    setState({ clicked: !state.clicked });
  };

  return (
    <nav className="NavbarItems">
      <h2 className="navbar-logo">
        <i className="fas fa-hotel"> </i> Hotel Booking
      </h2>
      <div className="menu-icon" onClick={handleClick}>
        <i className={state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={state.clicked ? "nav-menu active" : "nav-menu"}>
        {MenuItems.map((item, index) => {
          let returnFlag = false;

          if (item.type === "default") {
            returnFlag = true;
          } else {
            if (item.type === "admin" && user.creds === "a") returnFlag = true;
            if (item.type === "logged in" && user.login) returnFlag = true;
            if (item.type === "logged out" && !user.login) returnFlag = true;
          }

          if (returnFlag) {
            return (
              <li key={index}>
                <a className={item.cName} href={item.url}>
                  {item.title}
                </a>
              </li>
            );
          }
        })}
      </ul>
    </nav>
  );
};

export default Navbar;

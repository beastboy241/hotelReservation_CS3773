import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../css/styles.css";

const home = () => {

  return (
    <>
    
    <body>
      
      <div class="home-container">
        <div class="home-title">
          <h1> Welcome to our CS-3773 Hotel Booking!</h1>
          <h2> Great Hotel Booking Site with One-click button is waiting for you.</h2> 
        </div>
        
      </div>
      <footer>
        <div class="home-footer">
          <p>  Copyright © 2021 All right reserved </p>
        </div>
      </footer> 
      
      
    </body>
     
    </>
  );
};

export default home;

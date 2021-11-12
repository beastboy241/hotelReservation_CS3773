import React, { useState, useEffect } from "react";
import Axios from "axios";
import {Amenity} from "../components/AmenityTable";
import "../css/styles.css";
import userProfile from "../userProfile";

const userPage = () => {
  /*let userId = 0;
  Axios.get("http://localhost:3001/session").then(
    (response) => {
      userId = response.userId;
    }
  )*/
  return (
    <>
    
    <body>
      
      <div class="home-container">
        <div class="home-title">
          <h1> {userProfile.getName()} hotel Reservation</h1>
          <h2> hotel</h2> 
        </div>
        
      </div>
      
      
      
    </body>
     
    </>
  );
};

export default userPage;
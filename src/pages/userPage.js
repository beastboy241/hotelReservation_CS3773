import React, { useState, useEffect } from "react";
import Axios from "axios";
import {Amenity} from "../components/AmenityTable";
import "../css/styles.css";
import userProfile from "../userProfile";

const userPage = () => {
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
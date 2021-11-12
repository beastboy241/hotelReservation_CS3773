import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Amenity } from "../components/AmenityTable";
import "../css/styles.css";
//import userProfile from "../userProfile";

const UserPage = () => {
  useEffect(() => {
    Axios.get("http://localhost:3001/session").then((response) => {
      console.log(response);
    });
  }, []);
  return (
    <>
      <body>
        <div class="home-container">
          <div class="home-title">
            <h1> Your hotel Reservation</h1>
            <h2> hotel</h2>
          </div>
        </div>
      </body>
    </>
  );
};

export default UserPage;

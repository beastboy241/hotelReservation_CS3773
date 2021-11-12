import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Amenity } from "../components/AmenityTable";
import "../css/styles.css";
import axios from "axios";
//import userProfile from "../userProfile";

axios.defaults.withCredentials = true;

const UserPage = () => {
  useEffect(() => {
    Axios.get("http://localhost:3001/session", { withCredentials: true }).then(
      (response) => {
        console.log(response.data);
      }
    );
  }, []);
  return (
    <>
      <div class="home-container">
        <div class="home-title">
          <h1> Your hotel Reservation</h1>
          <h2> hotel</h2>
        </div>
      </div>
    </>
  );
};

export default UserPage;

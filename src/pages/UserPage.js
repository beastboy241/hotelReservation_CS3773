import React, { useState, useEffect } from "react";
import { Amenity } from "../components/AmenityTable";
import "../css/styles.css";
import session from "../components/SessionManager";

const UserPage = () => {
  const user = session.GetUser();

  return (
    <>
      <div class="home-container">
        <div class="home-title">
          <h1> {user.email} Your hotel Reservation</h1>
          <h2> hotel</h2>
        </div>
      </div>
    </>
  )
};

export default UserPage;

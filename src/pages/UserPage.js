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
          <h1> Welcome {user.email}!</h1>
          <h1>
            <a
              href="http://localhost:3000/account/edit"
              style={{ "text-decoration": "none" }}
            >
              Enter profile page for user/admin {user.id}
            </a>
          </h1>
        </div>
      </div>
    </>
  );
};

export default UserPage;

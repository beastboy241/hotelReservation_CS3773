import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Amenity } from "../components/AmenityTable";
import "../css/styles.css";
import axios from "axios";

axios.defaults.withCredentials = true;

const UserPage = () => {
  const [userId, setId] = useState(0);
  const [creds, setCreds] = useState('');
  const [user, setUser] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/session", { withCredentials: true }).then(
      (response) => {
        setId(response.data.id);
        setCreds(response.data.type);
      }
    );
  }, []);

  return (
    <>
      <div class="home-container">
        <div class="home-title">
          <h1> {userId} Your hotel Reservation</h1>
          <h1><a href="http://localhost:3000/account/edit" style={{"text-decoration":"none"}}>Enter profile page for user/admin {userId}</a></h1>
        </div>
      </div>
    </>
  );
};

export default UserPage;

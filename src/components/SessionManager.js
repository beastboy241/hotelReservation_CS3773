import React, { useState, useEffect } from "react";
import Axios from "axios";

Axios.defaults.withCredentials = true;

async function set(state) {
  await Axios.post("http://localhost:3001/session/login", state, {
    withCredentials: true,
  });
}

function GetUser() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/session/fetch", {
      withCredentials: true,
    }).then((response) => {
      setUser(response.data);
      //console.log("Response: ", response.data);
      //console.log("User: ", user);
    });
  }, []);

  return user;
}

export default { set, GetUser };

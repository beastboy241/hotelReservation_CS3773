import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../css/styles.css";
import session from "../components/SessionManager";



const Users = () => {  
  const user = session.GetUser();
  const [sessionFlag, setSession] = useState(false);
  const [userList, setUserList] = useState([]);
  const [userListDefault, setUserListDefault] = useState([]);

  const updateInput = async () => {
    let input = document.getElementById("input").value.toLowerCase();
    const filtered = userListDefault.filter((user) => {
      return (user.firstName.toLowerCase() + " " + user.lastName.toLowerCase()).includes(input)
          || user.email.toLowerCase().includes(input)
          || user.phone.toString().includes(input)
          || user.id.toString().includes(input)
          || user.type.toLowerCase().includes(input);
    });
    setUserList(filtered);
  };

  const getAllUsers = () => {
    Axios.get("http://localhost:3001/get/users", {
    }).then((response) => {
      setUserListDefault(response.data);
      setUserList(response.data);
    });
  };

  const updateUser = async () => {
    const filtered = userListDefault.filter((user) => {
      if(document.getElementById("userCheck").checked && document.getElementById("adminCheck").checked)
        return user.type === "USER" || user.type === "ADMIN";
      else if(document.getElementById("userCheck").checked)  
        return user.type === "USER";
      else if(!document.getElementById("userCheck").checked && document.getElementById("adminCheck").checked)
        return user.type === "ADMIN";
      else return true;
    });
    setUserList(filtered);
  };

  const updateAdmin = async () => {
    const filtered = userListDefault.filter((user) => {
      if(document.getElementById("adminCheck").checked && document.getElementById("userCheck").checked)
        return user.type === "ADMIN" || user.type === "USER";
      else if(document.getElementById("adminCheck").checked)
        return user.type === "ADMIN";
      else if(!document.getElementById("adminCheck").checked && document.getElementById("userCheck").checked)
        return user.type === "USER";
      else return true;
    });
    setUserList(filtered);
  };
  
  useEffect(() => {
    getAllUsers();
  }, []);


if (user.login) {
    if (!sessionFlag) {
      setSession(true);
    }
    if(user.creds === "a") {
      return (
        <>
          <div class="home-container">
            <div class="home-title">
                <h1>User List</h1>
            </div>
          </div>
          
          <div className="search_section">
            <input
              className="searchBar"
              type="search"
              placeholder={"search user..."}
              id="input"
              onChange={updateInput}
            />
          </div>
          <div className="container grid-2">
            <div className="column-1">
              <table>
                <tr>
                  <td>
                    <label>
                      <input type="checkbox" id="userCheck" onClick={updateUser} /> User
                    </label>
                  </td>
                  <td>
                    <label>
                      <input type="checkbox" id="adminCheck" onClick={updateAdmin} /> Admin
                    </label>
                  </td>
                </tr>
              </table>
            </div>
            </div>
           {userList.map((currentUser) => {
               if(currentUser.type === "u")
                   currentUser.type = "USER";
               else if(currentUser.type === "a")
                   currentUser.type = "ADMIN"
                return (
                  <a
                    href={"http://localhost:3000/users/" + currentUser.id}
                    style={{ textDecoration: "none" }}
                    key={currentUser.id}
                  >
                    <div className="hotels">
                      <h4>{currentUser.firstName + " " + currentUser.lastName}</h4>
                      <h6>USER ID: {currentUser.id}</h6>
                      <h6>EMAIL: {currentUser.email}</h6>
                      <h6>PHONE: {currentUser.phone}</h6>
                      <h6>{currentUser.type + " ACCOUNT"}</h6>
                    </div>
                  </a>
                );
              })}
          </>
        );
    } else return null;
  } else return null;
};

export default Users;
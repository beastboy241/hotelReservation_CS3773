import React from "react";
import Axios from "axios";
import "../css/styles.css";
import session from "../components/SessionManager";

//Axios.defaults.withCredentials = true;

const CreateUser = () => {
  const user = session.GetUser();

  // For admin page, creates normal user account or admin account
  const createUser = async (name, email, phone, pass, type) => {
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      phone.trim() === "" ||
      pass.trim() === "" ||
      type.trim() === ""
    ) {
      alert("Some fields are empty");
      return;
    }
    console.log(name, email, phone, pass, type);
    if (type === "User") type = "u";
    else type = "a";
    const fName = name.split(" ").slice(0, -1).join(" ");
    const lName = name.split(" ").slice(-1).join(" ");
    await Axios.post("http://localhost:3001/login/create", {
      firstName: fName,
      lastName: lName,
      email: email,
      phoneNumber: phone,
      password: pass,
      creds: type,
    }).then((response) => {
      console.log(response);
      document.getElementById("createName").value = "";
      document.getElementById("createEmail").value = "";
      document.getElementById("createPhone").value = "";
      document.getElementById("createPass").value = "";
      document.getElementById("createUser").textContent = "Created!";
      document.getElementById("createUser").style.backgroundColor = "#4ad9e4";
      setTimeout(() => {
        document.getElementById("createUser").textContent = "Create User";
      }, 3000);
    });
  };

  // User account page
  if (user.creds === "a") {
    return (
      <>
        <div class="container">
          <div class="home-title">
            <h1>Create New User</h1>
          </div>
          <form
            className="account-form"
            onSubmit={(evt) => evt.preventDefault()}
          >
            <div className="account-form-fields update">
              <h5>Name</h5>
              <input
                id="createName"
                name="createName"
                type="text"
                placeholder="Name"
                required
              />
              <h5>E-mail Address</h5>
              <input
                id="createEmail"
                name="createEmail"
                type="email"
                placeholder="E-mail Address"
                required
              />
              <h5>Phone Number</h5>
              <input
                id="createPhone"
                name="createPhone"
                type="text"
                placeholder="Phone Number"
                required
              />
              <h5>Password</h5>
              <input
                id="createPass"
                name="createPass"
                type="password"
                placeholder="Password"
                required
              />
              <h5>Account Type</h5>
              <select name="selectType" id="selectType">
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <button
              id="createUser"
              className="btn-submit-form"
              type="createUser"
              onClick={(e) => {
                createUser(
                  document.getElementById("createName").value,
                  document.getElementById("createEmail").value,
                  document.getElementById("createPhone").value,
                  document.getElementById("createPass").value,
                  document.getElementById("selectType").value
                );
              }}
            >
              Create User
            </button>
          </form>
        </div>
      </>
    );
  } else return null;
};

export default CreateUser;

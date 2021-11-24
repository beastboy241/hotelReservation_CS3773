import React, { useState } from "react";
import Axios from "axios";
import "../css/styles.css";
import session from "../components/SessionManager";

//Axios.defaults.withCredentials = true;

const ModifyUser = () => {
  const user = session.GetUser();
  const [sessionFlag, setSession] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [repeatPass, setRepeatPass] = useState("");

  // For user page, loads in user information
  const getUser = async (id) => {
    await Axios.post("http://localhost:3001/get/user", { uid: id }).then(
      (response) => {
        setEmail(response.data[0]["email"]);
        setName(
          response.data[0]["firstName"] + " " + response.data[0]["lastName"]
        );
        setPhone(response.data[0]["phone"]);
      }
    );
  };

  // For user and admin page, updates either user's profile or whichever user admin chooses
  const updateUserProfile = async (id, newName, newEmail, newPhone, type) => {
    if (
      newName.trim() === "" ||
      newEmail.trim() === "" ||
      newPhone.length === 0
    ) {
      alert("Some fields are empty");
      return;
    }
    if (type === "Admin") type = "a";
    else type = "u";
    await Axios.post("http://localhost:3001/update/user", {
      uid: id,
      name: newName,
      email: newEmail,
      phone: newPhone,
      creds: type,
    }).then((response) => {
      if (document.getElementById("updateUser") === null) {
        document.getElementById("submit").textContent = "Saved!";
        document.getElementById("submit").style.backgroundColor = "#4ad9e4";
        setTimeout(() => {
          document.getElementById("submit").textContent = "Save Changes";
        }, 3000);
      } else {
        document.getElementById("updateUser").textContent = "Updated!";
        document.getElementById("updateUser").style.backgroundColor = "#4ad9e4";
        setTimeout(() => {
          document.getElementById("updateUser").textContent = "Update User";
        }, 3000);
      }
      
      if(user.id === id)
        session.set({id: user.id, email: newEmail, creds: type, login: true});
    });
  };

  // For user page, allows user to update password
  const updateUserPassword = async (id, oldPass, newPass, repeatPass) => {
    if (
      oldPass.trim() === "" ||
      newPass.trim() === "" ||
      repeatPass.trim() === ""
    ) {
      alert("Some fields are empty");
      return;
    }
    await Axios.post("http://localhost:3001/update/password", {
      uid: id,
      old: oldPass,
      update: newPass,
      repeat: repeatPass,
    }).then((response) => {
      document.getElementById("oldPass").value = "";
      document.getElementById("newPass").value = "";
      document.getElementById("repeatPass").value = "";
      document.getElementById("updatePass").textContent = "Updated!";
      document.getElementById("updatePass").style.backgroundColor = "#4ad9e4";
      setTimeout(() => {
        document.getElementById("updatePass").textContent = "Update Password";
      }, 3000);
    });
  };

  // For admin page, loads user information when updating user id field
  // Admin can edit any user's information except password(!) & user id
  const loadUser = async (id) => {
    if (id.trim() === "") {
      alert("Some fields are empty");
      return;
    }
    await Axios.post("http://localhost:3001/get/user", { uid: id }).then(
      (response) => {
        if (response.data[0] === undefined) {
          document.getElementById("updateName").value = "";
          document.getElementById("updateEmail").value = "";
          document.getElementById("updatePhone").value = "";
          document.getElementById("updateType").value = "";
          return null;
        }
        document.getElementById("updateName").value =
          response.data[0]["firstName"].trim() +
          " " +
          response.data[0]["lastName"].trim();
        document.getElementById("updateEmail").value =
          response.data[0]["email"];
        document.getElementById("updatePhone").value =
          response.data[0]["phone"];
        if (response.data[0]["type"] === "a")
          document.getElementById("updateType").value = "Admin";
        else document.getElementById("updateType").value = "User";
      }
    );
  };

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
  if (user.login) {
    if (!sessionFlag) {
      getUser(user.id);
      setSession(true);
    }
    if (user.creds === "u") {
      return (
        <>
          <div class="home-container">
            <div class="home-title">
              <h1>Update User Profile</h1>
            </div>

            <form
              className="account-form"
              onSubmit={(evt) => evt.preventDefault()}
            >
              <div className="account-form-fields update">
                <h5>Name</h5>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="New Name"
                  value={name}
                  onChange={() =>
                    setName(document.getElementById("name").value)
                  }
                  required
                />
                <h5>E-mail Address</h5>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="New E-mail Address"
                  value={email}
                  onChange={() =>
                    setEmail(document.getElementById("email").value)
                  }
                  required
                />
                <h5>Phone Number</h5>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="New Phone Number"
                  value={phone}
                  onChange={() =>
                    setPhone(document.getElementById("phone").value)
                  }
                  required
                />
              </div>
              <button
                id="submit"
                className="btn-submit-form"
                type="submit"
                onClick={(e) => {
                  console.log(user.id);
                  updateUserProfile(
                    user.id,
                    { name }["name"],
                    { email }["email"],
                    { phone }["phone"],
                    "u"
                  );
                }}
              >
                Save Changes
              </button>
            </form>

            <form
              className="account-form"
              onSubmit={(evt) => evt.preventDefault()}
            >
              <div className="account-form-fields update">
                <h5>Old Password</h5>
                <input
                  id="oldPass"
                  name="oldPass"
                  type="text"
                  placeholder="Old Password"
                  onChange={() =>
                    setOldPass(document.getElementById("oldPass").value)
                  }
                  required
                />
                <h5>New Password</h5>
                <input
                  id="newPass"
                  name="newPass"
                  type="text"
                  placeholder="New Password"
                  onChange={() =>
                    setNewPass(document.getElementById("newPass").value)
                  }
                  required
                />
                <h5>Repeat New Password</h5>
                <input
                  id="repeatPass"
                  name="repeatPass"
                  type="text"
                  placeholder="Repeat New Password"
                  onChange={() =>
                    setRepeatPass(document.getElementById("repeatPass").value)
                  }
                  required
                />
              </div>
              <button
                id="updatePass"
                className="btn-submit-form"
                type="updatePass"
                onClick={(e) => {
                  updateUserPassword(
                    user.id,
                    { oldPass }["oldPass"],
                    { newPass }["newPass"],
                    { repeatPass }["repeatPass"]
                  );
                }}
              >
                Update Password
              </button>
            </form>
          </div>
        </>
      );
    }

    // Admin account page
    else if (user.creds === "a") {
      return (
        <>
          <div class="home-container">
            <div class="home-title">
              <h1>Admin Control Panel</h1>
            </div>

            <form
              className="account-form"
              onSubmit={(evt) => evt.preventDefault()}
            >
              <div className="account-form-fields update">
                <h5>User ID</h5>
                <input
                  id="userID"
                  name="userID"
                  type="text"
                  placeholder="User ID"
                  onChange={() =>
                    loadUser(document.getElementById("userID").value)
                  }
                  required
                />
                <h5>Name</h5>
                <input
                  id="updateName"
                  name="updateName"
                  type="text"
                  placeholder="New Name"
                  required
                />
                <h5>E-mail Address</h5>
                <input
                  id="updateEmail"
                  name="updateEmail"
                  type="email"
                  placeholder="New E-mail Address"
                  required
                />
                <h5>Phone Number</h5>
                <input
                  id="updatePhone"
                  name="updatePhone"
                  type="text"
                  placeholder="New Phone Number"
                  required
                />
                <h5>Account Type</h5>
                <select name="updateType" id="updateType">
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <button
                id="updateUser"
                className="btn-submit-form"
                type="updateUser"
                onClick={(e) => {
                  updateUserProfile(
                    document.getElementById("userID").value,
                    document.getElementById("updateName").value,
                    document.getElementById("updateEmail").value,
                    document.getElementById("updatePhone").value,
                    document.getElementById("updateType").value
                  );
                }}
              >
                Update User
              </button>
            </form>

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
    }
  } else return null;
};

export default ModifyUser;

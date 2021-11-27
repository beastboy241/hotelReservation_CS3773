import React, { useState, useEffect } from "react";
import Axios from "axios";
import {Amenity} from "../components/AmenityTable";
import "../css/styles.css";
import session from "../components/SessionManager";



const SingleUser = () => {  
  const user = session.GetUser();
  const [sessionFlag, setSession] = useState(false);
  const [reservationList, setReservationList] = useState([]);
  const [reservationListDefault, setReservationListDefault] = useState([]);
  const [hotelListDefault, setHotelListDefault] = useState();
  const [hotelList, setHotelList] = useState([]);

  const uid = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1);

  
  const fetchData = async () => {
    return await Axios.get("http://localhost:3001/get/hotels").then(
      (response) => {
        setHotelListDefault(response.data);
        setHotelList(response.data);
      }
    );
  };
  
  const getUserReservations = (uid) => {
    return Axios.post("http://localhost:3001/get/reservations", { id: uid }).then(
      (response) => {
        setReservationListDefault(response.data);
        setReservationList(response.data);
      }
    );
  };
  
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

  useEffect(() => {
    
  }, []);


  if (user.login) {
    if (!sessionFlag) {
      fetchData();
      getUserReservations(uid);
      loadUser(uid);
      setSession(true);
    }
    // need to filter box when user has no reservations
    if(user.creds === "a") {
      if(reservationList.length === 0) {
          return (
            <>
              <div class="home-container">
                <div class="home-title">
                    <h1>User Profile</h1>
                </div>
                <form
                  className="account-form"
                  onSubmit={(evt) => evt.preventDefault()}
                >
                  <div className="account-form-fields update">
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
                        uid,
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
              </div>
            </>
          );
        } else {
          return (
            <>
              <div class="home-container">
                <div class="home-title">
                    <h1>User Profile</h1>
                </div>              
                <form
                  className="account-form"
                  onSubmit={(evt) => evt.preventDefault()}
                >
                  <div className="account-form-fields update">
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
                        uid,
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
                </div>
              
              <div className="container">
                <h3>Reservations</h3>
              </div>
              
              
              {reservationList.map((reservation) => {
                  //filtering doesnt work for multiple options :^(
                  for(var i = 0; i < hotelList.length; i++) {
                    let currentHotel = hotelList[i];
                    if(currentHotel.id === reservation.hotel_id) {
                        reservation.start_dt = reservation.start_dt.substring(0, 10);
                        reservation.end_dt = reservation.end_dt.substring(0, 10);
                        if(reservation.type === "s")
                            reservation.type = "Standard";
                        else if(reservation.type === "q")
                            reservation.type = "Queen";
                        else if(reservation.type === "k")
                            reservation.type = "King";
                        return (
                          <a
                            href={"http://localhost:3000/account/" + (reservation.hotel_id * 1000 + reservation.room)}
                            style={{ textDecoration: "none" }}
                            key={reservation.hotel_id * 1000 + reservation.room}
                          >
                            <div className="hotels">
                              <h2>{currentHotel['name']}</h2>
                              <h5>
                                {currentHotel.amenities & Amenity.POOL ? (
                                  <i className="fas fa-water"> Pool </i>
                                ) : (
                                  ""
                                )}
                                {currentHotel.amenities & Amenity.GYM ? (
                                  <i className="fas fa-dumbbell"> Gym </i>
                                ) : (
                                  ""
                                )}
                                {currentHotel.amenities & Amenity.SPA ? (
                                  <i className="fas fa-spa"> Spa </i>
                                ) : (
                                  ""
                                )}
                                {currentHotel.amenities & Amenity.OFFICE ? (
                                  <i className="fas fa-briefcase"> Office </i>
                                ) : (
                                  ""
                                )}
                                {currentHotel.amenities & Amenity.WIFI ? (
                                  <i className="fas fa-wifi"> WiFi </i>
                                ) : (
                                  ""
                                )}
                              </h5>
                              <h4>{reservation.type} Room</h4>
                              <h4>CHECK IN DATE: {reservation.start_dt}</h4>
                              <h4>CHECK OUT DATE: {reservation.end_dt}</h4>
                              <h6>RESERVATION ID: {reservation.hotel_id * 1000 + reservation.room}</h6>
                            </div>
                          </a>
                        );
                      }
                    }
                  })}
                </>
              );
        }
      } else return null;
  } else return null;
};

export default SingleUser;
import React, { useState, useEffect } from "react";
import { Amenity } from "../components/AmenityTable";
import "../css/styles.css";
import session from "../components/SessionManager";
import Axios from "axios";
//import cancelRoom from "./SingleReservation";

const UserPage = () => {
  const user = session.GetUser();
  const [sessionFlag, setSession] = useState(false);
  const [hotelListDefault, setHotelListDefault] = useState();
  const [hotelList, setHotelList] = useState([]);
  const [reservationList, setReservationList] = useState([]);
  const [reservationListDefault, setReservationListDefault] = useState([]);

  const fetchData = async () => {
    return await Axios.get("http://localhost:3001/get/hotels").then(
      (response) => {
        setHotelListDefault(response.data);
        setHotelList(response.data);
      }
    );
  };

  const getUserReservations = (uid) => {
    return Axios.post("http://localhost:3001/get/reservations", {
      id: uid,
    }).then((response) => {
      setReservationListDefault(response.data);
      setReservationList(response.data);
    });
  };

  const updateInput = async () => {
    let input = document.getElementById("input").value.toLowerCase();
    const filteredHotel = hotelListDefault.filter((hotel) => {
      return hotel.name.toLowerCase().includes(input);
    });
    const filteredReservation = reservationListDefault.filter((reservation) => {
      if (input.match(/^(20\d{2})\-(\d{2})\-(\d{2})$/))
        return (
          reservation.start_dt.toString().includes(input) ||
          reservation.end_dt.toString().includes(input)
        );
      else
        return (
          reservation.type.toLowerCase().includes(input) ||
          reservation.id.toString().includes(input) ||
          (reservation.hotel_id * 1000 + reservation.id)
            .toString()
            .includes(input)
        );
    });
    if (filteredHotel.length !== 0) {
      setHotelList(filteredHotel);
      setReservationList(reservationListDefault);
    }
    if (filteredReservation.length !== 0) {
      setReservationList(filteredReservation);
      setHotelList(hotelListDefault);
    }
  };

  useEffect(() => {}, []);

  if (user.login) {
    if (!sessionFlag) {
      fetchData();
      getUserReservations(user.id);
      setSession(true);
    }
    //needs spacing fix for reservation text box
    return (
      <>
        <div class="user-container">
          <div class="user-title">
            <h1> Welcome {user.email}!</h1>

            <h4>
              <button className="edit-btn">
                <a
                  href="http://localhost:3000/account/edit"
                  style={{ "text-decoration": "none", color: "white" }}
                >
                  Edit Profile Information
                </a>
              </button>
            </h4>
          </div>
        </div>

        <div class="reservation-container">
          <div class="reservation-title">
            <h1>Active Reservations:</h1>
          </div>
          <input
            className="searchBar"
            type="search"
            placeholder={"search hotel or reservation..."}
            id="input"
            onChange={updateInput}
          />
        </div>

        {reservationList.map((reservation) => {
          //filtering doesnt work for multiple options :^(
          for (var i = 0; i < hotelList.length; i++) {
            let currentHotel = hotelList[i];
            if (currentHotel.id === reservation.hotel_id) {
              reservation.start_dt = reservation.start_dt.substring(0, 10);
              reservation.end_dt = reservation.end_dt.substring(0, 10);
              if (reservation.type === "s") reservation.type = "Standard";
              else if (reservation.type === "q") reservation.type = "Queen";
              else if (reservation.type === "k") reservation.type = "King";
              return (
                <a
                  href={
                    "http://localhost:3000/account/" +
                    (reservation.hotel_id * 1000 + reservation.id)
                  }
                  style={{ textDecoration: "none" }}
                  key={reservation.hotel_id * 1000 + reservation.id}
                >
                  <div className="hotels">
                    <h2>{currentHotel["name"]}</h2>
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
                    <h6>
                      RESERVATION ID:{" "}
                      {reservation.hotel_id * 1000 + reservation.id}
                    </h6>
                  </div>
                </a>
              );
            }
          }
        })}
      </>
    );
  } else return null;
};

export default UserPage;

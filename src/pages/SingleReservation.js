import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Amenity } from "../components/AmenityTable";
import "../css/styles.css";
import session from "../components/SessionManager";

const SingleReservation = () => {
  const user = session.GetUser();
  const [sessionFlag, setSession] = useState(false);
  const [hotel, setHotel] = useState([]);
  const [reservation, setReservation] = useState([]);
  const [reservationUser, setReservationUser] = useState([]);
  let id = Math.floor(
    window.location.href.substring(window.location.href.lastIndexOf("/") + 1) /
      1000
  );
  let rid = Math.floor(
    window.location.href.substring(window.location.href.lastIndexOf("/") + 1) %
      1000
  );

  const cancelRoom = () => {
    Axios.post("http://localhost:3001/cancel/reservation", {
      reservation: rid,
    }).then((response) => {
      document.getElementById("cancelReservation").textContent =
        "Reservation Canceled!";
      document.getElementById("cancelReservation").style.backgroundColor =
        "#4ad9e4";
      document.getElementById("cancelReservation").disabled = true;
      setTimeout(() => {
        window.history.back();
      }, 500);
    });
  };

  const loadUserInformation = () => {
    Axios.post("http://localhost:3001/get/reservation/user", {
      reservation: rid,
    }).then((response) => {
      setReservationUser(response.data[0]);
    });
  };

  useEffect(() => {
    Axios.post("http://localhost:3001/get/hotel", { hotelId: id }).then(
      (response) => {
        setHotel(response.data[0]);
      }
    );

    Axios.post("http://localhost:3001/get/reservation", {
      reservation: rid,
    }).then((response) => {
      let reservationData = response.data[0];
      reservationData["start_dt"] = reservationData["start_dt"].substring(
        0,
        10
      );
      reservationData["end_dt"] = reservationData["end_dt"].substring(0, 10);
      if (reservationData["type"] === "s") reservationData["type"] = "Standard";
      else if (reservationData["type"] === "q")
        reservationData["type"] = "Queen";
      else if (reservationData["type"] === "k")
        reservationData["type"] = "King";
      setReservation(reservationData);
    });
  }, []);

  if (user.login) {
    if (!sessionFlag) {
      loadUserInformation();
      setSession(true);
    }
    return (
      <div className="singleHotels">
        <h2>{hotel.name}</h2>
        <div align={"center"}>
          {hotel.amenities & Amenity.POOL ? (
            <i className="fas fa-water"> Pool </i>
          ) : (
            ""
          )}
          {hotel.amenities & Amenity.GYM ? (
            <i className="fas fa-dumbbell"> Gym </i>
          ) : (
            ""
          )}
          {hotel.amenities & Amenity.SPA ? (
            <i className="fas fa-spa"> Spa </i>
          ) : (
            ""
          )}
          {hotel.amenities & Amenity.OFFICE ? (
            <i className="fas fa-briefcase"> Office</i>
          ) : (
            ""
          )}
          {hotel.amenities & Amenity.WIFI ? (
            <i className="fas fa-briefcase"> WiFi</i>
          ) : (
            ""
          )}
        </div>

        <h4>
          {reservation.type} Room #{reservation.room}
        </h4>
        <h4>CHECK IN DATE: {reservation.start_dt}</h4>
        <h4>CHECK OUT DATE: {reservation.end_dt}</h4>
        <h6>USER ID: {reservationUser.id}</h6>
        <h6>
          NAME: {reservationUser.firstName + " " + reservationUser.lastName}
        </h6>
        <h6>EMAIL: {reservationUser.email}</h6>
        <h6>PHONE: {reservationUser.phone}</h6>

        <div className="hotelCol-2" id="reserv-btn">
          <button
            id="cancelReservation"
            className="btn-submit-form"
            type="cancelReservation"
            onClick={(e) => {
              cancelRoom();
            }}
          >
            Cancel Reservation
          </button>
        </div>
      </div>
    );
  } else return null;
};

export default SingleReservation;

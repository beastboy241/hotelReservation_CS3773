import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Amenity } from "../components/AmenityTable";
import "../css/styles.css";
import session from "../components/SessionManager";

const HotelReservations = () => {
  const user = session.GetUser();
  const [sessionFlag, setSession] = useState(false);
  const [reservationList, setReservationList] = useState([]);
  const [reservationListDefault, setReservationListDefault] = useState([]);
  const [hotelList, setHotelList] = useState([]);

  let id = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );
  let room = Math.floor(
    window.location.href.substring(window.location.href.lastIndexOf("/") + 1) %
      1000
  );

  const updateInput = async () => {
    let input = document.getElementById("input").value.toLowerCase();
    const filtered = reservationListDefault.filter((reservation) => {
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
            .includes(input) ||
          (id * 1000 + reservation.id).toString().includes(input)
        );
    });
    setReservationList(filtered);
  };

  const fetchData = async () => {
    return await Axios.get("http://localhost:3001/get/hotels").then(
      (response) => {
        setHotelList(response.data);
      }
    );
  };

  const getHotelReservations = (hid) => {
    Axios.post("http://localhost:3001/get/reservations/hotel", {
      hotelId: hid,
    }).then((response) => {
      setReservationListDefault(response.data);
      setReservationList(response.data);
    });
  };

  useEffect(() => {}, []);

  if (user.login) {
    if (!sessionFlag) {
      fetchData();
      getHotelReservations(id);
      setSession(true);
    }
    if (user.creds === "a") {
      return (
        <>
          <div class="user-container">
            <div class="home-title">
              <h1>Reservations</h1>
            </div>

            <div className="search_section">
              <input
                className="searchBar"
                type="search"
                placeholder={"search reservation..."}
                id="input"
                onChange={updateInput}
              />
            </div>
          </div>

          {reservationList.map((reservation) => {
            //filtering doesnt work for multiple options :^(
            let currentHotel = hotelList[id - 1];
            reservation.start_dt = reservation.start_dt.substring(0, 10);
            reservation.end_dt = reservation.end_dt.substring(0, 10);
            if (reservation.type === "s") reservation.type = "Standard";
            else if (reservation.type === "q") reservation.type = "Queen";
            else if (reservation.type === "k") reservation.type = "King";
            return (
              <a
                href={
                  "http://localhost:3000/account/" +
                  (id * 1000 + reservation.id)
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
                      <i className="fas fa-briefcase"> WiFi </i>
                    ) : (
                      ""
                    )}
                  </h5>
                  <h4>
                    {reservation.type} Room #{reservation.room}
                  </h4>
                  <h4>CHECK IN DATE: {reservation.start_dt}</h4>
                  <h4>CHECK OUT DATE: {reservation.end_dt}</h4>
                  <h6>USER ID: {reservation.usr_id}</h6>
                  <h6>RESERVATION ID: {id * 1000 + reservation.id}</h6>
                </div>
              </a>
            );
          })}
        </>
      );
    } else return null;
  } else return null;
};

export default HotelReservations;

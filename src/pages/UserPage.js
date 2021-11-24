import React, { useState, useEffect } from "react";
import { Amenity } from "../components/AmenityTable";
import "../css/styles.css";
import session from "../components/SessionManager";
import Axios from "axios";

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
    return Axios.post("http://localhost:3001/get/reservations", { id: uid }).then(
      (response) => {
        setReservationListDefault(response.data);
        setReservationList(response.data);
      }
    );
  };
  
  const updateInput = async () => {
    let input = document.getElementById("input").value.toLowerCase();
    const filteredHotel = hotelListDefault.filter((hotel) => {
      return hotel.name.toLowerCase().includes(input);
    });
    const filteredReservation = reservationListDefault.filter((reservation) => {
      if(input.match(/^(20\d{2})\-(\d{2})\-(\d{2})$/))
          return reservation.start_dt.toString().includes(input)
          || reservation.end_dt.toString().includes(input);
      else return reservation.type.toLowerCase().includes(input)
          || reservation.room.toString().includes(input)
          || (reservation.hotel_id * 1000 + reservation.room).toString().includes(input);
    });
    if(filteredHotel.length !== 0) {
        setHotelList(filteredHotel);
        setReservationList(reservationListDefault);
    }
    if(filteredReservation.length !== 0) {
        setReservationList(filteredReservation);
        setHotelList(hotelListDefault);
    }
  };
  
  const standardPrice = () => {
    const filtered = hotelListDefault.filter((hotel) => {
      return hotel.standard_price <= 50;
    });
    setHotelList(filtered);
  };
  const luxuryPrice = () => {
    const filtered = hotelListDefault.filter((hotel) => {
      return hotel.standard_price >= 100;
    });
    setHotelList(filtered);
  };

  // Pool chekced
  const updatePool = async () => {
    const filtered = hotelListDefault.filter((hotel) => {
      return hotel.amenities & Amenity.POOL;
    });
    setHotelList(filtered);
  };

  // Gym checked
  const updateGym = async () => {
    const filtered = hotelListDefault.filter((hotel) => {
      return hotel.amenities & Amenity.GYM;
    });
    setHotelList(filtered);
  };

  // Spa checked
  const updateSpa = async () => {
    const filtered = hotelListDefault.filter((hotel) => {
      return hotel.amenities & Amenity.SPA;
    });
    setHotelList(filtered);
  };

  // Office checked
  const updateOffice = async () => {
    const filtered = hotelListDefault.filter((hotel) => {
      return hotel.amenities & Amenity.OFFICE;
    });
    setHotelList(filtered);
  };
  
  
  useEffect(() => {
      
  }, []);
  
  if (user.login) {
    if (!sessionFlag) {
      fetchData();
      getUserReservations(user.id);
      setSession(true);
    }
      if(user.creds === "u") {
          //needs spacing fix for reservation text box
          return (
            <>
              <div class="home-container">
                <div class="home-title">
                  <h1> Welcome {user.email}!</h1>
                  
                  <h4>
                    <a
                      href="http://localhost:3000/account/edit"
                      style={{ "text-decoration": "none", "color":"white"}}
                    >
                      Edit Profile Information
                    </a>
                  </h4>
                </div>
              </div>
              
              <div class="home-container">
                <div class="home-title">
                  <h1>Active Reservations</h1>
                </div>
              </div>
             
              <div className="search_section">
                <input
                  className="searchBar"
                  type="search"
                  placeholder={"search hotel or reservation..."}
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
                      <input type="checkbox" rel="pool" onClick={updatePool} /> Pool
                    </label>
                  </td>
                  <td>
                    <label>
                      <input type="checkbox" rel="gym" onClick={updateGym} /> Gym
                    </label>
                  </td>
                  <td>
                    <label>
                      <input type="checkbox" rel="spa" onClick={updateSpa} /> Spa
                    </label>
                  </td>
                  <td>
                    <label>
                      <input type="checkbox" rel="office" onClick={updateOffice} />{" "}
                      Bussiness Office
                    </label>
                  </td>
                </tr>
              </table>
            </div>
            <div className="column-2">
              <h5>Hotel Reference</h5>
              <button className="btn" onClick={standardPrice}>
                Standard
              </button>
              <button className="btn" onClick={luxuryPrice}>
                Luxury
              </button>
            </div>
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
                              <i className="fas fa-briefcase"> Business Office </i>
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
      } else if(user.creds === "a") {
          return (
            <>
              <div class="home-container">
                <div class="home-title">
                  <h1> Welcome {user.email}!</h1>
                  
                  <h4>
                    <a
                      href="http://localhost:3000/account/edit"
                      style={{ "text-decoration": "none", "color":"white"}}
                    >
                      Admin Control Panel
                    </a>
                  </h4>
                </div>
              </div>
              </>
              );
      } else return null;
  } else return null;
};

export default UserPage;

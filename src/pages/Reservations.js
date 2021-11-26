import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../css/styles.css";
import { Amenity } from "../components/AmenityTable";
import session from "../components/SessionManager";


const Reservations = () => {  
  const user = session.GetUser();
  const [sessionFlag, setSession] = useState(false);
  const [hotelListDefault, setHotelListDefault] = useState();
  const [hotelList, setHotelList] = useState([]);

  const fetchData = async () => {
    return await Axios.get("http://localhost:3001/get/hotels").then(
      (response) => {
        let hotels = response.data;
        Axios.get("http://localhost:3001/get/reservations/all").then(
          (response) => {
            const filtered = hotels.filter((hotel) => {
              return response.data.find(element => {
                return element.hotel_id === hotel.id;
              })
            })
            setHotelList(filtered);
            setHotelListDefault(filtered);
          }
        );
      }
    );
  };
  
  const updateInput = async () => {
    let input = document.getElementById("input").value.toLowerCase();
    const filtered = hotelListDefault.filter((hotel) => {
      return hotel.name.toLowerCase().includes(input);
    });
    setHotelList(filtered);
  };

  useEffect(() => {
    fetchData();
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
                <h1>Hotel List</h1>
            </div>
          </div>
          <div className="search_section">
                <input
                  className="searchBar"
                  type="search"
                  placeholder={"search hotel..."}
                  id="input"
                  onChange={updateInput}
                />
          </div>
          
           {hotelList.map((hotel) => {
                return (
                  <a
                    href={"http://localhost:3000/reservations/" + hotel.id}
                    style={{ textDecoration: "none" }}
                    key={hotel.id}
                  >
                    <div className="hotels">
                      <h4>{hotel.name}</h4>
                      <h5>
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
                          <i className="fas fa-briefcase"> Office </i>
                        ) : (
                          ""
                        )}
                        {hotel.amenities & Amenity.WIFI ? ( 
                          <i className="fas fa-wifi"> WiFi </i>
                        ) : (
                          ""
                        )}
                      </h5>
                    </div>
                  </a>
                );
              })}

          </>
        );
    } else return null;
  } else return null;
};

export default Reservations;
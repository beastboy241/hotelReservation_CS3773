import Axios from "axios";
import React, { useState, useEffect } from "react";
import _searchBar from "../components/searchBar";
import "../css/styles.css";
import { Amenity } from "../components/AmenityTable";
import "../pages/DayPicker.jsx";
import { useScrollTrigger } from "@material-ui/core";
import session from "../components/SessionManager";

//import { render } from "@testing-library/react";
// import { setConstantValue } from "typescript";

const Hotels = () => {
  const user = session.GetUser();
  const [hotelListFiltered, setHotelListFiltered] = useState([]);
  const [hotelListDefault, setHotelListDefault] = useState([]);
  const [hotelList, setHotelList] = useState([]);
  const [filter, setFilter] = useState(false);

  const fetchData = async () => {
    return await Axios.get("http://localhost:3001/get/hotels").then(
      (response) => {
        setHotelListDefault(response.data);
        setHotelList(response.data);
        setFilter(response.data);
      }
    );
  };

  const updateInput = async (ref) => {
    const filtered = hotelListDefault.filter((hotel) => {
      return hotel.name
        .toLowerCase()
        .includes(ref.target._valueTracker.getValue().toLowerCase());
    });

    setHotelList(filtered);
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

  const [searchAmenities, setAmenities] = useState(0);
  const updateAmenity = async (ref) => {
    const amenity = await new Promise((resolve, reject) => {
      switch (ref.target.attributes.rel.value) {
        case "pool":
          return resolve(Amenity.POOL);
          break;
        case "gym":
          return resolve(Amenity.GYM);
          break;
        case "spa":
          return resolve(Amenity.SPA);
          break;
        case "office":
          return resolve(Amenity.OFFICE);
          break;
        case "wifi":
          return resolve(Amenity.WIFI);
          break;
      }
    });

    const filtered = hotelListDefault.filter((hotel) => {
      return (
        (hotel.amenities & (searchAmenities ^ amenity)) ==
        (searchAmenities ^ amenity)
      );
    });

    setAmenities(searchAmenities ^ amenity);
    setHotelList(filtered);
  };

  const handleRedirect = () => {
    window.location.replace("http://localhost:3000/hotels/create");
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div class="user-container">
        <div class="home-title">
          <h1>Hotel List</h1>
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
      </div>

      <div className="slim-container grid-2">
        <div className="column-1">
          <table>
            <tr>
              <td>
                <label>
                  <input type="checkbox" rel="pool" onClick={updateAmenity} />{" "}
                  Pool
                </label>
              </td>
              <td>
                <label>
                  <input type="checkbox" rel="gym" onClick={updateAmenity} />{" "}
                  Gym
                </label>
              </td>
              <td>
                <label>
                  <input type="checkbox" rel="spa" onClick={updateAmenity} />{" "}
                  Spa
                </label>
              </td>
              <td>
                <label>
                  <input type="checkbox" rel="office" onClick={updateAmenity} />{" "}
                  Office
                </label>
              </td>
              <td>
                <label>
                  <input type="checkbox" rel="wifi" onClick={updateAmenity} />{" "}
                  WiFi
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

      {hotelList.map((hotel) => {
        return (
          <a
            href={"http://localhost:3000/hotels/" + hotel.id}
            style={{ textDecoration: "none" }}
            key={hotel.id}
          >
            <div className="hotels">
              <h2>{hotel.name}</h2>
              <img>{hotel.hotel_image}</img>
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
                  <i className="fas fa-wifi"> Wifi</i>
                ) : (
                  ""
                )}
              </h5>
            </div>
          </a>
        );
      })}

      {user.login ? (
        user.creds === "a" ? (
          <div style={{ textAlign: "center" }}>
            <button className="btn-submit-form" onClick={handleRedirect}>
              <h3>New Hotel</h3>
            </button>
          </div>
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </>
  );
};
export default Hotels;

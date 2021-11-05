import Hero from "../components/Hero";
import Axios from "axios";
import React, { useState, useEffect } from "react";
import _searchBar from "../components/searchBar";
import "../css/styles.css";

const Hotels = () => {
  const [input, setInput] = useState("");
  const [hotelListDefault, setHotelListDefault] = useState();
  const [hotelList, setHotelList] = useState([]);

  const fetchData = async () => {
    return await Axios.get("http://localhost:3001/api/get/hotels").then(
      (response) => {
        setHotelListDefault(response.data);
        setHotelList(response.data);
      }
    );
  };

  const updateInput = async () => {
    setInput(document.getElementById("input").value);
    console.log("Got Here");
    const filtered = hotelListDefault.filter((hotel) => {
      return hotel.name.toLowerCase().includes(input.toLowerCase());
    });
    //setInput(input);
    setHotelList(filtered);
  };

  useEffect(() => {
    fetchData();
  }, []);

  {
    /*Amenities are a single int value decoded bitwise
    1000 or 8 is the Pool
    0100 or 4 is the Gym
    0010 or 2 is the Spa
    0001 or 1 is the Business Office
          
    You can get whatever amenity you are looking for by using bitwise AND*/
  }

  return (
    <>
      <h1 className="hotelTitle">Hotel List </h1>
      <input className="searchBar" id="input" onChange={updateInput} />
      {hotelList.map((val) => {
        return (
          <a
            href={"http://localhost:3000/hotels/" + val.id}
            style={{ textDecoration: "none" }}
            key={val.id}
          >
            <div className="hotels">
              <h2>{val.name}</h2>
              <h5>
                {val.amenities & 8 ? <i className="fas fa-water"></i> : ""}
                {val.amenities & 4 ? <i className="fas fa-dumbbell"></i> : ""}
                {val.amenities & 2 ? <i className="fas fa-spa"></i> : ""}
                {val.amenities & 1 ? <i className="fas fa-briefcase"></i> : ""}
              </h5>
            </div>
          </a>
        );
      })}
    </>
  );
};
export default Hotels;

import Axios from "axios";
import React, { useState, useEffect } from "react";
import _searchBar from "../components/searchBar";
import "../css/styles.css";
import {Amenity} from "../components/AmenityTable";

const Hotels = () => {
  const [input, setInput] = useState("");
  const [hotelListDefault, setHotelListDefault] = useState();
  const [hotelList, setHotelList] = useState([]);

  const [filter, setFilter] = useState();

  const fetchData = async () => {
    return await Axios.get("http://localhost:3001/get/hotels").then(
      (response) => {
        setHotelListDefault(response.data);
        setHotelList(response.data);
        setFilter(response.data);

      }
    );

  };

  const updateInput = async () => {
    setInput(document.getElementById("input").value);
    console.log("Got Here");
    const filtered = hotelListDefault.filter((hotel) => {
      return hotel.name.toLowerCase().includes(input.toLowerCase());
    });
    
    setHotelList(filtered);
  };

// Pool chekced
const updatePool= async () => {
  setFilter(document.getElementById("input").value);
  console.log("Got Here");
  const filtered = hotelListDefault.filter((hotel) => {

    return hotel.amenities & Amenity.POOL;
  });
    setHotelList(filtered);
  
}
  
// Gym checked
  const updateGym = async () => {
    setFilter(document.getElementById("input").value);
    console.log("Got Here");
    const filtered = hotelListDefault.filter((hotel) => {

      return hotel.amenities & Amenity.GYM;
    });
      setHotelList(filtered);
    
  }

// Spa checked
const updateSpa= async () => {
  setFilter(document.getElementById("input").value);
  console.log("Got Here");
  const filtered = hotelListDefault.filter((hotel) => {

    return hotel.amenities & Amenity.SPA;
  });
    setHotelList(filtered);
  
}
// Office checked
const updateOffice= async () => {
  setFilter(document.getElementById("input").value);
  console.log("Got Here");
  const filtered = hotelListDefault.filter((hotel) => {

    return hotel.amenities & Amenity.OFFICE;
  });
    setHotelList(filtered);
  
}

  useEffect(() => {
    fetchData();
  }, []);

  
  return (
    <>

      <div className="search_section">
        <input className="searchBar" type="search" placeholder={"search hotel..."} id="input" onChange={updateInput} />
      

        <div className="checkbox">
          <table>
            <tr>
          <td> 
            <label><input type="checkbox" rel="pool" onClick={updatePool}/>Pool</label></td>
          <td> 
          <label><input type="checkbox" rel="gym" onClick={updateGym}/>Gym</label></td> 
          <td> 
          <label><input type="checkbox" rel="spa" onClick={updateSpa}/>Spa</label></td> 
          <td> 
          <label><input type="checkbox" rel="office" onClick={updateOffice}/>Bussiness Office</label></td> 
            </tr>
          </table>
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
                          {hotel.amenities & Amenity.POOL ? <i className="fas fa-water"> Pool </i>: ""}
                          {hotel.amenities & Amenity.GYM ? <i className="fas fa-dumbbell"> Gym </i> : ""}
                          {hotel.amenities & Amenity.SPA ? <i className="fas fa-spa"> Spa </i> : ""}
                          {hotel.amenities & Amenity.OFFICE ? <i className="fas fa-briefcase"> Business Office </i> : ""}
                        </h5>
                        
                        
              </div>
          </a>
        );
      })}
    </>
  );
};
export default Hotels;

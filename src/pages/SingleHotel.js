import React, { useState, useEffect } from "react";
import Axios from "axios";
import Hero from "../components/Hero";

const SingleHotel = () => {
  const [hotel, setHotel] = useState([]);
  let id = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );

  useEffect(() => {
    Axios.post("http://localhost:3001/api/get/hotel", { hotelId: id }).then(
      (response) => {
        setHotel(response.data[0]);
      }
    );
  }, []);

  return (
    <div className="hotels">
      <h2>{hotel.name}</h2>
      <div align={"center"}>
        {hotel.amenities & 8 ? <i className="fas fa-water"></i> : ""}
        {hotel.amenities & 4 ? <i className="fas fa-dumbbell"></i> : ""}
        {hotel.amenities & 2 ? <i className="fas fa-spa"></i> : ""}
        {hotel.amenities & 1 ? <i className="fas fa-briefcase"></i> : ""}
      </div>
      <h3 style={{ textAlign: "center" }}>{hotel.rooms} rooms</h3>
      <div style={{ float: "left" }}>
        <h4 style={{ textIndent: 20 }}>Weekday</h4>
        <h5 style={{ textIndent: 40 }}>
          {hotel.standard_price
            ? "Standard: $" + hotel.standard_price.toFixed(2)
            : ""}
        </h5>
        <h5 style={{ textIndent: 40 }}>
          {hotel.queen_price ? "Queen: $" + hotel.queen_price.toFixed(2) : ""}
        </h5>
        <h5 style={{ textIndent: 40 }}>
          {hotel.king_price ? "King: $" + hotel.king_price.toFixed(2) : ""}
        </h5>
      </div>
      <div>
        <h4 style={{ textIndent: 20 }}>Weekend</h4>
        <h5 style={{ textIndent: 40 }}>
          {hotel.standard_price
            ? "Standard: $" +
              (
                hotel.standard_price +
                hotel.standard_price * hotel.weekend_differential
              ).toFixed(2)
            : ""}
        </h5>
        <h5 style={{ textIndent: 40 }}>
          {hotel.queen_price
            ? "Queen: $" +
              (
                hotel.queen_price +
                hotel.queen_price * hotel.weekend_differential
              ).toFixed(2)
            : ""}
        </h5>
        <h5 style={{ textIndent: 40 }}>
          {hotel.king_price
            ? "King: $" +
              (
                hotel.king_price +
                hotel.king_price * hotel.weekend_differential
              ).toFixed(2)
            : ""}
        </h5>
      </div>
    </div>
  );
};

export default SingleHotel;

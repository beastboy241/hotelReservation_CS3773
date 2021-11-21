import React, { useState, useEffect } from "react";
import Axios from "axios";
import {Amenity} from "../components/AmenityTable";
import Select from 'react-select';
import "../css/styles.css";
import DatePicker from "./DayPicker";



const SingleHotel = () => {
  const [hotel, setHotel] = useState([]);
  let id = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );
  const actions = [
    { label: "Standard", value:"s"},
    { label: "Queen", value:"q"},
    { label: "King", value:"k"}
  ];

  const [inputValue, setValue] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);

  const handleInputChange = value => {
    setValue(value);
  }

  const handleChange = value => {
    setSelectedValue(value);
  }

  const handleClick = () => {
    console.log("I've been clicked!", selectedValue, DatePicker.startDay, DatePicker.endDay);
  }

  const filteredActions = hotel => {
    let filtered = actions;
    if(!hotel.standard_price) delete filtered[0];
    if(!hotel.queen_price) delete filtered[1];
    if(!hotel.king_price) delete filtered[2];

    return filtered;
  }

  useEffect(() => {
    Axios.post("http://localhost:3001/get/hotel", { hotelId: id }).then(
      (response) => {
        setHotel(response.data[0]);
      }
    );
  }, []);


  return (
    <>
    <div className="singleHotels">
      <h2>{hotel.name}</h2>
      <div align={"center"}>
        {hotel.amenities & Amenity.POOL ? <i className="fas fa-water"> Pool </i> : ""}
        {hotel.amenities & Amenity.GYM ? <i className="fas fa-dumbbell"> Gym </i> : ""}
        {hotel.amenities & Amenity.SPA ? <i className="fas fa-spa"> Spa </i> : ""}
        {hotel.amenities & Amenity.OFFICE ? <i className="fas fa-briefcase"> Business Office</i> : ""}
      </div>
      <h3>Room availability: {hotel.rooms} rooms </h3>
      <div className="grid-2">
      <div className="hotelCol-1">
        <h4 style={{ textIndent: 20 }}>Weekday</h4>
        <h5 style={{ textIndent: 40 }}>
          {hotel.standard_price ? "Standard: $" + hotel.standard_price.toFixed(2) : ""}
        </h5>
        <h5 style={{ textIndent: 40 }}>
          {hotel.queen_price ? "Queen: $" + hotel.queen_price.toFixed(2) : ""}
        </h5>
        <h5 style={{ textIndent: 40 }}>
          {hotel.king_price ? "King: $" + hotel.king_price.toFixed(2) : ""}
        </h5>
      </div>
      <div className="hotelCol-2">
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
    </div>

    <div className="singleHotels">
      <div className="grid-3">
          <div className="hotelCol-1" id="addon-hotel">
            <h5 className="Type-title"> Room type </h5>
            <Select options={ filteredActions(hotel) } value={ selectedValue} onInputChange={handleInputChange} onChange={handleChange}/>
            <p/>
            <DatePicker/>
          </div>
          <div className="hotelCol-2" id="reserv-btn">
              <button className="reserv-btn" onClick={handleClick}> Reserve </button>
          </div>
      </div>
    </div>

    </>
  );
};

export default SingleHotel;
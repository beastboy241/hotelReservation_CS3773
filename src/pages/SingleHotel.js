import React, { useState, useEffect } from "react";
import Axios from "axios";
import {Amenity} from "../components/AmenityTable";
import Select from 'react-select';
import "../css/styles.css";
import DatePicker from "./DayPicker";
import session from "../components/SessionManager";



const SingleHotel = () => {
  const user = session.GetUser();
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

  const [room, setRoom] = useState();
  const [reservationMade, setReservation] = useState(false);

  const [startDate, setStart] = useState();
  const [endDate, setEnd] = useState();
  const [clickMsg, setMsg] = useState({
    msg: "",
    display: false
  });

  const handleInputChange = value => {
    setValue(value);
  }

  const handleChange = value => {
    setSelectedValue(value);
  }

  const handleClick = async () => {
    if(!selectedValue || !startDate || !endDate){
      setMsg({msg: "Missing input please check and try again...", display: true});
    }
    else if(startDate > endDate){
      setMsg({msg: "Start Date must come before End Date...", display: true});
    }
    else if(reservationMade){
      setMsg({msg: "You've already made a reservation for this hotel; room: " + room, display: true});
    }
    else{

      let reservation ={
        hotelId: id,
        usrId: 0,
        type: selectedValue.value,
        startDt: startDate.toISOString().split('T')[0],
        endDt: endDate.toISOString().split('T')[0]
      }

      if(user.login){
        reservation["usrId"] = user.id;
      }

      await Axios.post("http://localhost:3001/reserve", reservation).then(
        (response) => {
          if(response.data.success){
            setReservation(true);
            setRoom(response.data.room);
          }
          setMsg({msg: response.data.msg, display: true});
        }
      )
    }
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
        <i className="fas fa-wifi"> Wifi</i>
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
            <DatePicker startFunc={setStart} endFunc={setEnd}/>
          </div>
          <div className="hotelCol-2" id="reserv-btn">
              <button className="reserv-btn" onClick={handleClick}> Reserve </button>
          </div>
      </div>
      <p>{clickMsg.display ? clickMsg.msg : ""}</p>
    </div>

    </>
  );
};

export default SingleHotel;
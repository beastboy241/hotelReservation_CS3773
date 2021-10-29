import React, {useState, useEffect} from "react";
import Axios from "axios";
import Hero from "../components/Hero";

const SingleHotel = () => {
    const [hotel, setHotel] = useState([]);
    let id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);

    useEffect(()=>{
        Axios.post('http://localhost:3001/api/get/hotel', {hotelId: id}).then((response)=> {
          setHotel(response.data);
        });
    }, []);

  return (
    <>
    {hotel.map((val)=>{
      return <div className="hotels">
        <h2 style={{fontWeight: 'bold', float: 'left'}}>{val.name}</h2>

        <div style={{float: 'right'}}>
          {(val.amenities & 8) ? '🏊 ' : ''}
          {(val.amenities & 4) ? '💪 ' : ''}
          {(val.amenities & 2) ? '🧴 ' : ''}
          {(val.amenities & 1) ? '💼 ' : ''}
        </div>
        <br /> <br />
        <h3 style={{textAlign: 'center'}}>{val.rooms} rooms</h3>

        <div style={{float: 'left'}}>
        <h4 style={{textIndent: 20}}>Weekday</h4>
        <h5 style={{textIndent: 40}}>{val.standard_price ? "Standard: $" + val.standard_price.toFixed(2) : ""}</h5>
        <h5 style={{textIndent: 40}}>{val.queen_price ? "Queen: $" + val.queen_price.toFixed(2) : ""}</h5>
        <h5 style={{textIndent: 40}}>{val.king_price ? "King: $" + val.king_price.toFixed(2) : ""}</h5>
        </div>

        <div>
        <h4 style={{textIndent: 20}}>Weekend</h4>
        <h5 style={{textIndent: 40}}>{val.standard_price ? "Standard: $" + (val.standard_price + val.standard_price*val.weekend_differential).toFixed(2) : ""}</h5>
        <h5 style={{textIndent: 40}}>{val.queen_price ? "Queen: $" + (val.queen_price + val.queen_price*val.weekend_differential).toFixed(2) : ""}</h5>
        <h5 style={{textIndent: 40}}>{val.king_price ? "King: $" + (val.king_price + val.king_price*val.weekend_differential).toFixed(2) : ""}</h5>
        </div>
      </div>
    })}
    </>
  );  
};

export default SingleHotel;
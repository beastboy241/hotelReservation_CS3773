import Hero from "../components/Hero";
import Axios from "axios";
import React, {useState, useEffect} from "react";


const Hotels = () => {
  
  const [hotelList, setHotelList] = useState([]);
  
  useEffect(()=>{
    Axios.get('http://localhost:3001/api/get/hotels').then((response)=> {
      setHotelList(response.data);
    });
  }, []);

  {/*Amenities are a single int value decoded bitwise
    1000 or 8 is the Pool
    0100 or 4 is the Gym
    0010 or 2 is the Spa
    0001 or 1 is the Business Office
          
    You can get whatever amenity you are looking for by using bitwise AND*/}
  
  return (
    <>
    {hotelList.map((val)=>{
      return <a href={"http://localhost:3000/hotels/" + val.id} style={{textDecoration: 'none'}} key={val.id}>
        <div className="hotels">
        <h2 style={{float: 'left'}}>{val.name}</h2>
        <h5 style={{float: 'right'}}>
          {(val.amenities & 8) ? '🏊 ' : ''}
          {(val.amenities & 4) ? '💪 ' : ''}
          {(val.amenities & 2) ? '🧴 ' : ''}
          {(val.amenities & 1) ? '💼 ' : ''}
        </h5>
        <br /><br />
        </div></a>
       })}
    </>

  );
};
export default Hotels;
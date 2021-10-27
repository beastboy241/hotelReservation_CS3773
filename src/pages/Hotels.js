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
      return <div class="hotels">
         <h2>{val.name}</h2>
         <h4>{val.amenities ? 'Amenities: ' : ''}</h4>
         <h1 style={{textIndent: 40}} >
           {(val.amenities & 8) ? '🏊 ' : ''}
           {(val.amenities & 4) ? '💪 ' : ''}
           {(val.amenities & 2) ? '🧴 ' : ''}
           {(val.amenities & 1) ? '💼 ' : ''}
         </h1>
         <h4>Rooms: {val.rooms}</h4>
         <h4>Pricing:</h4>
         <p style={{textIndent: 60}}>{val.standard_price ? 'Standard - $' : ''}{val.standard_price}</p>
         <p style={{textIndent: 60}}>{val.queen_price ? 'Queen    - $' : ''}{val.queen_price}</p>
         <p style={{textIndent: 60}}>{val.king_price ? 'King     - $' : ''}{val.king_price}</p>
         <p style={{textIndent: 60}}>Weekend Differential: %{val.weekend_differential*100}</p>
         <p></p>
         </div>
       })}
    </>

  );
};
export default Hotels;
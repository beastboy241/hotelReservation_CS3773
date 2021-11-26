import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Amenity } from '../components/AmenityTable';
import "../css/styles.css";

export function CreateHotel(){

    const [newAmenities, setAmenities] = useState(0);
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
      setAmenities(newAmenities ^ amenity);
    }

    const [msg, setMsg] = useState("");
    const createHotel = () => {
      let hotel = {
        name : document.getElementById("name").value,
        rooms: document.getElementById("rooms").value,
        amenities: newAmenities,
        standard: document.getElementById("standard_price").value,
        queen: document.getElementById("queen_price").value,
        king: document.getElementById("king_price").value,
        differential: document.getElementById("weekend_differential").value
      }

      if(hotel.standard <= 0)
        hotel.standard = null;
      
      if(hotel.queen <= 0)
        hotel.queen = null;

      if(hotel.king <= 0)
        hotel.king = null;
      
      if(hotel.differential <= 0)
        hotel.differential = null;

      Axios.post("http://localhost:3001/create/hotel", hotel).then(
        (response) => {
          if(response.data.success){
            setMsg(response.data.msg);
            setTimeout(() => {
              window.history.back();
            }, 500);
          }
        }
      )
    }
   
    return (
        <>
          <div class="home-container">
            <div class="home-title">
              <h1>Create Hotel</h1>
            </div>
            <form
              className="account-form"
              onSubmit={(evt) => evt.preventDefault()}
            >
            <input 
            type="text" 
            id="name" 
            className='form-control' 
            placeholder='Hotel name'
            required/>

            <input 
            type="number" 
            id="rooms"
            min="1"
            className='form-control' 
            placeholder='Number of rooms'
            required/>

            <input 
            type="number"
            step="0.01"
            min="0"
            id="standard_price" 
            className='form-control' 
            placeholder='Standard price'
            />

            <input 
            type="number"
            step="0.01"
            min="0"
            id="queen_price" 
            className='form-control' 
            placeholder='Queen price'
            />

            <input 
            type="number"
            step="0.01"
            min="0"
            id="king_price"
            className='form-control'
            placeholder='King price'
            />
           
            <input 
            type="number"
            step="0.01"
            min="0"
            id="weekend_differential" 
            className='form-control' 
            placeholder='Weekend Differential'
            required/>

            <label>Pool</label>
            <input 
            type="checkbox"
            onClick={updateAmenity}
            rel="pool" 
            id="pool" 
            />         
           
            <label>Gym</label>
            <input 
            type="checkbox"
            onClick={updateAmenity} 
            rel="gym"
            id="gym" 
            />         
           
            <label>Spa</label> 
            <input 
            type="checkbox"
            onClick={updateAmenity}
            rel="spa" 
            id="spa"
            />                        
                     
            <label>Office</label>
            <input 
            type="checkbox"
            onClick={updateAmenity}
            rel="office"
            id="office"
            />
                  
            <label>Wifi</label>
            <input 
            type="checkbox"
            onClick={updateAmenity}
            rel="wifi" 
            id="wifi"
            />
          </form>
            <div>
              <button
                id="updateHotel"
                className="btn-submit-form"
                type="updateHotel"
                onClick={createHotel}
              >
                {msg ? msg : "Create Hotel"}
              </button>
            </div>
          </div>
        </>
    )
    }
    export default CreateHotel;





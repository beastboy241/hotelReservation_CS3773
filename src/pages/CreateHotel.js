import React, { Component , useState} from 'react';
import "../css/styles.css";
import SingleHotel from './SingleHotel';

export function CreateHotel(){
   
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
            required/>

            <input 
            type="number"
            step="0.01"
            min="0"
            id="queen_price" 
            className='form-control' 
            placeholder='Queen price'
            required/>

            <input 
            type="number"
            step="0.01"
            min="0"
            id="king_price"
            className='form-control'
            placeholder='King price'
            required/>
           
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
            name="pool" 
            id="pool" 
            />         
           
            <label>Gym</label>
            <input 
            type="checkbox" 
            name="gym" id="gym" 
            />         
           
            <label>Spa</label> 
            <input 
            type="checkbox"
            name="spa" 
            id="spa"
            />                        
                     
            <label>Office</label>
            <input 
            type="checkbox"
            name="office"
            id="office"
            />
                  
            <label>Wifi</label>
            <input 
            type="checkbox"
            name="wifi" 
            id="wifi"
            />
          </form>
            <div>
              <button
                id="updateHotel"
                className="btn-submit-form"
                type="updateHotel"
                onClick={(e) => {
                  CreateHotel(
                    document.getElementById("name").value,
                    document.getElementById("rooms").value,
                    document.getElementById("standard_price").value,
                    document.getElementById("queen_price").value,
                    document.getElementById("king_price").value,
                    document.getElementById("weekend_differential").value

                  );
                }}
              >
                Create Hotel
              </button>
            </div>
          </div>
        </>
    )
    }
    export default CreateHotel;





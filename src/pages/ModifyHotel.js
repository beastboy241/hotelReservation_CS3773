import React, { useState } from "react";
import Axios from "axios";
import "../css/styles.css";
import session from "../components/SessionManager";
const ModifyHotel = () => {

      return (
        <>
          <div class="home-container">
            <div class="home-title">
              <h1>Admin Control Panel</h1>
            </div>
            <form
              className="account-form"
              onSubmit={(evt) => evt.preventDefault()}
            >
              <div className="account-form-fields update">
                <h5>Hotel Name</h5>
                <input
                  id="updatedName"
                  name="updatedName"
                  type="text"
                  placeholder="updatedName"
                  required
                />
                <h5>Rooms</h5>
                <input
                  id="updateRooms"
                  name="updateRooms"
                  type="text"
                  placeholder="New room number"
                  required
                />
                <h5>Standard price </h5>
                <input
                  id="updateStandard"
                  name="updateStandard"
                  type="number"
                  placeholder="New standard price"
                  required
                />
               <h5>Queen price </h5>
                <input
                  id="updateQueen"
                  name="updateQueen"
                  type="number"
                  placeholder="New queen price"
                  required
                />
                <h5>King price </h5>
                <input
                  id="updateKing"
                  name="updateKing"
                  type="number"
                  placeholder="New King price"
                  required
                />
                <h5> Weekend differential </h5>
                <input
                  id="update_weekend_differentiale"
                  name="update_weekend_differentiale"
                  type="number"
                  placeholder="New weekend differential"
                  required
                />

                <div className="col-md-5">
                <label>Pool</label>
                <input 
                type="checkbox" 
                className='form-control' 
                name="pool" 
                id="pool" 
                checked={this.state.pool}
                onChange={this.handleInputChange} />         
           
                <label>Gym</label>
                <input 
                type="checkbox" 
                className='form-control' 
                name="gym"
                id="gym" 
                checked={this.state.gym}
                onChange={this.handleInputChange} />         
           
                <label>Spa</label> 
                <input 
                type="checkbox" 
                className='form-control' 
                name="spa" 
                id="spa" 
                checked={this.state.spa} 
                onChange={this.handleInputChange} />                        
                     
                 <label>Office</label>
                 <input 
                 type="checkbox" 
                 className='form-control' 
                 name="office" id="office" 
                 name="office" 
                 checked={this.state.office} 
                 onChange={this.handleInputChange} />
                  
                <label>Wifi</label>
                <input 
                type="checkbox" 
                className='form-control' 
                name="wifi" id="wifi" 
                checked={this.state.wifi}
                onChange={this.handleInputChange} />  
            </div>  

        </div>
              <button
                id="updateHotel"
                className="btn-submit-form"
                type="updateHotel"
                onClick={(e) => {
                  ModifyHotel(
                    document.getElementById("updatedName").value,
                    document.getElementById("updateRooms").value,
                    document.getElementById("updateStandard").value,
                    document.getElementById("updateQueen").value,
                    document.getElementById("updateKing").value,
                    document.getElementById("update_weekend_differentiale").value

                  );
                }}
              >
                Update Hotel
              </button>
            </form>
          </div>
        </>
      );
    }

export default ModifyHotel;

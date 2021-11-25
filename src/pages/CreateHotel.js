import React, { Component , useState} from 'react';
import "../css/styles.css";

export function CreateHotel(){

    const[name, sethotelname] = useState('')
    const[rooms, setroomnums] = useState()
    const[standardPrice, settandardPrice]= useState()
    const[queenPrice, setqueenPrice]= useState()
    const[kingPrice, setkingPrice]= useState()
   
    return (
        <div className='row'>
           
            <div className= "col-md-5">
            <input 
            type="text" 
            id="name" 
            className='form-control' 
            placeholder='Hotel name'
            value={this.state.name} 
            onChange={this.handleChange} required/>

            <input 
            type="rooms" 
            id="rooms" 
            className='form-control' 
            placeholder='Number of rooms'
            value={this.state.rooms} 
            onChange={this.handleChange} required/>

            <input 
            type="number" 
            id="standard_price" 
            className='form-control' 
            placeholder='Standard price'
            value={this.state.standard_price}
            onChange={this.handleChange} required/>

            <input 
            type="number" 
            id="queen_price" 
            className='form-control' 
            placeholder='Queen price'
            value={this.state.queen_price}
             onChange={this.handleChange} required/>

            <input 
            type="number"
            id="king_price"
            className='form-control'
            placeholder='King price'
            value={this.state.king_price} 
            onChange={this.handleChange} required/>
           
           <input 
           type="number" 
            id="weekend_differentiale" 
            className='form-control' 
            placeholder='weekend_differentiale'
            value={this.state.weekend_differentiale} 
            onChange={this.handleChange} required/>

            </div>
            
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
                name="gym" id="gym" 
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
                
                <div className="text-right">
                <button className='btn btn-primary mt-2'>Create Hotel</button>
            </div>
            </div>  

        </div>
    )
    }
    export default CreateHotel;





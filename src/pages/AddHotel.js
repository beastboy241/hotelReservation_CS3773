import React, { useState, useEffect } from 'react';
import Axios from "axios";
// import Hotels from "./Hotels";
// import {Amenity} from "../components/AmenityTable";

const AddHotel = () => {
  const [hotel, setCheckout] = useState([]);
  let id = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );

  useEffect(() => {
    Axios.post("http://localhost:3001/api/get/hotel", { hotelId: id }).then(
      (response) => {
        setCheckout(response.data[0]);
      }
    );
  }, []);

return (
  <>
  <div className="checkout_container" key={hotel.id}>
    {hotel.amenities}
  </div>



</>
)
};

export default AddHotel;
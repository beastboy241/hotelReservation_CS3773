import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../css/styles.css";
import { Amenity } from "../components/AmenityTable";

const ModifyHotel = () => {
  const id = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );
  const [hotel, setHotel] = useState([]);

  const handleChange = (ref) => {
    const { id, value } = ref.target;
    setHotel((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

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

    let newAmenity = hotel.amenities ^ amenity;

    setHotel((prevState) => ({
      ...prevState,
      amenities: newAmenity,
    }));
  };

  const [msg, setMsg] = useState("");
  const modifyHotel = () => {
    if (hotel.standard_price === 0) {
      setHotel((prevState) => ({
        ...prevState,
        standard_price: null,
      }));
    }

    if (hotel.queen_price === 0) {
      setHotel((prevState) => ({
        ...prevState,
        queen_price: null,
      }));
    }

    if (hotel.king_price === 0) {
      setHotel((prevState) => ({
        ...prevState,
        king_price: null,
      }));
    }

    if (hotel.weekend_differential === 0) {
      setHotel((prevState) => ({
        ...prevState,
        weekend_differential: null,
      }));
    }

    Axios.post("http://localhost:3001/update/hotel", hotel).then((response) => {
      if (response.data.success) {
        setMsg(response.data.msg);
        setTimeout(() => {
          window.location.replace("http://localhost:3000/hotels");
        }, 500);
      }
    });
  };

  useEffect(() => {
    const id = window.location.href.substring(
      window.location.href.lastIndexOf("/") + 1
    );

    Axios.post("http://localhost:3001/get/hotel", { hotelId: id }).then(
      (response) => {
        setHotel(response.data[0]);
      }
    );
  }, []);

  return (
    <>
      <div class="home-container">
        <div class="home-title">
          <h1>Update Hotel</h1>
        </div>
        <form className="account-form" onSubmit={(evt) => evt.preventDefault()}>
          <input
            type="text"
            id="name"
            className="form-control"
            placeholder="Hotel name"
            value={hotel.name}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            id="rooms"
            min="1"
            className="form-control"
            placeholder="Number of rooms"
            value={hotel.rooms}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            step="0.01"
            min="0"
            id="standard_price"
            className="form-control"
            placeholder="Standard price"
            value={hotel.standard_price}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            step="0.01"
            min="0"
            id="queen_price"
            className="form-control"
            placeholder="Queen price"
            value={hotel.queen_price}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            step="0.01"
            min="0"
            id="king_price"
            className="form-control"
            placeholder="King price"
            value={hotel.king_price}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            step="0.01"
            min="0"
            id="weekend_differential"
            className="form-control"
            placeholder="Weekend Differential"
            value={hotel.weekend_differential}
            onChange={handleChange}
            required
          />

          <label>Pool</label>
          <input
            type="checkbox"
            rel="pool"
            id="pool"
            checked={hotel.amenities & Amenity.POOL}
            onClick={updateAmenity}
          />

          <label>Gym</label>
          <input
            type="checkbox"
            rel="gym"
            id="gym"
            checked={hotel.amenities & Amenity.GYM}
            onClick={updateAmenity}
          />

          <label>Spa</label>
          <input
            type="checkbox"
            rel="spa"
            id="spa"
            checked={hotel.amenities & Amenity.SPA}
            onClick={updateAmenity}
          />

          <label>Office</label>
          <input
            type="checkbox"
            rel="office"
            id="office"
            checked={hotel.amenities & Amenity.OFFICE}
            onClick={updateAmenity}
          />

          <label>Wifi</label>
          <input
            type="checkbox"
            rel="wifi"
            id="wifi"
            checked={hotel.amenities & Amenity.WIFI}
            onClick={updateAmenity}
          />
        </form>
        <div>
          <button
            id="updateHotel"
            className="btn-submit-form"
            type="updateHotel"
            onClick={modifyHotel}
          >
            {msg ? msg : "Update Hotel"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ModifyHotel;

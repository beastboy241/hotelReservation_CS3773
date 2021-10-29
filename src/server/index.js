const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'admin',
    password: 'password',
    database: 'hoteldb',
});

app.use(cors());
app.use(express.json());

app.get("/api/get/hotels", (req, res) =>{
    const sqlSelect = "SELECT id, name, amenities FROM hotel";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

app.post("/api/get/hotel", (req, res) =>{
    const id = req.body.hotelId;

    const sqlSelect = "SELECT * FROM hotel WHERE id= ?";
    db.query(sqlSelect, id, (err, result) => {
        res.send(result); 
    });
});

app.listen(3001, () => {
    console.log("running on port 3001");
});
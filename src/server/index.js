const express = require('express');
const bodyParser = require('body-parser');
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
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get/hotels", (req, res) =>{
    const sqlSelect = "SELECT * FROM hotel";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

app.listen(3001, () => {
    console.log("running on port 3001");
});
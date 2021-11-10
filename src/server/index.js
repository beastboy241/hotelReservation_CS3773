const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql");
const fs = require("fs");

const key = "zGhwe72jg0";

const db = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "password",
  database: "hoteldb",
  multipleStatements: true,
});

app.use(cors());
app.use(express.json());

/* Database */

app.get("/api/build", (req, res) => {
  const createHotel = fs
    .readFileSync("./db_scripts/createHotel.sql")
    .toString();
  const createReservations = fs
    .readFileSync("./db_scripts/createReservations.sql")
    .toString();
  const populateHotel = fs
    .readFileSync("./db_scripts/populateHotel.sql")
    .toString();
  const createUser = fs.readFileSync("./db_scripts/createUser.sql").toString();

  let success = true;
  db.query(createHotel, (err, result) => {
    console.log(result);
    if (err) {
      success = false;
      res.send("Error building: " + err);
    }
  });

  db.query(createReservations, (err, result) => {
    console.log(result);
    if (err) {
      success = false;
      res.send("Error building: " + err);
    }
  });

  db.query(populateHotel, (err, result) => {
    console.log(result);
    if (err) {
      success = false;
      res.send("Error building: " + err);
    }
  });

  db.query(createUser, (err, result) => {
    console.log(result);
    if (err) {
      success = false;
      res.send("Error building: " + err);
    }
  });

  if (success) {
    res.send("Success! Database built.");
  }
});

/* Login/SignUp */

app.post("/api/login/create", (req, res) => {
  const fname = req.body.firstName;
  const lname = req.body.lastName;
  const email = req.body.email;
  const phone = req.body.phone;
  const pass = req.body.password;

  const sqlInsert =
    "INSERT INTO user (firstName, lastName, email, phone, password) VALUES (?, ?, ?, ?, ENCRYPT(?,?))";
  db.query(
    sqlInsert,
    [fname, lname, email, phone, key, pass],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Success!");
      }
    }
  );
});

app.post("/api/login/verify", (req, res) => {
  const email = req.body.email;
  let userPass = req.body.password;
  let sqlPass = "";

  const sqlSelect = "SELECT password FROM user WHERE email=?";
  const sqlPassEncrypt = "SELECT ENCRYPT(?, ?) as password";

  db.query(sqlSelect, email, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    sqlPass = result[0].password;
  });

  db.query(sqlPassEncrypt, [key, userPass], (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    userPass = result[0].password;
  });

  if (sqlPass === userPass) {
    res.send(True);
  } else {
    res.send(False);
  }
});

/* Users */

app.get("/api/get/users", (req, res) => {
  const sqlSelect =
    "SELECT id, firstName, lastName, email, phone, type FROM user";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

/* Hotel Data */

app.get("/api/get/hotels", (req, res) => {
  const sqlSelect = "SELECT id, name, amenities, standard_price FROM hotel";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/api/get/hotel", (req, res) => {
  const id = req.body.hotelId;
  const sqlSelect = "SELECT * FROM hotel WHERE id= ?";

  db.query(sqlSelect, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

/* Reservations */

app.post("/api/reserve", (req, res) => {
  const hotel_id = req.body.hotelId;
  const usr_id = req.body.userId;
  const room_type = req.body.type;
  const start_dt = red.body.startDt;
  const end_dt = req.body.endDt;

  const sqlRoomsQuery = "SELECT rooms FROM hotel WHERE id = ?";
  const sqlSearch =
    "SELECT start_dt, end_dt FROM reservations WHERE hotel_id = ? AND room = ?";
  const sqlInsert =
    "INSERT INTO reservations (hotel_id, usr_id, room, type, start_dt, end_dt) VALUES (?, ?, ?, ?, ?, ?)";

  let rooms = 0;
  db.query(sqlRoomsQuery, hotel_id, (err, result) => {
    rooms = result[0].rooms;

    if (err) {
      console.log(err);
      return;
    }
  });

  let roomToReserve = -1;
  let reservedRooms = [];
  for (let i = 1; i <= rooms; i++) {
    let conflict = false;
    db.query(sqlSearch, [hotel_id, i], (err, result) => {
      reservedRooms = result;

      if (err) {
        console.log(err);
        return;
      }
    });

    if (!reservedRooms[0]) {
      roomToReserve = i;
      break;
    }

    reservedRooms.map((room) => {
      if (
        (room.start_dt < start_dt && start_dt < room.endDt) ||
        (room.start_dt < end_dt && end_dt < room.end_dt) ||
        (start_dt < room.start_dt && end_dt > room.end_dt)
      ) {
        conflict = true;
      }
    });

    if (!conflict) {
      roomToReserve = i;
      break;
    }
  }

  if (roomToReserve > 0) {
    db.query(
      sqlInsert,
      [hotel_id, usr_id, roomToReserve, room_type, start_dt, end_dt],
      (err, result) => {
        if (err) {
          res.send("Failed to book reservation: System error - " + err);
        } else {
          res.send("Reservation made! Your room is #" + roomToReserve);
        }
      }
    );
  } else {
    res.send(
      "Failed to book reservation: All rooms occupied for requested timespan"
    );
  }
});

app.post("/api/get/reservations", (req, res) => {
  const user_id = req.body.id;
  const selectSql =
    "SELECT hotel_id, room, type, start_dt, end_dt FROM reservations WHERE usr_id = ?";
  db.query(selectSql, user_id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/api/get/reservations/all", (req, res) => {
  const selectSql = "SELECT * FROM reservations";
  db.query(selectSql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
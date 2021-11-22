const express = require("express");
const cors = require("cors");
const app = express();
const session = require("express-session");
const mysql = require("mysql");
const fs = require("fs");
const bcrypt = require("bcrypt");

const db = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "password",
  database: "hoteldb",
  multipleStatements: true,
});

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  }),
  express.json(),
  express.urlencoded({ extended: true }),
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: false,
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: false,
    },
  })
);

/* Database */

app.get("/build", (req, res) => {
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

  const testData = fs.readFileSync("./db_scripts/testData.sql").toString();

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

  db.query(testData, (err, result) => {
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

app.post("/login/create", async (req, res) => {
  const fname = req.body.firstName;
  const lname = req.body.lastName;
  const email = req.body.email;
  const phone = req.body.phoneNumber;
  const creds = req.body.creds;

  try {
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const sqlInsert =
      "INSERT INTO user (firstName, lastName, email, phone, password, type) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(
      sqlInsert,
      [fname, lname, email, phone, hashedPass, creds],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Failed to Create Account: " + err);
        } else {
          res.send({
            msg: "Account Successfully Created",
            id: result.insertId,
          });
        }
      }
    );
  } catch {
    res.status(500).send();
  }
});

app.post("/login/verify", async (req, res) => {
  const email = req.body.email;
  const userPass = req.body.password;
  let sqlPass = "";
  let userId = 0;
  let type = "";

  const sqlSelect = "SELECT id, password, type FROM user WHERE email=?";

  db.query(sqlSelect, email, async (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database Query Failed " + err);
      return;
    }
    if (result[0] == null) {
      res.status(404).send("User does not exist");
      return;
    }
    userId = result[0].id;
    type = result[0].type;
    sqlPass = result[0].password;

    try {
      if (await bcrypt.compare(userPass, sqlPass.toString())) {
        res.send({ msg: "Login Success!", id: userId, type: type });
      } else {
        res.send("Login Failed: Incorrect password");
      }
    } catch {
      console.log("try failed");
      res.status(500).send();
    }
  });
});

/* Session */
app.post("/session/login", (req, res) => {
  req.session.user = {
    id: req.body.id,
    email: req.body.email,
    creds: req.body.creds,
    login: true,
  };
  //console.log("Session set", req.session.id);
  res.send(req.session.id);
});

app.get("/session/fetch", (req, res) => {
  const defaultUser = {
    id: 0,
    email: "",
    creds: "u",
    login: false,
  };
  //console.log("Session get", req.session.id);
  if (req.session.user) {
    res.send(req.session.user);
  } else {
    res.send(defaultUser);
  }
});

app.get("/session/logout", (req, res) => {
  req.session.destroy();
});

/* Users */

app.get("/get/users", (req, res) => {
  const sqlSelect =
    "SELECT id, firstName, lastName, email, phone, type FROM user";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

/* Retrieves user by id */

app.post("/get/user", (req, res) => {
  const userId = req.body.uid;
  const sqlSelect =
    "SELECT email, firstName, lastName, phone, type FROM user WHERE id= ?";
  db.query(sqlSelect, userId, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

/* Updates user information */

app.post("/update/user", (req, res) => {
  const firstName = req.body.name.split(" ").slice(0, -1).join(" ");
  const lastName = req.body.name.split(" ").slice(-1).join(" ");
  const sqlSelect =
    "UPDATE user SET firstName=?, lastName=?, email=?, phone=?, type=? WHERE id=?";
  db.query(
    sqlSelect,
    [
      firstName,
      lastName,
      req.body.email,
      req.body.phone,
      req.body.creds,
      req.body.uid,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.send(result);
      }
    }
  );
});

/* Updates user password */

app.post("/update/password", async (req, res) => {
  const oldPass = req.body.old;
  const newPass = req.body.update;
  const repeatPass = req.body.repeat;
  let hashedOldPass = "";
  const hashedNewPass = await bcrypt.hash(newPass, 10);
  const sqlPass = "SELECT password FROM user WHERE id=?";
  const sqlUpdate = "UPDATE user SET password=? WHERE id=?";

  if (newPass !== repeatPass) {
    console.log("no match");
    return;
  }

  db.query(sqlPass, req.body.uid, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      hashedOldPass = result[0].password;
    }
  });

  if (bcrypt.compare(oldPass, hashedOldPass)) {
    db.query(sqlUpdate, [hashedNewPass, req.body.uid], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.send(result);
      }
    });
  }
});

/* Hotel Data */

app.get("/get/hotels", (req, res) => {
  const sqlSelect = "SELECT id, name, amenities, standard_price FROM hotel";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/get/hotel", (req, res) => {
  const id = req.body.hotelId;
  const sqlSelect = "SELECT * FROM hotel WHERE id= ?";

  db.query(sqlSelect, id, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

/* Reservations */

app.post("/reserve", async (req, res) => {
  const hotel_id = req.body.hotelId;
  const usr_id = req.body.usrId;
  const room_type = req.body.type;
  const start_dt = req.body.startDt;
  const end_dt = req.body.endDt;

  const sqlRoomsQuery = "SELECT rooms FROM hotel WHERE id = ?";
  const sqlSearch =
    "SELECT start_dt, end_dt FROM reservations WHERE hotel_id = ? AND room = ?";
  const sqlInsert =
    "INSERT INTO reservations (hotel_id, usr_id, room, type, start_dt, end_dt) VALUES (?, ?, ?, ?, ?, ?)";

  const rooms = await new Promise((resolve, reject) => {
    db.query(sqlRoomsQuery, hotel_id, (err, result) => {
      if (err) return reject(err);
      return resolve(result[0].rooms);
    });
  });

  let roomToReserve = -1;
  let reservedRooms = [];
  for (let i = 1; i <= rooms; i++) {
    let conflict = false;
    reservedRooms = await new Promise((resolve, reject) => {
      db.query(sqlSearch, [hotel_id, i], (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });

    if (!reservedRooms[0]) {
      roomToReserve = i;
      break;
    }

    reservedRooms.map((room) => {
      let roomStart = room.start_dt.toISOString().split("T")[0];
      let roomEnd = room.end_dt.toISOString().split("T")[0];

      if (
        roomStart === start_dt ||
        end_dt === roomEnd ||
        (roomStart < start_dt && start_dt < roomEnd) ||
        (roomStart < end_dt && end_dt < roomEnd) ||
        (start_dt < roomStart && end_dt > roomEnd)
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
    await db.query(
      sqlInsert,
      [hotel_id, usr_id, roomToReserve, room_type, start_dt, end_dt],
      (err, result) => {
        if (err) {
          res.send({
            msg: "Failed to book reservation: System error - " + err,
            success: false,
          });
        } else {
          res.send({
            msg: "Reservation made! Your room is #" + roomToReserve,
            success: true,
            room: roomToReserve,
          });
        }
      }
    );
  } else {
    res.send({
      msg: "Failed to book reservation: All rooms occupied for requested timespan",
      success: false,
    });
  }
  //res.send({msg: "", success: false});
});

app.post("/get/reservations", (req, res) => {
  const user_id = req.body.id;
  const selectSql =
    "SELECT hotel_id, room, type, start_dt, end_dt FROM reservations WHERE usr_id = ?";
  db.query(selectSql, user_id, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/get/reservations/all", (req, res) => {
  const selectSql = "SELECT * FROM reservations";
  db.query(selectSql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});

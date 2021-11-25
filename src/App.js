import React from "react";
// import { formatDiagnostic } from 'typescript';
import "./css/styles.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import Login from "./pages/Login";
import SingleHotel from "./pages/SingleHotel";
import Error from "./pages/Error";
import AddHotel from "./pages/AddHotel";
import UserPage from "./pages/UserPage";
import Logout from "./pages/Logout";
import ModifyUser from "./pages/ModifyUser";
import SingleReservation from "./pages/SingleReservation";
import Users from "./pages/Users";
import SingleUser from "./pages/SingleUser";
import Reservations from "./pages/Reservations";
import HotelReservations from "./pages/HotelReservations";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CreateHotel from "./pages/CreateHotel";
import ModifyHotel from "./pages/ModifyHotel";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/hotels/" component={Hotels} />
          <Route exact path="/login/" component={Login} />
          <Route exact path="/logout/" component={Logout} />
          <Route exact path="/hotels/:slug" component={SingleHotel} />
          <Route exact path="/account/" component={UserPage} />
          <Route exact path="/account/edit" component={ModifyUser} />
          <Route exact path="/account/:slug" component={SingleReservation} />
          <Route exact path="/users/" component={Users} />
          <Route exact path="/users/:slug" component={SingleUser} />
          <Route exact path="/reservations/" component={Reservations} />
          <Route exact path="/reservations/:slug" component={HotelReservations} />
          <Route component={Error} />
          <Route exact path="/ModifyHotel/" component={ModifyHotel} />

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
 /*
<Route exact path="/CreateHotel/" component={CreateHotel} />
<Route exact path="/ModifyHotel/" component={ModifyHotel} />
*/
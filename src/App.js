import React from "react";
// import { formatDiagnostic } from 'typescript';
import "./css/styles.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import Login from "./pages/Login";
import SingleHotel from "./pages/SingleHotel";
import Error from "./pages/Error";
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
import CreateUser from "./pages/CreateUser";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/hotels/" component={Hotels} />
          <Route exact path="/hotels/create" component={CreateHotel} />
          <Route exact path="/login/" component={Login} />
          <Route exact path="/logout/" component={Logout} />
          <Route exact path="/hotels/:slug" component={SingleHotel} />
          <Route exact path="/hotels/update/:slug" component={ModifyHotel} />
          <Route exact path="/account/" component={UserPage} />
          <Route exact path="/account/edit" component={ModifyUser} />
          <Route exact path="/account/:slug" component={SingleReservation} />
          <Route exact path="/users/" component={Users} />
          <Route exact path="/users/:slug" component={SingleUser} />
          <Route exact path="/create/user" component={CreateUser} />
          <Route exact path="/reservations/" component={Reservations} />
          <Route exact path="/reservations/:slug" component={HotelReservations} />
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
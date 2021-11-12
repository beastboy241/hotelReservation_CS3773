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

import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/hotels/" component={Hotels} />

          <Route exact path="/login/" component={Login} />
          <Route exact path="/hotels/:slug" component={SingleHotel} />
          <Route exact path="/account/" component={UserPage} />
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

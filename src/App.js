import React from 'react';
// import { formatDiagnostic } from 'typescript';
import './components/css/styles.css';
import Navbar from "./components/pages/Navbar";
import Home from "./components/pages/Home";
import Hotels from "./components/pages/Hotels";
import Login from "./components/pages/Login";
import SingleHotel from "./components/pages/SingleHotel";
import Error from "./components/pages/Error";


import { BrowserRouter, Switch, Route} from "react-router-dom";




function App() {
  return (
    <div className="App">
      <Navbar>

      </Navbar>
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/hotels/" component={Hotels} />
        <Route exact path="/login/" component={Login} />
        <Route exact path="/hotels/:slug" component={SingleHotel} />
        <Route component={Error} />
      </Switch>
      </BrowserRouter>
    </div>
  );
}


export default App;

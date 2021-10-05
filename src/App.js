import React, { Component } from 'react';
import './components/css/styles.css';
import NavBar from "./components/pages/NavBar.js";
import Home from "./components/pages/Home.js";

class App extends Component {
  state = {
    data: null,
    session: UserProfile.getSession()
  };


  render() {
   return (
      <>
        <DataProvider>
        <Router>
          <NavBar isLoggedIn = {this.state.isLoggedIn} />

          <div className="Pages">
            <Switch>
              <Route exact path="/"> <Home/> </Route>
              <Route exact path="/profile"> <profile/> </Route>
              <Route exact path="/login"> <login/> </Route>
              <Route exact path="/cart"> <reserve/> </Route>
              <Route exact path="/success"> <success/> </Route>
            </Switch>
          </div>
        </Router>
      </DataProvider>  
      </>
    );
  }

}


export default App;

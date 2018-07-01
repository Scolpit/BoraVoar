import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";

//Routes
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import CarList from "./components/car/CarList";
import CarCreate from "./components/car/CarCreate";
import RideCreate from "./components/ride/RideCreate";
import CarDetails from "./components/car/CarDetails";

import "./App.css";

//Logout on token expire
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="app">
            <Route exact path="/" component={Login} />
            <Route exact path="/Register" component={Register} />
            <Route exact path="/CarList" component={CarList} />
            <Route exact path="/CarDetails/:id" component={CarDetails} />
            <Switch>
              <PrivateRoute exact path="/CarCreate" component={CarCreate} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/RideCreate" component={RideCreate} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

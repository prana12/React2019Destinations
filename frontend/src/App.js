import React, { Component } from "react";
import "./App.css";

import Home from "./components/Home";
import CityList from "./components/CityList";
import CityEdit from "./components/CityEdit";
import CityViewList from "./components/CityViewList";
import CityViewDetails from "./components/CityViewDetails";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

class App extends Component {
  state = {
    isLoading: true,
    citiesTop: []
  };

  async componentDidMount() {
    const response = await fetch("/api/citiesTop");
    const body = await response.json();
    this.setState({ citiesTop: body, isLoading: false });
  }

  render() {
    const { citiesTop, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <CookiesProvider>
        <Router>
          <Switch>
            <Route
              exact={true}
              path="/"
              render={() => <Home citiesTop={citiesTop} />}
            />
            <Route path="/cities" exact={true} component={CityViewList} />
            <Route path="/cities/:id" component={CityViewDetails} />

            <Route path="/citiesAdmin" exact={true} component={CityList} />
            <Route path="/citiesAdmin/:id" component={CityEdit} />
          </Switch>
        </Router>
      </CookiesProvider>
    );
  }
}

export default App;

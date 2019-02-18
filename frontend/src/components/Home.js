import React, { Component } from "react";
import "../App.css";
import AppNavbar from "./AppNavbar";
import HomePageQuote from "./HomePageQuote";
import HomePageCityDiv from "./HomePageCityDiv";
import { Link } from "react-router-dom";
import { Button, Container } from "reactstrap";

class Home extends Component {
  render() {
    return (
      <div>
        <AppNavbar />
        <Container fluid>
          <HomePageQuote />
          <hr />
          <br />
          <h1 style={{ fontFamily: "monospace" }} className="pl-3">
            Top Cities{" "}
            <Button
              color=""
              size="sm"
              tag={Link}
              to="/cities"
              style={{ cursor: "pointer", border: "1px solid #349bd8" }}
            >
              search
            </Button>
          </h1>
          <HomePageCityDiv citiesTop={this.props.citiesTop} />
          {/* <Button color="link">
            <Link to="/cities">More Cities...</Link>
          </Button> */}
          <hr />
          <Button color="link">
            <Link to="/">Find Top Countries...</Link>
          </Button>
        </Container>
      </div>
    );
  }
}

export default Home;

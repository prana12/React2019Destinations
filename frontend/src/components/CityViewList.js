import React, { Component } from "react";
import { Button, Container } from "reactstrap";
import NavBar from "./AppNavbar";
import { Link } from "react-router-dom";
import styled from "styled-components";

class CityViewList extends Component {
  constructor(props) {
    super(props);
    this.state = { cities: [], isLoading: true };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch("api/cities")
      .then(response => response.json())
      .then(data => this.setState({ cities: data, isLoading: false }));
  }

  render() {
    const { cities, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const cityList = cities.map(city => {
      return (
        /* <Card key={city.id} className="lead col-md-4" href="">
          {<img src={city.img} alt={city.name} width="100%" height="92%" />}
          <span className="pull-right">
            {city.rank} {city.name}, {city.country}
          </span>
        </Card> */

        <Card key={city.id} className="p-0 col-md-3">
          <Button
            className="p-0 h-100"
            color="muted"
            tag={Link}
            to={"/cities/" + city.id}
          >
            {<img src={city.img} alt={city.name} width="100%" height="100%" />}
          </Button>
          <span style={{ fontFamily: "monospace" }} className="mx-auto h5">
            {city.rank} {city.name}, {city.country}
          </span>
        </Card>
      );
    });

    return (
      <div>
        <NavBar />
        <Container fluid className="mb-4" style={{ fontFamily: "monospace" }}>
          <h1 className="pl-3">List of Popular Cities</h1>
          {cityList}
        </Container>
      </div>
    );
  }
}

export default CityViewList;

const Card = styled.a`
  //width: 250px;
  //width: 100%;
  height: 400px;
  display: inline-block;
  //border-radius: 3px;
  //text-decoration: none;
  color: #000;
  //margin: 20px 15px;
  box-shadow: 7px 7px 50px -10px rgba(0, 0, 0, 0.5);
  //border: 1px solid #e4c3a9;
  //padding: 0.6em;
  //text-align: justify;
  cursor: pointer;
`;

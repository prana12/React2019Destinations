import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import styled from "styled-components";

class HomePageCityDiv extends Component {
  render() {
    const cityTopList = this.props.citiesTop.map(city => {
      return (
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

    return <div>{cityTopList}</div>;
  }
}

export default HomePageCityDiv;

const Card = styled.div`
  //width: 250px;
  //width: 100%;
  height: 430px;
  display: inline-block;
  //border-radius: 3px;
  //text-decoration: none;
  color: #000;
  //margin: 20px 15px;
  box-shadow: 7px 7px 50px -10px rgba(0, 0, 0, 0.5);
  //border: 1px solid #e4c3a9;
  //padding: 0.6em;
  //text-align: justify;
  //cursor: pointer;
`;

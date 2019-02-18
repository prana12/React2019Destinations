import React, { Component } from "react";
import { Button, ButtonGroup, Container, Table } from "reactstrap";
import NavBar from "./AppNavbar";
import { Link } from "react-router-dom";

class CityList extends Component {
  constructor(props) {
    super(props);
    this.state = { cities: [], isLoading: true };
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch("api/cities")
      .then(response => response.json())
      .then(data => this.setState({ cities: data, isLoading: false }));
  }

  async remove(id) {
    await fetch(`/api/city/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(() => {
      let updatedCities = [...this.state.cities].filter(i => i.id !== id);
      this.setState({ cities: updatedCities });
    });
  }

  render() {
    const { cities, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const cityList = cities.map(city => {
      return (
        <tr key={city.id}>
          <td
            style={{ whiteSpace: "nowrap", fontFamily: "monospace" }}
            className="lead text-right"
          >
            <h4>{city.rank}</h4>
          </td>
          <td>{city.name}</td>
          <td>{city.country}</td>
          <td>{city.capital ? <span>&#10004;</span> : <span>&times;</span>}</td>
          <td>
            <ButtonGroup>
              <Button
                size="md"
                color="primary"
                tag={Link}
                to={"/citiesAdmin/" + city.id}
              >
                Edit
              </Button>
              <Button
                size="md"
                color="danger"
                onClick={() => this.remove(city.id)}
              >
                Delete
              </Button>
            </ButtonGroup>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <NavBar />
        <Container fluid>
          <div className="listTitle">
            <div className="col-sm-2 float-right">
              <span className="lead" style={{ fontSize: "3.2em" }}>
                <i>2019</i>
              </span>
            </div>

            <div className="col-sm-10">
              <span className="h3 btn-block">
                Top Cities around the world recommended by{" "}
                <a
                  style={{ listStyleType: "disc", display: "inline-block" }}
                  href="https://www.lonelyplanet.com/best-in-travel/cities"
                >
                  lonelyplanet{" "}
                </a>
                <Button
                  color="success"
                  size="sm"
                  tag={Link}
                  to="/citiesAdmin/new"
                >
                  Add City
                </Button>
              </span>
            </div>
          </div>

          <Table className="mt-4 table-bordered table-hover">
            <thead>
              <tr>
                <th width="10%" className="text-right">
                  Rank
                </th>
                <th width="20%">Name</th>
                <th width="20%">Location</th>
                <th width="20%">Capital City</th>
                <th width="20%">Actions</th>
              </tr>
            </thead>
            <tbody>{cityList}</tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default CityList;

import React, { Component } from "react";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import NavBar from "./AppNavbar";
import { Link } from "react-router-dom";

class CityEdit extends Component {
  emptyItem = {
    rank: "",
    name: "",
    country: "",
    capital: false,
    summary: "",
    areaInKilometers: "",
    areaInSquareMiles: "",
    populationCount: "",
    populationCountYear: ""
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== "new") {
      const city = await (await fetch(
        `/api/city/${this.props.match.params.id}`
      )).json();
      this.setState({ item: city });
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { item } = this.state;

    await fetch("/api/city", {
      method: item.id ? "PUT" : "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    });
    //this.props.history.push("/cities");
  }

  render() {
    const { item } = this.state;
    const title = <h2>{item.id ? "Edit City" : "Add City"}</h2>;

    return (
      <div>
        <NavBar />
        <Container>
          {title}
          <Form onSubmit={this.handleSubmit}>
            <div className="row">
              <FormGroup className="col-md-6">
                <Label for="name">
                  Name<sup>*</sup>
                </Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={item.name || ""}
                  onChange={this.handleChange}
                  autoComplete="name"
                  disabled={item.id}
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label for="rank">
                  Rank<sup>*</sup>
                </Label>
                <Input
                  type="text"
                  name="rank"
                  id="rank"
                  value={item.rank || ""}
                  onChange={this.handleChange}
                  autoComplete="rank"
                />
              </FormGroup>
            </div>

            <div className="row">
              <FormGroup className="col-md-6">
                <Label for="country">
                  Country<sup>*</sup>
                </Label>
                <Input
                  type="text"
                  name="country"
                  id="country"
                  value={item.country || ""}
                  onChange={this.handleChange}
                  autoComplete="country"
                  disabled={item.id}
                />
              </FormGroup>

              <FormGroup className="col-md-6">
                <Label>
                  Capital<sup>*</sup>
                </Label>
                <div className="">
                  <input
                    type="radio"
                    name="capital"
                    value="true"
                    checked={item.id && item.capital === true}
                    selected
                    onChange={this.handleChange}
                    disabled={item.id}
                  />{" "}
                  Yes{" "}
                  <input
                    type="radio"
                    name="capital"
                    value="false"
                    checked={item.id && item.capital === false}
                    onChange={this.handleChange}
                    disabled={item.id}
                  />{" "}
                  No
                </div>
              </FormGroup>
            </div>

            <div className="row">
              <FormGroup className="col-md-6">
                <Label for="areaInKilometers">
                  Area(km<sup>2</sup>)
                </Label>
                <Input
                  type="text"
                  name="areaInKilometers"
                  id="areaInKilometers"
                  value={item.areaInKilometers || ""}
                  onChange={this.handleChange}
                  autoComplete="areaInKilometers"
                />
              </FormGroup>

              <FormGroup className="col-md-6">
                <Label for="areaInSquareMiles">Area(sq mi)</Label>
                <Input
                  type="text"
                  name="areaInSquareMiles"
                  id="areaInSquareMiles"
                  value={item.areaInSquareMiles || ""}
                  onChange={this.handleChange}
                  autoComplete="areaInSquareMiles"
                />
              </FormGroup>
            </div>

            <div className="row">
              <FormGroup className="col-md-6">
                <Label for="populationCount">Population</Label>
                <Input
                  type="text"
                  name="populationCount"
                  id="populationCount"
                  value={item.populationCount || ""}
                  onChange={this.handleChange}
                  autoComplete="populationCount"
                />
              </FormGroup>

              <FormGroup className="col-md-6">
                <Label for="populationCountYear">Population Census Year</Label>
                <Input
                  type="text"
                  name="populationCountYear"
                  id="populationCountYear"
                  value={item.populationCountYear || ""}
                  onChange={this.handleChange}
                  autoComplete="populationCountYear"
                />
              </FormGroup>
            </div>

            <FormGroup className="">
              <Label for="img">
                Image<sup>*</sup>
              </Label>
              <Input
                type="text"
                name="img"
                id="img"
                value={item.img || ""}
                onChange={this.handleChange}
                autoComplete="img"
              />
            </FormGroup>

            <FormGroup className="">
              <Label for="summary">
                Summary<sup>*</sup>
              </Label>
              <Input
                type="textarea"
                name="summary"
                id="summary"
                value={item.summary || ""}
                rows="6"
                onChange={this.handleChange}
                autoComplete="name"
                className="form-control"
              />
            </FormGroup>
            {/* <textarea id="notes" name="notes" rows="5" ng-model="ctrl.paymentPlan.notes" maxlength="500" class="form-control"></textarea> */}

            <FormGroup>
              <Button color="primary" type="submit">
                Save
              </Button>{" "}
              <Button color="secondary" tag={Link} to="/cities">
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

export default CityEdit;

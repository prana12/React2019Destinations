import React, { Component } from "react";
import { Container, Table } from "reactstrap";
import NavBar from "./AppNavbar";

class CityViewDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {}
    };
  }

  async componentDidMount() {
    if (this.props.match.params.id !== "new") {
      const city = await (await fetch(
        `/api/city/${this.props.match.params.id}`
      )).json();
      this.setState({ item: city });
    }
  }

  render() {
    const { item } = this.state;
    const title = (
      <h1 style={{ fontFamily: "monospace" }} className="">
        {item.name}, {item.country}
      </h1>
    );

    return (
      <div>
        <NavBar />
        <Container fluid className="mb-4" style={{ fontFamily: "monospace" }}>
          <h1 className="pl-3">{title}</h1>
          <div className="row">
            <div className="col-md-8">
              <div>
                {
                  <img
                    src={item.img}
                    alt={item.name}
                    width="100%"
                    height="100%"
                    className="img-thumbnail"
                  />
                }
              </div>
              <div className="m-2 pt-4 pb-4 text-justify">{item.summary}</div>
            </div>
            <div className="col-md-4 p-4 pt-8 mb-0">
              <span className="h4">city highlights</span>
              <Table
                className="mt-4 table-bordered table-hover"
                style={{ fontSize: "1.2em" }}
              >
                <tbody>
                  <tr>
                    <th width="40%">Rank</th>
                    <td width="60%">{item.rank}</td>
                  </tr>
                  <tr>
                    <th width="40%">Capital City</th>
                    <td width="60%">
                      {item.capital ? <span>Yes</span> : <span>No</span>}
                    </td>
                  </tr>
                  <tr>
                    <th width="40%">Area</th>
                    <td width="60%">
                      {item.areaInKilometers}km<sup>2</sup>(
                      {item.areaInSquareMiles}sq miles)
                    </td>
                  </tr>
                  <tr>
                    <th width="40%">Population</th>
                    <td width="60%">
                      {item.populationCount}({item.populationCountYear})
                    </td>
                  </tr>
                  <tr>
                    <th width="40%">Last Updated On</th>
                    <td width="60%">{item.updatedOn}</td>
                    {/* <td>
                      <span key={item.id}>
                        {new Intl.DateTimeFormat("en-GB", {
                          year: "numeric",
                          month: "long",
                          day: "2-digit"
                        }).format(new Date(item.updatedOn))}
                      </span>
                    </td> */}
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default CityViewDetails;

/* const Card = styled.a`
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
`; */

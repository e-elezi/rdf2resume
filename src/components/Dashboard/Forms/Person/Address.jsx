import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import CustomInput from "../../../core/CustomInput";
import CustomSelect from "../../../core/CustomSelect";

class Address extends Component {
  state = {
    label: "Address",
    Address: {
      street: "",
      postalCode: "",
      city: "",
      country: ""
    },
    countries: []
  };

  getCountries = () => {
    return [
      "United States of America",
      "Albania",
      "Germany",
      "Italy",
      "France",
      "United Kingdom",
      "Norway",
      "Sweden",
      "Spain",
      "Portugal"
    ];
  };

  componentWillMount() {
    if (this.props.Address !== null) {
      let { Address } = { ...this.state.Address };
      Address.street = this.props.Address.street;
      Address.postalCode = this.props.Address.postalCode;
      Address.city = this.props.Address.city;
      Address.country = this.props.Address.country;
      this.setState({
        Address: Address
      });
    }
    this.setState({
      countries: this.getCountries()
    });
  }

  handleInputChange = e => {
    let Address = { ...this.state.Address };
    Address[e.target.id] = e.target.value;
    this.setState({
      Address
    });
    this.props.handleStateObjectUpdate(this.state);
  };

  handleSelectChange = (e, id) => {
    let Address = { ...this.state.Address };
    Address[id] = e.target.text.trim();
    this.setState({ Address });
  };

  render() {
    let { street, postalCode, city, country } = this.state.Address;

    return (
      <div>
        <CustomInput
          id="street"
          label="Street name + number"
          type="text"
          value={street}
          handleChange={this.handleInputChange}
        />
        <Row>
          <Col md={6}>
            <CustomInput
              id="postalCode"
              label="Postal Code"
              type="text"
              value={postalCode}
              handleChange={this.handleInputChange}
            />
          </Col>
          <Col md={6}>
            <CustomInput
              id="city"
              label="City"
              type="text"
              value={city}
              handleChange={this.handleInputChange}
            />
          </Col>
        </Row>
        <CustomSelect
          placeholder="Country"
          id="country"
          value={country}
          items={this.state.countries}
          handleSelectChange={this.handleSelectChange}
        />
      </div>
    );
  }
}

export default Address;

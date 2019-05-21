import React, { Component } from "react";
import CustomInput from "../../core/CustomInput";
import CustomDropdown from "../../core/CustomDropdown";
import CustomCheckbox from "../../core/CustomCheckbox";
import { Form, Row, Col } from "react-bootstrap";
import CustomButton from "../../core/CustomButton";
import AddButton from "../../core/AddButton";
import CustomRadioGroup from "../../core/CustomRadioGroup";

class FormPersonal extends Component {
  state = {
    label: "Person",
    Person: {
      firstName: "",
      lastName: "",
      gender: "",
      birthPlace: "",
      hasCitizenship: "",
      hasNationality: "",
      maritalStatus: "",
      noOfChildren: 0,
      driversLicence: "",
      photo: "",
      email: "",
      birthday: "",
      phoneNumber: "",
      website: "",
      Address: {
        street: "",
        postalCode: "",
        city: "",
        country: ""
      },
      SocialMedia: [],
      InstantMessaging: []
    },
    genderStatus: [],
    maritalStatus: [],
    countries: []
  };

  getGenderStatus = () => {
    return ["female", "male"];
  };

  getMaritalStatus = () => {
    return ["single", "widowed", "married", "divorced"];
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
    this.setState({
      genderStatus: this.getGenderStatus(),
      maritalStatus: this.getGenderStatus(),
      countries: this.getCountries()
    });
  }

  handleInputChange = e => {
    let person = { ...this.state.person };
    person[e.target.id] = e.target.value;
    this.setState({
      person
    });
    this.props.handleStateObjectUpdate(this.state);
  };

  render() {
    let {
      firstName,
      lastName,
      gender,
      birthPlace,
      hasCitizenship,
      hasNationality,
      maritalStatus,
      noOfChildren,
      driversLicence,
      photo,
      email,
      birthday,
      phoneNumber,
      website,
      Address,
      SocialMedia,
      InstantMessaging
    } = this.state;

    return (
      <Row>
        <Col md={3}>
          <h4 style={{ marginTop: "10px" }}>Personal Information</h4>
          <div className="photo-div">
            <p
              style={{
                textAlign: "center",
                marginTop: "10px",
                marginBottom: "0"
              }}
            >
              Photo
            </p>
            <div className="photo-div-button">
              <AddButton classnames="add-button" />
            </div>
          </div>
          <CustomRadioGroup items={this.state.genderStatus} name="gender" />
        </Col>
        <Col md={4}>
          <Row>
            <Col md={6}>
              <CustomInput
                id="firstName"
                label="First Name"
                type="text"
                value={firstName}
                handleChange={this.handleInputChange}
              />
            </Col>
            <Col md={6}>
              <CustomInput
                id="lastName"
                label="Last Name"
                type="text"
                value={lastName}
                handleChange={this.handleInputChange}
              />
            </Col>
          </Row>
          <CustomInput
            id="email"
            label="Email"
            type="email"
            value={email}
            handleChange={this.handleInputChange}
          />
          <CustomInput
            id="birthday"
            label="Birthday"
            type="date"
            value={birthday}
            handleChange={this.handleInputChange}
          />
          <CustomInput
            id="birthPlace"
            label="Birth Place"
            type="text"
            value={birthPlace}
            handleChange={this.handleInputChange}
          />
          <Row>
            <Col md={6}>
              <CustomDropdown
                id="hasCitizenship"
                title="Citizenship"
                items={this.state.countries}
                handleChange={this.handleInputChange}
              />
            </Col>
            <Col md={6}>
              <CustomDropdown
                id="hasNationality"
                title="Nationality"
                items={this.state.countries}
                handleChange={this.handleInputChange}
              />
            </Col>
          </Row>
        </Col>
        <Col md={5} />
      </Row>
    );
  }
}

export default FormPersonal;

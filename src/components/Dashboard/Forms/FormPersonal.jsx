import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import AddButton from "../../core/AddButton";
import RemoveButton from "../../core/RemoveButton";
import CustomInput from "../../core/CustomInput";
import CustomRadioGroup from "../../core/CustomRadioGroup";
import { Combobox, Multiselect } from "react-widgets";
import { connect } from "react-redux";
import { updateAboutPerson } from "../../../actions";
import {
  fetchCountries,
  fetchGenders,
  fetchTitleProperties
} from "../../../actions/utilityActions";
import {
  retrieveCountryValues,
  retrieveGenderValues,
  retrieveTitleValues
} from "../../../utilities/utilityQueries";

class FormPersonal extends Component {
  state = {
    instantMessagingNameValues: []
  };

  getInstantMessagingNameValues() {
    return ["Google", "Skype", "Yahoo"];
  }

  componentWillMount() {
    this.props.fetchCountries();
    this.props.fetchGenders();
    this.props.fetchTitleProperties();
    this.setState({
      instantMessagingNameValues: this.getInstantMessagingNameValues()
    });
  }

  handleInputChange = (e, secondName) => {
    //e.target.id e.target.value
    this.props.updateAboutPerson({
      id: e.target.id,
      value: e.target.value,
      super: secondName
    });
  };

  handleSelectChange = (name, value, secondName) => {
    this.props.updateAboutPerson({ id: name, value: value, super: secondName });
  };

  handleMultiSelectChange = (name, value) => {
    this.props.updateAboutPerson({ id: name, value: value });
  };

  handleRadioChange = e => {
    this.props.updateAboutPerson({ id: e.target.name, value: e.target.id });
  };

  addTelephoneNumber = id => {
    let phones = [...this.props.aboutperson.hasTelephoneNumber, ""];
    this.props.updateAboutPerson({ id: id, value: phones });
  };

  updateTelephoneNumber = (e, id, index) => {
    let phones = [...this.props.aboutperson.hasTelephoneNumber];
    phones[index] = e.target.value;
    this.props.updateAboutPerson({ id: id, value: phones });
  };

  removeTelephoneNumber = (id, index) => {
    let phones = this.props.aboutperson.hasTelephoneNumber.filter(
      (item, ind) => ind !== index
    );
    this.props.updateAboutPerson({ id: id, value: phones });
  };

  addInstantMessaging = id => {
    let myarr = [
      ...this.props.aboutperson.instantMessaging,
      {
        instantMessagingName: "",
        instantMessagingUsername: ""
      }
    ];
    this.props.updateAboutPerson({ id: id, value: myarr });
  };

  updateInstantMessaging = (name, value, id, index) => {
    let myarr = [...this.props.aboutperson.instantMessaging];
    myarr[index][name] = value;
    this.props.updateAboutPerson({ id: id, value: myarr });
  };

  removeInstantMessaging = (id, index) => {
    let myarr = this.props.aboutperson.instantMessaging.filter(
      (item, ind) => ind !== index
    );
    this.props.updateAboutPerson({ id: id, value: myarr });
  };

  render() {
    let {
      firstName,
      lastName,
      hasCitizenship,
      hasNationality,
      website,
      dateOfBirth,
      gender,
      hasTelephoneNumber,
      email,
      title,
      instantMessaging,
      address,
      driversLicence
    } = this.props.aboutperson;

    return (
      <Row className="main-content-row">
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
          <CustomRadioGroup
            items={this.props.genders}
            name="gender"
            value={gender}
            handleChange={this.handleRadioChange}
          />
        </Col>
        <Col md={4} className="pt-4">
          <label className="label-rw">Title</label>
          <Combobox
            name="title"
            placeholder="Select a job mode"
            data={this.props.titles}
            value={title}
            caseSensitive={false}
            minLength={3}
            filter="contains"
            onChange={value => this.handleSelectChange("title", value)}
          />
          <div className="row">
            <div className="col col-sm-6">
              <CustomInput
                id="firstName"
                label="First name"
                type="text"
                value={firstName}
                handleChange={this.handleInputChange}
              />
            </div>
            <div className="col col-sm-6">
              <CustomInput
                id="lastName"
                label="Last name"
                type="text"
                value={lastName}
                handleChange={this.handleInputChange}
              />
            </div>
          </div>
          <CustomInput
            id="email"
            label="E-mail"
            type="email"
            value={email}
            handleChange={this.handleInputChange}
          />
          <CustomInput
            id="website"
            label="Website"
            type="text"
            value={website}
            handleChange={this.handleInputChange}
          />
          <div>
            <CustomInput
              id="street"
              label="Street name + number"
              type="text"
              value={address.street}
              handleChange={e => this.handleInputChange(e, "address")}
            />
            <Row>
              <Col md={6}>
                <CustomInput
                  id="postalCode"
                  label="Postal Code"
                  type="text"
                  value={address.postalCode}
                  handleChange={e => this.handleInputChange(e, "address")}
                />
              </Col>
              <Col md={6}>
                <CustomInput
                  id="city"
                  label="City"
                  type="text"
                  value={address.city}
                  handleChange={e => this.handleInputChange(e, "address")}
                />
              </Col>
            </Row>
            <label className="label-rw">Country</label>
            <Combobox
              name="country"
              placeholder="Select a country"
              data={this.props.countries}
              value={address.country}
              caseSensitive={false}
              minLength={3}
              filter="contains"
              onChange={value =>
                this.handleSelectChange("country", value, "address")
              }
            />
          </div>
          <CustomInput
            id="dateOfBirth"
            label="Date of Birth"
            type="date"
            value={dateOfBirth}
            handleChange={this.handleInputChange}
          />
          <label className="label-rw">Citizenship</label>
          <Multiselect
            name="hasCitizenship"
            data={this.props.countries}
            value={hasCitizenship}
            placeholder="Select a country"
            caseSensitive={false}
            minLength={3}
            filter="contains"
            onChange={value =>
              this.handleMultiSelectChange("hasCitizenship", value)
            }
          />
          <label className="label-rw">Nationality</label>
          <Multiselect
            name="hasNationality"
            data={this.props.countries}
            value={hasNationality}
            placeholder="Select a country"
            caseSensitive={false}
            minLength={3}
            filter="contains"
            onChange={value =>
              this.handleMultiSelectChange("hasNationality", value)
            }
          />
          <CustomInput
            id="driversLicence"
            label="Driver's License"
            type="text"
            value={driversLicence}
            handleChange={this.handleInputChange}
          />
          <div className="mb-3" />
          <Row className="m-0">
            <Col md={5} className="p-0">
              <p className="mb-0">Telephone Numbers</p>
            </Col>
            <Col md={5} className="p-0" />
            <Col md={2} className="p-0 instant-add-wrapper">
              <AddButton
                classnames="add-button small-button"
                handleClick={() =>
                  this.addTelephoneNumber("hasTelephoneNumber")
                }
              />
            </Col>
          </Row>
          {hasTelephoneNumber.map((member, index) => (
            <Row key={index}>
              <Col md={11} className="pr-0">
                <CustomInput
                  id="hasTelephoneNumber"
                  label="Phone number"
                  type="text"
                  value={member}
                  handleChange={e =>
                    this.updateTelephoneNumber(e, "hasTelephoneNumber", index)
                  }
                />
              </Col>
              <Col md={1}>
                <RemoveButton
                  classnames="shift-left"
                  handleClick={() =>
                    this.removeTelephoneNumber("hasTelephoneNumber", index)
                  }
                />
              </Col>
            </Row>
          ))}
          <div className="mb-3"></div>
          <Row className="m-0">
            <Col md={5} className="p-0">
              <p className="mb-0">Instant Messaging</p>
            </Col>
            <Col md={5} className="p-0" />
            <Col md={2} className="p-0 instant-add-wrapper">
              <AddButton
                classnames="add-button small-button"
                handleClick={() => this.addInstantMessaging("instantMessaging")}
              />
            </Col>
          </Row>

          {instantMessaging.map((member, index) => (
            <Row key={index}>
              <Col md={6} className="pr-0">
                <div style={{marginTop: "22px"}}>
                <Combobox
                  name="instantMessagingName"
                  data={this.state.instantMessagingNameValues}
                  value={instantMessaging.instantMessagingName}
                  placeholder="Select an IM Name"
                  caseSensitive={false}
                  minLength={3}
                  filter="contains"
                  onChange={value =>
                    this.updateInstantMessaging(
                      "instantMessagingName",
                      value,
                      "instantMessaging",
                      index
                    )
                  }
                />
                </div>
              </Col>
              <Col md={5} style={{ marginTop: "7px" }}>
                <CustomInput
                  id="instantMessagingUsername"
                  label="Username"
                  type="text"
                  value={member.instantMessagingUsername}
                  handleChange={e =>
                    this.updateInstantMessaging(
                      "instantMessagingUsername",
                      e.target.value,
                      "instantMessaging",
                      index
                    )
                  }
                />
              </Col>
              <Col md={1}>
                <RemoveButton
                  classnames="shift-left"
                  handleClick={() => this.removeInstantMessaging("instantMessaging", index)}
                />
              </Col>
            </Row>
          ))}
        </Col>
        <Col md={5}> </Col>
      </Row>
    );
  }
}

const mapstateToProps = state => {
  return {
    countries: retrieveCountryValues(state.utility.countryValues),
    genders: retrieveGenderValues(state.utility.genderValues),
    titles: retrieveTitleValues(state.utility.titleValues),
    aboutperson: state.cv.aboutPerson
  };
};

export default connect(
  mapstateToProps,
  { fetchCountries, updateAboutPerson, fetchGenders, fetchTitleProperties }
)(FormPersonal);

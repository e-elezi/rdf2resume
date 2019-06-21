import React, { Component } from "react";
import CustomInput from "../../core/CustomInput";
import { Row, Col } from "react-bootstrap";
import CustomSelect from "../../core/CustomSelect";
import CustomSelectMulti from "../../core/CustomSelectMulti";
import AddButton from "../../core/AddButton";
import CustomRadioGroup from "../../core/CustomRadioGroup";
import Address from "./Person/Address";
import RemoveButton from "../../core/RemoveButton";

class FormPersonal extends Component {
  state = {
    label: "Person",
    Person: {
      name: "",
      gender: "",
      hasCitizenship: [],
      hasNationality: [],
      maritalStatus: "",
      noOfChildren: 0,
      driversLicence: "",
      photo: "",
      email: "",
      dateOfBirth: "",
      hasTelephoneNumber: [""],
      website: "",
      Address: null,
      instantMessaging: []
    },
    genderStatus: [],
    maritalStatus: [],
    countries: [],
    instantMessagingNameValues: []
  };

  getGenderStatus = () => {
    return ["Female", "Male", "Not indicated"];
  };

  getMaritalStatus = () => {
    return ["Single", "Widowed", "Married", "Divorced"];
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

  getInstantMessagingNameValues() {
    return ["Google", "Skype", "Yahoo"];
  }

  componentWillMount() {
    this.setState({
      genderStatus: this.getGenderStatus(),
      maritalStatus: this.getGenderStatus(),
      countries: this.getCountries(),
      instantMessagingNameValues: this.getInstantMessagingNameValues()
    });
  }

  handleTelephoneChange = (label, idx, evt) => {
    let Person = { ...this.state.Person };
    const newTelephones = Person[label].map((s, sidx) => {
      if (idx !== sidx) return s;
      return evt.target.value;
    });
    Person[label] = newTelephones;
    this.setState({ Person });
  };

  handleInstantSelectChange = (e, id, index) => {
    let Person = { ...this.state.Person };
    const newTelephones = Person[id].map((s, sidx) => {
      if (index !== sidx) return s;
      return { ...s, InstantMessagingName: e.target.text.trim() };
    });
    Person[id] = newTelephones;
    this.setState({ Person });
  };

  handleInstantInputChange = (label, idx, evt) => {
    let Person = { ...this.state.Person };
    const newTelephones = Person[label].map((s, sidx) => {
      if (idx !== sidx) return s;
      return { ...s, InstantMessagingUsername: evt.target.value };
    });
    Person[label] = newTelephones;
    this.setState({ Person });
  };

  handleAddTelephone = label => {
    let Person = { ...this.state.Person };
    Person[label].push("");
    this.setState({
      Person
    });
  };

  handleAddInstantMessaging = label => {
    let Person = { ...this.state.Person };
    Person[label].push({
      InstantMessagingName: "",
      InstantMessagingUsername: ""
    });
    this.setState({
      Person
    });
  };

  handleRemoveTelephone = (label, idx) => {
    let Person = { ...this.state.Person };
    Person[label] = Person[label].filter((s, sidx) => idx !== sidx);
    this.setState({
      Person
    });
  };

  handleRemoveInstantMessaging = (label, idx) => {
    let Person = { ...this.state.Person };
    Person[label] = Person[label].filter((s, sidx) => idx !== sidx);
    this.setState({
      Person
    });
  };

  handleInputChange = e => {
    let Person = { ...this.state.Person };
    Person[e.target.id] = e.target.value;
    this.setState({
      Person
    });
    this.props.handleStateObjectUpdate(this.state);
  };

  handleRadioChange = e => {
    let Person = { ...this.state.Person };
    Person[e.target.name] = e.target.id;
    this.setState({
      Person
    });
  };

  handleStateObjectUpdate = item => {
    let Person = { ...this.state.Person };
    Person[item.label] = item[item.label];
    this.setState({
      Person
    });
  };

  handleSelectChange = (e, id) => {
    let Person = { ...this.state.Person };
    Person[id] = e.target.text.trim();
    this.setState({ Person });
  };

  handleMultiSelectChange = (e, id) => {
    let Person = { ...this.state.Person };
    let labelToAdd = e.target.text.trim();
    let filtered = this.state.Person[id].filter(
      oneval => oneval.toLowerCase() === labelToAdd.toLowerCase()
    );
    if (filtered.length === 0) Person[id].push(labelToAdd);
    this.setState({ Person });
  };

  handleMultiSelectRemove = (e, id) => {
    let Person = { ...this.state.Person };
    let labelToRemove = e.target.parentNode.childNodes[0].innerText.trim();
    Person[id] = Person[id].filter(
      oneval => oneval.toLowerCase() !== labelToRemove.toLowerCase()
    );
    this.setState({ Person });
  };

  render() {
    let {
      name,
      gender,
      hasCitizenship,
      hasNationality,
      hasTelephoneNumber,
      maritalStatus,
      noOfChildren,
      driversLicence,
      email,
      dateOfBirth,
      website,
      instantMessaging
    } = this.state.Person;

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
            items={this.state.genderStatus}
            name="gender"
            value={gender}
            handleChange={this.handleRadioChange}
          />
        </Col>
        <Col md={4} className="pt-4">
          <CustomInput
            id="name"
            label="Full name"
            type="text"
            value={name}
            handleChange={this.handleInputChange}
          />
          <CustomInput
            id="email"
            label="Email"
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
          <Address Address={this.state.Person.Address} />
          <CustomInput
            id="dateOfBirth"
            label="Date of Birth"
            type="date"
            value={dateOfBirth}
            handleChange={this.handleInputChange}
          />
          {hasTelephoneNumber.map((phone, idx) => (
            <CustomInput
              key={idx}
              id={"hasTelephoneNumber" + idx}
              label="Telephone Number"
              type="text"
              name="hasTelephoneNumber"
              value={phone}
              handleChange={e =>
                this.handleTelephoneChange("hasTelephoneNumber", idx, e)
              }
            >
              {idx === 0 ? (
                <AddButton
                  classnames="add-button small-button no-button"
                  id="addTelephoneNumber"
                  handleClick={() =>
                    this.handleAddTelephone("hasTelephoneNumber")
                  }
                />
              ) : (
                <RemoveButton
                  classnames="add-button small-button no-button"
                  id="addTelephoneNumber"
                  handleClick={() =>
                    this.handleRemoveTelephone("hasTelephoneNumber", idx)
                  }
                />
              )}
            </CustomInput>
          ))}
          <CustomSelectMulti
            placeholder="Citizenship"
            id="hasCitizenship"
            value={hasCitizenship}
            items={this.state.countries}
            handleMultiSelectRemove={this.handleMultiSelectRemove}
            handleMultiSelectChange={this.handleMultiSelectChange}
          />
          <CustomSelectMulti
            placeholder="Nationality"
            id="hasNationality"
            value={hasNationality}
            items={this.state.countries}
            handleMultiSelectRemove={this.handleMultiSelectRemove}
            handleMultiSelectChange={this.handleMultiSelectChange}
          />
          <Row>
            <Col md={8} style={{ marginTop: "7px" }}>
              <CustomSelect
                placeholder="Marital Status"
                id="maritalStatus"
                value={maritalStatus}
                items={this.state.maritalStatus}
                handleSelectChange={this.handleSelectChange}
              />
            </Col>
            <Col md={4}>
              <CustomInput
                id="noOfChildren"
                label="No of Children"
                type="number"
                value={noOfChildren}
                handleChange={this.handleInputChange}
              />
            </Col>
          </Row>
          <CustomInput
            id="driversLicence"
            label="Driver's License"
            type="text"
            value={driversLicence}
            handleChange={this.handleInputChange}
          />
          <br />
          <Row className="m-0">
            <Col md={5} className="p-0">
              <p className="mb-0">Instant Messaging</p>
            </Col>
            <Col md={5} className="p-0" />
            <Col md={2} className="p-0 instant-add-wrapper">
              <AddButton
                classnames="add-button small-button"
                handleClick={() =>
                  this.handleAddInstantMessaging("instantMessaging")
                }
              />
            </Col>
          </Row>
          {instantMessaging.map((im, idx) => (
            <Row key={idx}>
              <Col md={6} className="pr-0" style={{ marginTop: "7px" }}>
                <CustomSelect
                  placeholder="IM Name"
                  id="instantMessaging"
                  value={im.InstantMessagingName}
                  items={this.state.instantMessagingNameValues}
                  handleSelectChange={this.handleInstantSelectChange}
                  indexSelect={idx}
                />
              </Col>
              <Col md={5}>
                <CustomInput
                  id="instantMessagingUsername"
                  label="Username"
                  type="text"
                  value={im.InstantMessagingUsername}
                  handleChange={e =>
                    this.handleInstantInputChange("instantMessaging", idx, e)
                  }
                />
              </Col>
              <Col md={1}>
                <RemoveButton
                  classnames="shift-left"
                  handleClick={() =>
                    this.handleRemoveInstantMessaging("instantMessaging", idx)
                  }
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

export default FormPersonal;

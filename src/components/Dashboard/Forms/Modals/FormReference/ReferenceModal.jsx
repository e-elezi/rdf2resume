import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button, Row, Col } from "react-bootstrap";
import CustomSelect from "../../../../core/CustomSelect";
import CustomInput from "../../../../core/CustomInput";
import { createReference } from "../../../../../actions";
import {
  fetchCountries,
  fetchTitleProperties
} from "../../../../../actions/utilityActions";
import {
  retrieveCountryValues,
  retrieveTitleValues
} from "../../../../../utilities/utilityQueries";

class ReferenceModal extends Component {
  state = {
    reference: {
      type: "",
      title: "",
      name: "",
      jobTitle: "",
      Organization: {
        name: ""
      },
      Address: {
        street: "",
        postalCode: "",
        city: "",
        country: ""
      },
      hasTelephoneNumber: "",
      email: ""
    },
    // titleValues: [],
    // countryValues: [],
    typeValues: ["Personal", "Professional"]
  };

  // getCountries = () => {
  //   return [
  //     "United States of America",
  //     "Albania",
  //     "Germany",
  //     "Italy",
  //     "France",
  //     "United Kingdom",
  //     "Norway",
  //     "Sweden",
  //     "Spain",
  //     "Portugal"
  //   ];
  // };

  // getTitles = () => {
  //   return ["Doctor", "Professor"];
  // };

  componentWillMount() {
    // this.setState({
    //   countryValues: this.getCountries(),
    //   titleValues: this.getTitles()
    // });
    this.props.fetchCountries();
    this.props.fetchTitleProperties();
  }

  handleSelectChange = (e, id) => {
    let reference = { ...this.state.reference };
    if (id.indexOf("Address") >= 0) {
      let sublabel = id.substr(8);
      let mybj = reference["Address"];
      mybj[sublabel] = e.target.text.trim();
      reference["Address"] = mybj;
      this.setState({
        reference
      });
    } else {
      reference[id] = e.target.text.trim();
      this.setState({ reference });
    }
  };

  handleInputChange = e => {
    let label = e.target.id;
    let reference = { ...this.state.reference };
    if (label === "Organization") {
      let mybj = reference[label];
      mybj["name"] = e.target.value;
      reference[label] = mybj;
      this.setState({
        reference
      });
    } else if (label.indexOf("Address") >= 0) {
      let sublabel = label.substr(8);
      let mybj = reference["Address"];
      mybj[sublabel] = e.target.value;
      reference["Address"] = mybj;
      this.setState({
        reference
      });
    } else {
      reference[label] = e.target.value;
      this.setState({
        reference
      });
    }
  };

  handleSave = () => {
    this.props.createReference({
      ...this.state.reference,
      id: Math.round(Date.now() + Math.random())
    });
  };

  render() {
    let {
      type,
      title,
      name,
      email,
      hasTelephoneNumber,
      jobTitle,
      Address
    } = this.state.reference;
    let { name: OrganizatioName } = this.state.reference.Organization;

    const { onHide } = this.props;
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        className="reference-modal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <Row>
              <Col md={4}>Add New Reference</Col>
              <Col md={4}>
                <CustomSelect
                  placeholder="Type"
                  id="type"
                  value={type}
                  items={this.state.typeValues}
                  handleSelectChange={this.handleSelectChange}
                />
              </Col>
              <Col md={4} />
            </Row>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={4} style={{ marginTop: "7px" }}>
              <CustomSelect
                placeholder="Title"
                id="title"
                value={title}
                items={this.props.titles}
                handleSelectChange={this.handleSelectChange}
              />
            </Col>
            <Col md={8}>
              <CustomInput
                id="name"
                label="Name"
                type="text"
                value={name}
                handleChange={this.handleInputChange}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <CustomInput
                id="jobTitle"
                label="Job Title"
                type="text"
                value={jobTitle}
                handleChange={this.handleInputChange}
              />
            </Col>
            <Col md={6}>
              <CustomInput
                id="Organization"
                label="Organization Name"
                type="text"
                value={OrganizatioName}
                handleChange={this.handleInputChange}
              />
            </Col>
          </Row>
          <div>
            <CustomInput
              id="Address.street"
              label="Street name + number"
              type="text"
              value={Address.street}
              handleChange={this.handleInputChange}
            />
            <Row>
              <Col md={6}>
                <CustomInput
                  id="Address.postalCode"
                  label="Postal Code"
                  type="text"
                  value={Address.postalCode}
                  handleChange={this.handleInputChange}
                />
              </Col>
              <Col md={6}>
                <CustomInput
                  id="Address.city"
                  label="City"
                  type="text"
                  value={Address.city}
                  handleChange={this.handleInputChange}
                />
              </Col>
            </Row>
            <CustomSelect
              placeholder="Country"
              id="Address.country"
              value={Address.country}
              items={this.props.countries}
              handleSelectChange={this.handleSelectChange}
            />
          </div>
          <CustomInput
            id="hasTelephoneNumber"
            label="Telephone Number"
            type="text"
            value={hasTelephoneNumber}
            handleChange={this.handleInputChange}
          />
          <CustomInput
            id="email"
            label="E-mail"
            type="email"
            value={email}
            handleChange={this.handleInputChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.handleSave}>
            Save
          </Button>
          <Button variant="danger" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapstateToProps = state => {
  return {
    countries: retrieveCountryValues(state.utility.countryValues),
    titles: retrieveTitleValues(state.utility.titleValues)
  };
};

export default connect(
  mapstateToProps,
  { createReference, fetchCountries, fetchTitleProperties }
)(ReferenceModal);

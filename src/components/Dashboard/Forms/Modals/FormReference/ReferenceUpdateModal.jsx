import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { Combobox } from "react-widgets";
import CustomInput from "../../../../core/CustomInput";
import Address from "../../Person/Address";
import { updateReference } from "../../../../../actions";
import {
  fetchCountries,
  fetchTitleProperties
} from "../../../../../actions/utilityActions";
import {
  retrieveCountryValues,
  retrieveTitleValues
} from "../../../../../utilities/utilityQueries";

class ReferenceUpdateModal extends Component {
  state = {
    reference: {
      id: "",
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
    typeValues: ["Personal", "Professional"]
  };

  componentWillMount() {
    this.props.fetchCountries();
    this.props.fetchTitleProperties();
    if (this.props.id !== null) {
      let inputRef = this.props.initialValues;
      let reference = { ...this.state.reference };
      reference.id = inputRef.id;
      reference.title = inputRef.title;
      reference.jobTitle = inputRef.jobTitle;
      reference.name = inputRef.name;
      reference.email = inputRef.email;
      reference.hasTelephoneNumber = inputRef.hasTelephoneNumber;
      reference.type = inputRef.type;
      reference.Address = inputRef.Address;
      reference.Organization = inputRef.Organization;
      this.setState({
        reference
      });
    }
  }

  handleSelectChange = (value, id) => {
    let reference = { ...this.state.reference };
    if (id.indexOf("Address") >= 0) {
      let sublabel = id.substr(8);
      let mybj = reference["Address"];
      mybj[sublabel] =value.trim();
      reference["Address"] = mybj;
      this.setState({
        reference
      });
    } else {
      reference[id] = value.trim();
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

  handleUpdate = () => {
    this.props.updateReference(this.state.reference);
  };

  render() {
    let {
      type,
      title,
      name,
      email,
      hasTelephoneNumber,
      jobTitle
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
                <Row
                  style={{
                    width: "100%",
                    justifyContent: "left",
                    marginLeft: "0px",
                    marginBottom: "8px"
                  }}
                >
                  <label className="label-rw">Type</label>
                  <Combobox
                    name="type"
                    placeholder="Select type"
                    data={this.state.typeValues}
                    value={type}
                    caseSensitive={false}
                    minLength={3}
                    filter="contains"
                    onChange={value => this.handleSelectChange(value, "type")}
                  />
                </Row>
              </Col>
              <Col md={4} />
            </Row>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={4} style={{ marginTop: "7px" }}>
              <Row
                style={{
                  width: "100%",
                  justifyContent: "left",
                  marginLeft: "0px",
                  marginBottom: "8px"
                }}
              >
                <label className="label-rw">Title</label>
                <Combobox
                  name="title"
                  placeholder="Select title"
                  data={this.props.titles}
                  value={title}
                  caseSensitive={false}
                  minLength={3}
                  filter="contains"
                  onChange={value => this.handleSelectChange(value, "title")}
                />
              </Row>
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
            <Row
              style={{
                width: "100%",
                justifyContent: "left",
                marginLeft: "0px",
                marginBottom: "8px"
              }}
            >
              <label className="label-rw">Country</label>
              <Combobox
                name="Address.country"
                placeholder="Select country"
                data={this.props.countries}
                value={Address.country}
                caseSensitive={false}
                minLength={3}
                filter="contains"
                onChange={value =>
                  this.handleSelectChange(value, "Address.country")
                }
              />
            </Row>
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
          <Button variant="primary" onClick={this.handleUpdate}>
            Update
          </Button>
          <Button variant="danger" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: state.cv.references[ownProps.id],
    countries: retrieveCountryValues(state.utility.countryValues),
    titles: retrieveTitleValues(state.utility.titleValues)
  };
};

export default connect(
  mapStateToProps,
  { updateReference, fetchCountries, fetchTitleProperties }
)(ReferenceUpdateModal);

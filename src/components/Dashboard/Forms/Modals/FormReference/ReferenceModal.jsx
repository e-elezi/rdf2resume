import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { Combobox } from "react-widgets";
import CustomInput from "../../../../core/CustomInput";
import { createReference, updateReference } from "../../../../../actions";
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
      "@type": "my0:Reference",
      "my0:referenceType": "",
      "my0:referenceBy": {
        "@type": "my0:Person",
        "my0:title": "",
        "my0:firstName" : "",
        "my0:lastName" : "",
        "my0:address" : {
          "@type": "my0:Address",
          "my0:city" : "",
          "my0:country" : "",
          "my0:street" : "",
          "my0:postalCode" : ""
          },
        "my0:hasTelephoneNumber" : "",
        "my0:email" : "",
        "my0:currentJob": {
          "@type": "my0:WorkHistory",
          "my0:jobTitle": "",
          "my0:employedIn": {
            "@type": "my0:Company",
            "my0:organizationName": ""
          }
        }
      }
    },
    typeValues: [ {
      "@type": "Personal",
      "value": "Personal"
      }, {
        "@type": "Professional",
        "value": "Professional"
      }]
  };

  componentWillMount() {
    this.props.fetchCountries();
    this.props.fetchTitleProperties();
    this.setInitialValues();
  }

  setInitialValues = () => {
    if (this.props.id !== null && this.props.isUpdate === true) {
      let inputRef = this.props.initialValues;
      let reference = { ...this.state.reference };
      reference["my0:referenceBy"] = inputRef["my0:referenceBy"];
      reference["my0:referenceType"] = inputRef["my0:referenceType"];
      this.setState({
        reference
      });
  };
}

  clearForm = () => {
    if (!this.props.isUpdate) {
      this.setState({
        reference: {
          "@type": "my0:Reference",
          "my0:referenceType": "",
          "my0:referenceBy": {
            "@type": "my0:Person",
            "my0:title": "",
            "my0:firstName" : "",
            "my0:lastName" : "",
            "my0:address" : {
              "@type": "my0:Address",
              "my0:city" : "",
              "my0:country" : "",
              "my0:street" : "",
              "my0:postalCode" : ""
              },
            "my0:hasTelephoneNumber" : "",
            "my0:email" : "",
            "my0:currentJob": {
              "@type": "my0:WorkHistory",
              "my0:jobTitle": "",
              "my0:employedIn": {
                "@type": "my0:Company",
                "my0:organizationName": ""
              }
            }
          }
        }
      });
    } else {
      this.setInitialValues();
    }
  };

  handleSelectChange = (value, id, name) => {
    console.log(value);
    let obj = {...this.state.reference};
    let label = id;
    if(name === "person") {
      obj['my0:referenceBy'][label] = value['@type'];
    } else if(name === "address") {
      obj['my0:referenceBy']['my0:address'][label] = value['@type'];
    } else if (name === "workHistory") {
      obj['my0:referenceBy']['my0:currentJob'][label] = value['@type'];
    } else if (name === "organization") {
      obj['my0:referenceBy']['my0:currentJob']["my0:employedIn"][label] = value['@type'];
    } else {
      obj[label] = value['@type'];
    }
    this.setState({
      reference: obj
    })
  };

  handleInputChange = e => {
    let obj = {...this.state.reference};
    let label = e.target.id;
    if(e.target.name === "person") {
      obj['my0:referenceBy'][label] = e.target.value;
    } else if(e.target.name === "address") {
      obj['my0:referenceBy']['my0:address'][label] = e.target.value;
    } else if (e.target.name === "workHistory") {
      obj['my0:referenceBy']['my0:currentJob'][label] = e.target.value;
    } else if (e.target.name === "organization") {
      obj['my0:referenceBy']['my0:currentJob']["my0:employedIn"][label] = e.target.value;
    } else {
      obj[label] = e.target.value;
    }
    this.setState({
      reference: obj
    })
  };

  handleSave = () => {
    this.props.createReference(
     this.state.reference
    );
  };

  handleUpdate = () => {
    this.props.updateReference( { 
      object: this.state.reference,
      index: this.props.id
     } );
  };

  handleRenderingSubmitButton = () => {
    if (!this.props.isUpdate) {
      return (
        <Button type="submit" variant="primary" onClick={this.handleSave}>
          Save
        </Button>
      );
    } else {
      return (
        <Button type="submit" variant="primary" onClick={this.handleUpdate}>
          Update
        </Button>
      );
    }
  }

  render() {
    let { 
      "my0:title" : title,
      "my0:firstName" : firstName,
      "my0:lastName" : lastName,
      "my0:email" : email,
      "my0:hasTelephoneNumber" : hasTelephoneNumber,
      "my0:currentJob" : currentJob,
      "my0:address" : address
   } = this.state.reference['my0:referenceBy'];

   let { 
      "my0:jobTitle" : jobTitle,
      "my0:employedIn" : employedIn
    } = currentJob;

    let {  "my0:organizationName" : organizationName } = employedIn;

    const { onHide } = this.props;
    return (
      <Modal
      show={this.props.show}
      onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        className="reference-modal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <Row>
              <Col md={4}>{this.props.isUpdate ? "Update" : "Add New"} Reference</Col>
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
                    textField="value"
                    valueField="@type"
                    data={this.state.typeValues}
                    value={this.state.reference['my0:referenceType']}
                    caseSensitive={false}
                    minLength={3}
                    filter="contains"
                    onChange={value => this.handleSelectChange(value, "my0:referenceType", "reference")}
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
                  textField="value"
                  valueField="@type"
                  value={title}
                  caseSensitive={false}
                  minLength={3}
                  filter="contains"
                  onChange={value => this.handleSelectChange(value, "my0:title", "person")}
                />
              </Row>
            </Col>
            <Col md={8}>
              <CustomInput
                id="my0:firstName"
                name="person"
                label="First name"
                type="text"
                value={firstName}
                handleChange={this.handleInputChange}
              />
              <CustomInput
                id="my0:lastName"
                label="Last name"
                name="person"
                type="text"
                value={lastName}
                handleChange={this.handleInputChange}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <CustomInput
                id="my0:jobTitle"
                name="workHistory"
                label="Job Title"
                type="text"
                value={jobTitle}
                handleChange={this.handleInputChange}
              />
            </Col>
            <Col md={6}>
              <CustomInput
                id="my0:organizationName"
                name="organization"
                label="Organization Name"
                type="text"
                value={organizationName}
                handleChange={this.handleInputChange}
              />
            </Col>
          </Row>
          <div>
            <CustomInput
              id="my0:street"
              name="address"
              label="Street name + number"
              type="text"
              value={address["my0:street"]}
              handleChange={this.handleInputChange}
            />
            <Row>
              <Col md={6}>
                <CustomInput
                  id="my0:postalCode"
                  label="Postal Code"
                  name="address"
                  type="text"
                  value={address["my0:postalCode"]}
                  handleChange={this.handleInputChange}
                />
              </Col>
              <Col md={6}>
                <CustomInput
                  id="my0:city"
                  name="address"
                  label="City"
                  type="text"
                  value={address["my0:city"]}
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
                name="my0:country"
                placeholder="Select country"
                data={this.props.countries}
                textField="value"
                valueField="@type"
                value={address["my0:country"]}
                caseSensitive={false}
                minLength={3}
                filter="contains"
                onChange={value =>
                  this.handleSelectChange(value, "my0:country", "address")
                }
              />
            </Row>
          </div>
          <CustomInput
            id="my0:hasTelephoneNumber"
            name="person"
            label="Telephone Number"
            type="text"
            value={hasTelephoneNumber}
            handleChange={this.handleInputChange}
          />
          <CustomInput
            id="my0:email"
            label="E-mail"
            name="person"
            type="email"
            value={email}
            handleChange={this.handleInputChange}
          />
        </Modal.Body>
        <Modal.Footer>
        {this.handleRenderingSubmitButton()}
            <Button className="btn-reset" onClick={this.clearForm}>
              Reset
            </Button>
          <Button variant="danger" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapstateToProps = (state, ownProps) => {
  return {
    initialValues: state.cv["my0:hasReference"][ownProps.id],
    countries: retrieveCountryValues(state.utility.countryValues),
    titles: retrieveTitleValues(state.utility.titleValues)
  };
};

export default connect(
  mapstateToProps,
  { createReference, fetchCountries, fetchTitleProperties, updateReference }
)(ReferenceModal);

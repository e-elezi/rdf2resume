import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Row, Col, Button } from "react-bootstrap";
import { Combobox } from "react-widgets";
import CustomTextarea from "../../../../core/CustomTextarea";
import CustomInput from "../../../../core/CustomInput";
import CustomCheckbox from "../../../../core/CustomCheckbox";
import { createEducation, updateEducation } from "../../../../../actions";
import {
  fetchCountries,
  fetchCompanySizes,
  fetchEduDegrees
} from "../../../../../actions/utilityActions";
import {
  retrieveCountryValues,
  retrieveCompanySizes,
  retrieveDegreeValues
} from "../../../../../utilities/utilityQueries";
import { generateUUID } from "../../../../../reducers/cvReducer";
import { getDataOfId } from '../../../../../utilities/utilityFunctions';

class EducationModal extends Component {
  state = {
    education: {
      "@id": "",
      "@type": "my0:Education",
      "my0:studiedIn": {
        "@id": ""
        },
      "my0:isEduCurrent": false,
      "my0:eduStartDate": "",
      "my0:eduGradDate": "",
      "my0:degreeType": "",
      "my0:eduMajor": "",
      "my0:eduMinor": "",
      "my0:eduDescription": ""
    },
    organization: {
      "@id": "",
      "@type": "my0:EducationalOrg",
        "my0:organizationName": "",
        "my0:organizationDescription": "",
        "my0:organizationPhoneNumber": "",
        "my0:organizationWebsite": "",
        "my0:organizationAddress": {
          "@id": ""
        }
    },
    address: {
      "@id": "",
      "@type": "Address",
      "my0:city" : "",
      "my0:country" : "",
      "my0:street" : "",
      "my0:postalCode" : ""
    }
  };

  componentWillMount() {
    this.props.fetchCompanySizes();
    this.props.fetchCountries();
    this.props.fetchEduDegrees();
    this.setInitialValues();
  }

  setInitialValues = () => {
    if (this.props.id !== null && this.props.isUpdate === true) {
      let inputRef = this.props.initialValues;
      let education = { ...this.state.education };
      education["@id"] = inputRef["@id"];
      education["my0:eduStartDate"] = inputRef["my0:eduStartDate"];
      education["my0:eduGradDate"] = inputRef["my0:eduGradDate"];
      education["my0:degreeType"] = inputRef["my0:degreeType"];
      education["my0:eduMajor"] = inputRef["my0:eduMajor"];
      education["my0:eduMinor"] = inputRef["my0:eduMinor"];
      education["my0:eduDescription"] = inputRef["my0:eduDescription"];
      education["my0:isEduCurrent"] = inputRef["my0:isEduCurrent"];
      education["my0:studiedIn"] = inputRef["my0:studiedIn"];
      this.setState({
        education
      });
      let orgref = getDataOfId(this.props.cv, education["my0:studiedIn"]['@id']);
      let organization = { ...this.state.organization };
      organization = orgref; 
      this.setState({
        organization
      });
      let address = { ...this.state.address };
      let orgadref = getDataOfId(this.props.cv, orgref['my0:organizationAddress']['@id']);
      address = orgadref;
      this.setState({
        address
      });
    }
  };

  clearForm = () => {
    if (!this.props.isUpdate) {
      this.setState({
        education: {
          "@id": "",
          "@type": "my0:Education",
          "my0:studiedIn": {
            "@id": ""
            },
          "my0:isEduCurrent": false,
          "my0:eduStartDate": "",
          "my0:eduGradDate": "",
          "my0:degreeType": "",
          "my0:eduMajor": "",
          "my0:eduMinor": "",
          "my0:eduDescription": ""
        },
        organization: {
          "@id": "",
          "@type": "my0:EducationalOrg",
            "my0:organizationName": "",
            "my0:organizationDescription": "",
            "my0:organizationPhoneNumber": "",
            "my0:organizationWebsite": "",
            "my0:organizationAddress": {
              "@id": ""
            }
        },
        address: {
          "@id": "",
          "@type": "Address",
          "my0:city" : "",
          "my0:country" : "",
          "my0:street" : "",
          "my0:postalCode" : ""
        }
      });
    } else {
      this.setInitialValues();
    }
  };

  handleCheckboxChange = e => {
    let education = { ...this.state.education };
    education[e.target.id] = e.target.checked;
    this.setState({
      education
    });
  };

  handleInputChange = e => {
    let obj = {...this.state[e.target.name]};
    let label = e.target.id;
    obj[label] = e.target.value;
    let kot = e.target.name;
    this.setState({
      [kot]: obj
    })
  };

  handleSelectChange = (value, id, name) => {
    let obj = {...this.state[name]};
    let label = id;
    obj[label] = value['@type'];
    this.setState({
      [name]: obj 
    })
  };

  handleSave = () => {
    var course_id = generateUUID();
    var organization_id = generateUUID();
    var organizationAddress_id = generateUUID();
    this.props.createEducation(
      {
        education: {
         ...this.state.education,
         "@id": "_:" + course_id,
         "my0:studiedIn": {
           "@id": "_:" + organization_id
         }
        },
         organization: {
          ...this.state.organization,
          "@id": "_:" + organization_id,
          "my0:organizationAddress": {
            "@id": "_:" + organizationAddress_id
          }
         },
         address: {
          ...this.state.address,
          "@id": "_:" + organizationAddress_id
         }
      }
    );
  };

  handleUpdate = () => {
    this.props.updateEducation(
      {
         education: this.state.education,
         organization: this.state.organization,
         address: this.state.address
      }
    );
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
  };

  render() {
    let {
      "my0:eduStartDate" : eduStartDate,
      "my0:eduGradDate" : eduGradDate,
      "my0:degreeType" : degreeType,
      "my0:eduMajor" : eduMajor,
      "my0:eduMinor" : eduMinor,
      "my0:eduDescription" : eduDescription,
      "my0:isEduCurrent" : isEduCurrent
    } = this.state.education;

    let {
      "my0:organizationName" : organizationName,
      "my0:organizationWebsite" : organizationWebsite,
      "my0:organizationDescription" : organizationDescription,
      "my0:organizationPhoneNumber" : organizationPhoneNumber,
    } = this.state.organization;

    let address = this.state.address;

    let { onHide } = this.props;
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
              <Col md={9}>
                {this.props.isUpdate ? "Update" : "Add New"} Education
              </Col>
              <Col md={2}>
                <CustomCheckbox
                  id="my0:isEduCurrent"
                  type="checkbox"
                  label="Current?"
                  checked={isEduCurrent}
                  handleChange={this.handleCheckboxChange}
                />
              </Col>
              <Col md={1} />
            </Row>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row style={{ alignItems: "flex-start" }}>
            <Col md={6} style={{ paddingRight: "25px" }}>
              <Row>
                <Col md={6}>
                  <CustomInput
                    id="my0:eduStartDate"
                    name="education"
                    label="From"
                    type="date"
                    value={eduStartDate}
                    handleChange={this.handleInputChange}
                  />
                </Col>
                <Col md={6}>
                  <CustomInput
                    id="my0:eduGradDate"
                    name="education"
                    label="To"
                    type="date"
                    value={eduGradDate}
                    handleChange={this.handleInputChange}
                  />
                </Col>
              </Row>
              <Row
                style={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  display: "flex",
                  marginLeft: "0px"
                }}
              >
                <CustomInput
                  id="my0:organizationName"
                  name="organization"
                  label="Educational Organization Name"
                  type="text"
                  value={organizationName}
                  handleChange={this.handleInputChange}
                />
                <CustomInput
                  id="my0:organizationWebsite"
                  name="organization"
                  label="Organization Website"
                  type="text"
                  value={organizationWebsite}
                  handleChange={this.handleInputChange}
                />
                <Row>
                  <Col sm={6}>
                    <CustomInput
                      id="my0:postalCode"
                      name="address"
                      label="Postal Code"
                      value={address["my0:postalCode"]}
                      handleChange={this.handleInputChange}
                    />
                  </Col>
                  <Col sm={6}>
                    <CustomInput
                      id="my0:city"
                      name="address"
                      label="City"
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
                  <label className="label-rw">Organization Country</label>
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
                      this.handleSelectChange(
                        value,
                        "my0:country",
                        "address"
                      )
                    }
                  />
                </Row>
                <CustomInput
                  id="my0:organizationPhoneNumber"
                  name="organization"
                  label="Organization Phone Number"
                  value={organizationPhoneNumber}
                  handleChange={this.handleInputChange}
                />
                <div style={{ marginTop: "10px" }}>
                  <CustomTextarea
                    id="my0:organizationDescription"
                    name="organization"
                    label="Organization Description"
                    value={organizationDescription}
                    handleChange={this.handleInputChange}
                  />
                </div>
              </Row>
            </Col>
            <Col md={6}>
              <CustomInput
                id="my0:eduMajor"
                label="Major"
                name="education"
                type="text"
                value={eduMajor}
                handleChange={this.handleInputChange}
              />
              <CustomInput
                id="my0:eduMinor"
                label="Minor"
                name="education"
                type="text"
                value={eduMinor}
                handleChange={this.handleInputChange}
              />
              <label className="label-rw">Degree type</label>
              <Combobox
                name="my0:degreeType"
                placeholder="Select degree"
                data={this.props.eduDegrees}
                valueField="@type"
                textField="value"
                value={degreeType}
                caseSensitive={false}
                minLength={3}
                filter="contains"
                onChange={value => this.handleSelectChange(value, "my0:degreeType", "education")}
              />
              <div style={{ marginTop: "10px" }}>
                <CustomTextarea
                  id="my0:eduDescription"
                  name="education"
                  label="Education Description"
                  value={eduDescription}
                  handleChange={this.handleInputChange}
                />
              </div>
            </Col>
          </Row>
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
    initialValues: getDataOfId(state.cv, ownProps.id),
    cv: state.cv,
    countries: retrieveCountryValues(state.utility.countryValues),
    companySizes: retrieveCompanySizes(state.utility.companySizeValues),
    eduDegrees: retrieveDegreeValues(state.utility.eduDegreeValues)
  };
};

export default connect(
  mapstateToProps,
  {
    createEducation,
    fetchCountries,
    fetchCompanySizes,
    fetchEduDegrees,
    updateEducation
  }
)(EducationModal);

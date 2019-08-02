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

class EducationModal extends Component {
  state = {
    education: {
      "@type": "my0:Education",
      "my0:studiedIn": {
        "@type": "my0:EducationalOrg",
        "my0:organizationName": "",
        "my0:organizationAddress": {
          "@type": "Address",
          "my0:city" : "",
          "my0:country" : "",
          "my0:street" : "",
          "my0:postalCode" : ""
        },
        "my0:organizationDescription": "",
        "my0:organizationPhoneNumber": "",
        "my0:organizationWebsite": ""
      },
      "my0:isEduCurrent": false,
      "my0:eduStartDate": "",
      "my0:eduGradDate": "",
      "my0:degreeType": "",
      "my0:eduMajor": "",
      "my0:eduMinor": "",
      "my0:eduDescription": ""
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
      education.id = inputRef.id;
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
    }
  };

  clearForm = () => {
    const hist = {
      "@type": "my0:Education",
      "my0:studiedIn": {
        "@type": "my0:EducationalOrg",
        "my0:organizationName": "",
        "my0:organizationAddress": {
          "@type": "Address",
          "my0:city" : "",
          "my0:country" : "",
          "my0:street" : "",
          "my0:postalCode" : ""
        },
        "my0:organizationDescription": "",
        "my0:organizationPhoneNumber": "",
        "my0:organizationWebsite": ""
      },
      "my0:isEduCurrent": false,
      "my0:eduStartDate": "",
      "my0:eduGradDate": "",
      "my0:degreeType": "",
      "my0:eduMajor": "",
      "my0:eduMinor": "",
      "my0:eduDescription": ""
    };
    if (!this.props.isUpdate) {
      this.setState({
        education: hist
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
    let education = { ...this.state.education };
    let label = e.target.id;
      if (label.indexOf("studiedIn") >= 0) {
        let sublabel = label.substr(10);
        let mybj = education["my0:studiedIn"];
        mybj[sublabel] = e.target.value;
        education["my0:studiedIn"] = mybj;
        this.setState({
          education
        });
      } else if (label.indexOf("organizationAddress") >= 0) {
        let sublabel = label.substr(20);
        let mybj = education["my0:studiedIn"]["my0:organizationAddress"];
        mybj[sublabel] = e.target.value;
        education["my0:studiedIn"]["my0:organizationAddress"] = mybj;
        this.setState({
          education
        });
      } else {
      education[label] = e.target.value;
      this.setState({
        education
      });
    }
  };

  handleSelectChange = (value, id) => {
    let education = { ...this.state.education };
    let label = id;
      if (label.indexOf("studiedIn") >= 0) {
        let sublabel = label.substr(10);
        let mybj = education["my0:studiedIn"];
        mybj[sublabel] = value;
        education["my0:studiedIn"] = mybj;
        this.setState({
          education
        });
    } else  if (label.indexOf("organizationAddress") >= 0) {
      let sublabel = label.substr(20);
        let mybj = education["my0:studiedIn"]["my0:organizationAddress"];
        mybj[sublabel] = value;
        education["my0:studiedIn"]["my0:organizationAddress"] = mybj;
        this.setState({
          education
        });
    } else {
      education[label] = value;
      this.setState({
        education
      });
    }
  };

  handleSave = () => {
    this.props.createEducation({
      ...this.state.education,
      id: Math.round(Date.now() + Math.random())
    });
  };

  handleUpdate = () => {
    this.props.updateEducation(this.state.education);
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
      "my0:organizationAddress" : organizationAddress,
      "my0:organizationWebsite" : organizationWebsite,
      "my0:organizationDescription" : organizationDescription,
      "my0:organizationPhoneNumber" : organizationPhoneNumber,
    } = this.state.education['my0:studiedIn'];

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
                    label="From"
                    type="date"
                    value={eduStartDate}
                    handleChange={this.handleInputChange}
                  />
                </Col>
                <Col md={6}>
                  <CustomInput
                    id="my0:eduGradDate"
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
                  id="studiedIn.my0:organizationName"
                  label="Educational Organization Name"
                  type="text"
                  value={organizationName}
                  handleChange={this.handleInputChange}
                />
                <CustomInput
                  id="studiedIn.my0:organizationWebsite"
                  label="Organization Website"
                  type="text"
                  value={organizationWebsite}
                  handleChange={this.handleInputChange}
                />
                <Row>
                  <Col sm={6}>
                    <CustomInput
                      id="organizationAddress.my0:postalCode"
                      label="Postal Code"
                      value={organizationAddress["my0:postalCode"]}
                      handleChange={this.handleInputChange}
                    />
                  </Col>
                  <Col sm={6}>
                    <CustomInput
                      id="organizationAddress.my0:city"
                      label="City"
                      value={organizationAddress["my0:city"]}
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
                    name="organizationAddress.my0:country"
                    placeholder="Select country"
                    data={this.props.countries}
                    textField="value"
                    valueField="@type"
                    value={organizationAddress["my0:country"]}
                    caseSensitive={false}
                    minLength={3}
                    filter="contains"
                    onChange={value =>
                      this.handleSelectChange(
                        value,
                        "organizationAddress.my0:country"
                      )
                    }
                  />
                </Row>
                <CustomInput
                  id="studiedIn.my0:organizationPhoneNumber"
                  label="Organization Phone Number"
                  value={organizationPhoneNumber}
                  handleChange={this.handleInputChange}
                />
                <div style={{ marginTop: "10px" }}>
                  <CustomTextarea
                    id="studiedIn.my0:organizationDescription"
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
                type="text"
                value={eduMajor}
                handleChange={this.handleInputChange}
              />
              <CustomInput
                id="my0:eduMinor"
                label="Minor"
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
                onChange={value => this.handleSelectChange(value, "my0:degreeType")}
              />
              <div style={{ marginTop: "10px" }}>
                <CustomTextarea
                  id="my0:eduDescription"
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
    initialValues: state.cv["my0:hasEducation"][ownProps.id],
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

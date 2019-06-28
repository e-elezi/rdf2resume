import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Row, Col, Button } from "react-bootstrap";
import { Combobox } from "react-widgets";
import CustomTextarea from "../../../../core/CustomTextarea";
import CustomInput from "../../../../core/CustomInput";
import CustomCheckbox from "../../../../core/CustomCheckbox";
import { updateEducation } from "../../../../../actions";
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

class EducationUpdateModal extends Component {
  state = {
    education: {
      eduStartDate: "",
      eduGradDate: "",
      degreeType: "",
      eduMajor: "",
      eduMinor: "",
      eduDescription: "",
      isEduCurrent: false,
      EducationalOrg: {
        organizationName: "",
        organizationAddress: {
          street: "",
          postalCode: "",
          city: "",
          country: ""
        },
        organizationDescription: "",
        organizationPhoneNumber: "",
        organizationWebsite: ""
      }
    }
  };

  componentWillMount() {
    this.props.fetchCompanySizes();
    this.props.fetchCountries();
    this.props.fetchEduDegrees();
    if (this.props.id !== null) {
      let inputRef = this.props.initialValues;
      let education = { ...this.state.education };
      education.id = inputRef.id;
      education.eduStartDate = inputRef.eduStartDate;
      education.eduGradDate = inputRef.eduGradDate;
      education.degreeType = inputRef.degreeType;
      education.eduMajor = inputRef.eduMajor;
      education.eduMinor = inputRef.eduMinor;
      education.eduDescription = inputRef.eduDescription;
      education.isEduCurrent = inputRef.isEduCurrent;
      education.EducationalOrg = inputRef.EducationalOrg;
      this.setState({
        education
      });
    }
  }

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
    if (label.indexOf("EducationalOrg") >= 0) {
      let sublabel = label.substr(15);
      if (sublabel.indexOf("organizationAddress") >= 0) {
        let subsublabel = sublabel.substr(20);
        let mybj = education["EducationalOrg"]["organizationAddress"];
        mybj[subsublabel] = e.target.value;
        education["EducationalOrg"]["organizationAddress"] = mybj;
        this.setState({
          education
        });
      } else {
        let mybj = education["EducationalOrg"];
        mybj[sublabel] = e.target.value;
        education["EducationalOrg"] = mybj;
        this.setState({
          education
        });
      }
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
    if (label.indexOf("EducationalOrg") >= 0) {
      let sublabel = label.substr(15);
      if (sublabel.indexOf("organizationAddress") >= 0) {
        let subsublabel = sublabel.substr(20);
        let mybj = education["EducationalOrg"]["organizationAddress"];
        mybj[subsublabel] = value.trim();
        education["EducationalOrg"]["organizationAddress"] = mybj;
        this.setState({
          education
        });
      } else {
        let mybj = education["EducationalOrg"];
        mybj[sublabel] = value.trim();
        education["EducationalOrg"] = mybj;
        this.setState({
          education
        });
      }
    } else {
      education[label] = value.trim();
      this.setState({
        education
      });
    }
  };

  handleUpdate = () => {
    this.props.updateEducation(this.state.education);
  };

  render() {
    let {
      eduStartDate,
      eduGradDate,
      degreeType,
      eduMajor,
      eduMinor,
      eduDescription,
      isEduCurrent,
      EducationalOrg
    } = this.state.education;
    let { onHide } = this.props;
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
              <Col md={9}>Add New Education</Col>
              <Col md={2}>
                <CustomCheckbox
                  id="isEduCurrent"
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
                    id="eduStartDate"
                    label="From"
                    type="date"
                    value={eduStartDate}
                    handleChange={this.handleInputChange}
                  />
                </Col>
                <Col md={6}>
                  <CustomInput
                    id="eduGradDate"
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
                  id="EducationalOrg.organizationName"
                  label="Educational Organization Name"
                  type="text"
                  value={EducationalOrg.organizationName}
                  handleChange={this.handleInputChange}
                />
                <CustomInput
                  id="EducationalOrg.organizationWebsite"
                  label="Organization Website"
                  type="text"
                  value={EducationalOrg.organizationWebsite}
                  handleChange={this.handleInputChange}
                />
                <Row>
                  <Col sm={6}>
                    <CustomInput
                      id="EducationalOrg.organizationAddress.postalCode"
                      label="Postal Code"
                      value={EducationalOrg.organizationAddress.postalCode}
                      handleChange={this.handleInputChange}
                    />
                  </Col>
                  <Col sm={6}>
                    <CustomInput
                      id="EducationalOrg.organizationAddress.city"
                      label="City"
                      value={EducationalOrg.organizationAddress.city}
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
                    name="EducationalOrg.organizationAddress.country"
                    placeholder="Select country"
                    data={this.props.countries}
                    value={EducationalOrg.organizationAddress.country}
                    caseSensitive={false}
                    minLength={3}
                    filter="contains"
                    onChange={value =>
                      this.handleSelectChange(
                        value,
                        "EducationalOrg.organizationAddress.country"
                      )
                    }
                  />
                </Row>
                <CustomInput
                  id="EducationalOrg.organizationPhoneNumber"
                  label="Organization Phone Number"
                  value={EducationalOrg.organizationPhoneNumber}
                  handleChange={this.handleInputChange}
                />
                <div style={{ marginTop: "10px" }}>
                  <CustomTextarea
                    id="EducationalOrg.organizationDescription"
                    label="Organization Description"
                    value={EducationalOrg.organizationDescription}
                    handleChange={this.handleInputChange}
                  />
                </div>
              </Row>
            </Col>
            <Col md={6}>
              <CustomInput
                id="eduMajor"
                label="Major"
                type="text"
                value={eduMajor}
                handleChange={this.handleInputChange}
              />
              <CustomInput
                id="eduMinor"
                label="Minor"
                type="text"
                value={eduMinor}
                handleChange={this.handleInputChange}
              />
              <label className="label-rw">Degree type</label>
              <Combobox
                name="degreeType"
                placeholder="Select degree"
                data={this.props.eduDegrees}
                value={degreeType}
                caseSensitive={false}
                minLength={3}
                filter="contains"
                onChange={value => this.handleSelectChange(value, "degreeType")}
              />
              <div style={{ marginTop: "10px" }}>
                <CustomTextarea
                  id="eduDescription"
                  label="Education Description"
                  value={eduDescription}
                  handleChange={this.handleInputChange}
                />
              </div>
            </Col>
          </Row>
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
    initialValues: state.cv.education[ownProps.id],
    countries: retrieveCountryValues(state.utility.countryValues),
    companySizes: retrieveCompanySizes(state.utility.companySizeValues),
    eduDegrees: retrieveDegreeValues(state.utility.eduDegreeValues)
  };
};

export default connect(
  mapStateToProps,
  { updateEducation, fetchCountries, fetchCompanySizes, fetchEduDegrees }
)(EducationUpdateModal);

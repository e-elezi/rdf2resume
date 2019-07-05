import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Row, Col, Button } from "react-bootstrap";
import { Combobox } from "react-widgets";
import CustomTextarea from "../../../../core/CustomTextarea";
import CustomInput from "../../../../core/CustomInput";
import CustomCheckbox from "../../../../core/CustomCheckbox";
import { createWorkHistory, updateWorkHistory } from "../../../../../actions";
import {
  fetchCVJobModes,
  fetchCVCareerLevels,
  fetchCountries,
  fetchCompanySizes
} from "../../../../../actions/utilityActions";
import {
  retrieveCountryValues,
  retrieveCareerLevels,
  retrieveJobModes,
  retrieveCompanySizes
} from "../../../../../utilities/utilityQueries";

class WorkHistoryModal extends Component {
  state = {
    workHistory: {
      startDate: "",
      endDate: "",
      jobTitle: "",
      jobDescription: "",
      careerLevel: "",
      jobMode: "",
      isCurrent: false,
      Company: {
        organizationName: "",
        organizationAddress: {
          street: "",
          postalCode: "",
          city: "",
          country: ""
        },
        organizationDescription: "",
        organizationPhoneNumber: "",
        organizationWebsite: "",
        companyIndustry: ""
      }
    },
    CompanyIndustryValues: []
  };

  getCompanyIndustryValues = () => {
    return ["Education", "Agriculture", "Computer Science", "Logistics"];
  };

  componentDidMount() {
    this.props.fetchCVCareerLevels();
    this.props.fetchCVJobModes();
    this.props.fetchCompanySizes();
    this.props.fetchCountries();
    this.setInitialValues();
  }

  setInitialValues = () => {
    if (this.props.id !== null && this.props.isUpdate === true) {
      let inputRef = this.props.initialValues;
      let workHistory = { ...this.state.workHistories };
      workHistory.id = inputRef.id;
      workHistory.startDate = inputRef.startDate;
      workHistory.endDate = inputRef.endDate;
      workHistory.jobTitle = inputRef.jobTitle;
      workHistory.jobDescription = inputRef.jobDescription;
      workHistory.jobMode = inputRef.jobMode;
      workHistory.careerLevel = inputRef.careerLevel;
      workHistory.isCurrent = inputRef.isCurrent;
      workHistory.Company = inputRef.Company;
      this.setState({
        workHistory
      });
    }
  };

  clearForm = () => {
    const hist = {
      startDate: "",
      endDate: "",
      jobTitle: "",
      jobDescription: "",
      careerLevel: "",
      jobMode: "",
      isCurrent: false,
      Company: {
        organizationName: "",
        organizationAddress: {
          street: "",
          postalCode: "",
          city: "",
          country: ""
        },
        organizationDescription: "",
        organizationPhoneNumber: "",
        organizationWebsite: "",
        companyIndustry: ""
      }
    };
    if (!this.props.isUpdate) {
      this.setState({
        workHistory: hist
      });
    } else {
      this.setInitialValues();
    }
  };

  handleCheckboxChange = e => {
    let workHistory = { ...this.state.workHistory };
    workHistory[e.target.id] = e.target.checked;
    this.setState({
      workHistory
    });
  };

  handleInputChange = e => {
    let workHistory = { ...this.state.workHistory };
    let label = e.target.id;
    if (label.indexOf("Company") >= 0) {
      let sublabel = label.substr(8);
      if (sublabel.indexOf("organizationAddress") >= 0) {
        let subsublabel = sublabel.substr(20);
        let mybj = workHistory["Company"]["organizationAddress"];
        mybj[subsublabel] = e.target.value;
        workHistory["Company"]["organizationAddress"] = mybj;
        this.setState({
          workHistory
        });
      } else {
        let mybj = workHistory["Company"];
        mybj[sublabel] = e.target.value;
        workHistory["Company"] = mybj;
        this.setState({
          workHistory
        });
      }
    } else {
      workHistory[label] = e.target.value;
      this.setState({
        workHistory
      });
    }
  };

  handleSelectChange = (value, id) => {
    let workHistory = { ...this.state.workHistory };
    let label = id;
    if (label.indexOf("Company") >= 0) {
      let sublabel = label.substr(8);
      if (sublabel.indexOf("organizationAddress") >= 0) {
        let subsublabel = sublabel.substr(20);
        let mybj = workHistory["Company"]["organizationAddress"];
        mybj[subsublabel] = value.trim();
        workHistory["Company"]["organizationAddress"] = mybj;
        this.setState({
          workHistory
        });
      } else {
        let mybj = workHistory["Company"];
        mybj[sublabel] = value.trim();
        workHistory["Company"] = mybj;
        this.setState({
          workHistory
        });
      }
    } else {
      workHistory[label] = value.trim();
      this.setState({
        workHistory
      });
    }
  };

  handleSave = e => {
    e.preventDefault();
    this.props.createWorkHistory({
      ...this.state.workHistory,
      id: Math.round(Date.now() + Math.random())
    });
  };

  handleUpdate = e => {
    e.preventDefault();
    this.props.updateWorkHistory(this.state.workHistory);
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
      startDate,
      endDate,
      jobTitle,
      jobMode,
      careerLevel,
      jobDescription,
      isCurrent,
      Company
    } = this.state.workHistory;
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
        <form>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <Row>
                <Col md={9}>
                  {this.props.isUpdate ? "Update" : "Add New"} Work Experience
                </Col>
                <Col md={2}>
                  <CustomCheckbox
                    id="isCurrent"
                    type="checkbox"
                    label="Current?"
                    checked={isCurrent}
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
                      id="startDate"
                      label="From"
                      type="date"
                      value={startDate}
                      handleChange={this.handleInputChange}
                    />
                  </Col>
                  <Col md={6} style={{ paddingRight: "0" }}>
                    <CustomInput
                      id="endDate"
                      label="To"
                      type="date"
                      value={endDate}
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
                  <div style={{ marginTop: "5px", width: "100%" }}>
                    <CustomInput
                      id="Company.organizationName"
                      label="Company Name"
                      type="text"
                      value={Company.organizationName}
                      handleChange={this.handleInputChange}
                    />
                  </div>
                  <div style={{ marginTop: "5px", width: "100%" }}>
                    <CustomInput
                      id="Company.organizationWebsite"
                      label="Company Website"
                      type="text"
                      value={Company.organizationWebsite}
                      handleChange={this.handleInputChange}
                    />
                  </div>
                  <CustomInput
                    id="Company.organizationPhoneNumber"
                    label="Company Phone Number"
                    value={Company.organizationPhoneNumber}
                    handleChange={this.handleInputChange}
                  />
                  <Row>
                    <Col sm={6}>
                      <CustomInput
                        id="Company.organizationAddress.postalCode"
                        label="Company Postal Code"
                        value={Company.organizationAddress.postalCode}
                        handleChange={this.handleInputChange}
                      />
                    </Col>
                    <Col sm={6}>
                      <CustomInput
                        id="Company.organizationAddress.city"
                        label="Company City"
                        value={Company.organizationAddress.city}
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
                    <label className="label-rw">Company Country</label>
                    <Combobox
                      name="Company.organizationAddress.country"
                      placeholder="Select country"
                      data={this.props.countries}
                      value={Company.organizationAddress.country}
                      caseSensitive={false}
                      minLength={3}
                      filter="contains"
                      onChange={value =>
                        this.handleSelectChange(
                          value,
                          "Company.organizationAddress.country"
                        )
                      }
                    />
                  </Row>
                  <Row
                    style={{
                      width: "100%",
                      justifyContent: "left",
                      marginLeft: "0px",
                      marginBottom: "8px"
                    }}
                  >
                    <label className="label-rw">Company Industry</label>
                    <Combobox
                      name="Company.organizationIndustry"
                      placeholder="Select country"
                      data={this.state.CompanyIndustryValues}
                      value={Company.organizationIndustry}
                      caseSensitive={false}
                      minLength={3}
                      filter="contains"
                      onChange={value =>
                        this.handleSelectChange(
                          value,
                          "Company.organizationIndustry"
                        )
                      }
                    />
                  </Row>
                  <div style={{ width: "100%" }}>
                    <CustomTextarea
                      id="Company.organizationDescription"
                      label="Company Description"
                      value={Company.organizationDescription}
                      handleChange={this.handleInputChange}
                    />
                  </div>
                </Row>
              </Col>
              <Col md={6}>
                <CustomInput
                  id="jobTitle"
                  label="Occupation or Title held"
                  type="text"
                  value={jobTitle}
                  handleChange={this.handleInputChange}
                />
                <Row
                  style={{
                    width: "100%",
                    justifyContent: "left",
                    marginLeft: "0px",
                    marginBottom: "8px"
                  }}
                >
                  <label className="label-rw">Job Mode</label>
                  <Combobox
                    name="jobMode"
                    placeholder="Select job mode"
                    data={this.props.jobmodes}
                    value={jobMode}
                    caseSensitive={false}
                    minLength={3}
                    filter="contains"
                    onChange={value =>
                      this.handleSelectChange(value, "jobMode")
                    }
                  />
                </Row>
                <Row
                  style={{
                    width: "100%",
                    justifyContent: "left",
                    marginLeft: "0px",
                    marginBottom: "8px"
                  }}
                >
                  <label className="label-rw">Career Level</label>
                  <Combobox
                    name="careerLevel"
                    placeholder="Select career level"
                    data={this.props.careerlevels}
                    value={careerLevel}
                    caseSensitive={false}
                    minLength={3}
                    filter="contains"
                    onChange={value =>
                      this.handleSelectChange(value, "careerLevel")
                    }
                  />
                </Row>
                <CustomTextarea
                  id="jobDescription"
                  label="Job Description"
                  value={jobDescription}
                  handleChange={this.handleInputChange}
                />
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
        </form>
      </Modal>
    );
  }
}

const mapstateToProps = (state, ownProps) => {
  return {
    initialValues: state.cv.workHistory[ownProps.id],
    countries: retrieveCountryValues(state.utility.countryValues),
    jobmodes: retrieveJobModes(state.utility.jobModeValues),
    careerlevels: retrieveCareerLevels(state.utility.careerLevelValues),
    companysizes: retrieveCompanySizes(state.utility.companySizeValues)
  };
};

export default connect(
  mapstateToProps,
  {
    createWorkHistory,
    updateWorkHistory,
    fetchCVJobModes,
    fetchCVCareerLevels,
    fetchCountries,
    fetchCompanySizes
  }
)(WorkHistoryModal);

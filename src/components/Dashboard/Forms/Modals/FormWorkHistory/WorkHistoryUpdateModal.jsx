import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Row, Col, Button } from "react-bootstrap";
import CustomSelect from "../../../../core/CustomSelect";
import CustomTextarea from "../../../../core/CustomTextarea";
import CustomInput from "../../../../core/CustomInput";
import CustomCheckbox from "../../../../core/CustomCheckbox";
import { updateWorkHistory } from "../../../../../actions";
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

class WorkHistoryUpdateModal extends Component {
  state = {
    workHistory: {
      id: "",
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
    // careerLevelValues: [],
    // jobModeValues: [],
    CompanyIndustryValues: []
    // CompanySizeValues: [],
    // CompanyCountryValues: []
  };

  // getJobModeValues = () => {
  //   return ["Employee Full time", "Employee Part time", "Contractor", "Intern"];
  // };

  // getJobCareerLevels = () => {
  //   return [
  //     "Student (high school)",
  //     "Student (graduate/undergraduate)",
  //     "Entry level (less than 2 years of experience)",
  //     "Mid-career (2+ years of experience)",
  //     "Management (manager/director of staff)",
  //     "Executive (SVP, EVP, VP",
  //     "Senior Executive (president / CEO)"
  //   ];
  // };

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

  // getCompanySizeValues = () => {
  //   return ["Small", "Medium", "Large"];
  // };

  getCompanyIndustryValues = () => {
    return ["Education", "Agriculture", "Computer Science", "Logistics"];
  };

  componentWillMount() {
    this.props.fetchCVCareerLevels();
    this.props.fetchCVJobModes();
    this.props.fetchCompanySizes();
    this.props.fetchCountries();
    if (this.props.id !== null) {
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
    this.setState({
      // jobModeValues: this.getJobModeValues(),
      // careerLevelValues: this.getJobCareerLevels(),
      // CompanyCountryValues: this.getCountries(),
      // CompanySizeValues: this.getCompanySizeValues(),
      CompanyIndustryValues: this.getCompanyIndustryValues()
    });
  }

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

  handleSelectChange = (e, id) => {
    let workHistory = { ...this.state.workHistory };
    let label = id;
    if (label.indexOf("Company") >= 0) {
      let sublabel = label.substr(8);
      if (sublabel.indexOf("organizationAddress") >= 0) {
        let subsublabel = sublabel.substr(20);
        let mybj = workHistory["Company"]["organizationAddress"];
        mybj[subsublabel] = e.target.text.trim();
        workHistory["Company"]["organizationAddress"] = mybj;
        this.setState({
          workHistory
        });
      } else {
        let mybj = workHistory["Company"];
        mybj[sublabel] = e.target.text.trim();
        workHistory["Company"] = mybj;
        this.setState({
          workHistory
        });
      }
    } else {
      workHistory[label] = e.target.text.trim();
      this.setState({
        workHistory
      });
    }
  };

  handleUpdate = () => {
    this.props.updateWorkHistory(this.state.workHistory);
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
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        className="reference-modal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <Row>
              <Col md={9}>Update Work Experience</Col>
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
                <Col md={6}>
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
                <CustomInput
                  id="Company.organizationName"
                  label="Company Name"
                  type="text"
                  value={Company.organizationName}
                  handleChange={this.handleInputChange}
                />
                <CustomInput
                  id="Company.organizationWebsite"
                  label="Company Website"
                  type="text"
                  value={Company.organizationWebsite}
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
                <CustomSelect
                  placeholder="Company Country"
                  id="Company.organizationAddress.country"
                  value={Company.organizationAddress.country}
                  items={this.props.countries}
                  handleSelectChange={this.handleSelectChange}
                />
                <CustomInput
                  id="Company.organizationPhoneNumber"
                  label="Company Phone Number"
                  value={Company.organizationPhoneNumber}
                  handleChange={this.handleInputChange}
                />
                <CustomSelect
                  placeholder="Company Industry"
                  id="Company.organizationIndustry"
                  value={Company.organizationIndustry}
                  items={this.state.CompanyIndustryValues}
                  handleSelectChange={this.handleSelectChange}
                />
                <CustomTextarea
                  id="Company.organizationDescription"
                  label="Company Description"
                  value={Company.organizationDescription}
                  handleChange={this.handleInputChange}
                />
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
              <CustomSelect
                placeholder="Job Mode"
                id="jobMode"
                value={jobMode}
                items={this.props.jobModes}
                handleSelectChange={this.handleSelectChange}
              />
              <CustomSelect
                placeholder="Career Level"
                id="careerLevel"
                value={careerLevel}
                items={this.props.careerLevels}
                handleSelectChange={this.handleSelectChange}
              />
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
    initialValues: state.cv.workHistory[ownProps.id],
    countries: retrieveCountryValues(state.utility.countryValues),
    jobModes: retrieveJobModes(state.utility.jobModeValues),
    careerLevels: retrieveCareerLevels(state.utility.careerLevelValues),
    companySizes: retrieveCompanySizes(state.utility.companySizeValues)
  };
};

export default connect(
  mapStateToProps,
  {
    updateWorkHistory,
    fetchCVJobModes,
    fetchCVCareerLevels,
    fetchCountries,
    fetchCompanySizes
  }
)(WorkHistoryUpdateModal);

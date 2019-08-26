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
import { generateUUID } from "../../../../../reducers/cvReducer";
import { getDataOfId } from '../../../../../utilities/utilityFunctions';

class WorkHistoryModal extends Component {
  state = {
    workHistory: {
      "@type": "my0:WorkHistory",
      "my0:startDate": "",
      "my0:endDate": "",
      "my0:jobTitle": "",
      "my0:jobDescription": "",
      "my0:careerLevel": "",
      "my0:jobMode": "",
      "my0:isCurrent": false,
      "my0:employedIn": {
        "@type": "my0:Company",
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
        "my0:organizationWebsite": "",
        "my0:companyIndustry": ""
      }
    },
    CompanyIndustryValues: []
  };

  getCompanyIndustryValues = () => {
    return [
      {
        "@type": "Education",
        "value": "Education"
      },
      {
        "@type": "Agriculture",
        "value": "Agriculture"
      },
      {
        "@type": "Computer Science",
        "value": "Computer Science"
      },
      {
        "@type": "Logistics",
        "value": "Logistics"
      }];;
  };

  componentDidMount() {
    this.props.fetchCVCareerLevels();
    this.props.fetchCVJobModes();
    this.props.fetchCompanySizes();
    this.props.fetchCountries();
    this.setState({
      CompanyIndustryValues: this.getCompanyIndustryValues()
    })
    this.setInitialValues();
  }

  setInitialValues = () => {
    if (this.props.id !== null && this.props.isUpdate === true) {
      let inputRef = this.props.initialValues;
      let workHistory = { ...this.state.workHistories };
      workHistory["@type"] = "my0:WorkHistory";
      workHistory["my0:startDate"] = inputRef["my0:startDate"];
      workHistory["my0:endDate"] = inputRef["my0:endDate"];
      workHistory["my0:jobTitle"] = inputRef["my0:jobTitle"];
      workHistory["my0:jobDescription"] = inputRef["my0:jobDescription"];
      workHistory["my0:jobMode"] = inputRef["my0:jobMode"];
      workHistory["my0:careerLevel"] = inputRef["my0:careerLevel"];
      workHistory["my0:isCurrent"] = inputRef["my0:isCurrent"];
      workHistory["my0:employedIn"] = inputRef["my0:employedIn"];
      this.setState({
        workHistory
      });
    }
  };

  clearForm = () => {
    if (!this.props.isUpdate) {
      this.setState({
        workHistory: {
          "@type": "my0:WorkHistory",
          "my0:startDate": "",
          "my0:endDate": "",
          "my0:jobTitle": "",
          "my0:jobDescription": "",
          "my0:careerLevel": "",
          "my0:jobMode": "",
          "my0:isCurrent": false,
          "my0:employedIn": {
            "@type": "my0:Company",
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
            "my0:organizationWebsite": "",
            "my0:companyIndustry": ""
          }
        }
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
    let obj = {...this.state.workHistory};
    let label = e.target.id;
    if(e.target.name === "organization") {
      obj['my0:employedIn'][label] = e.target.value;
    } else if(e.target.name === "address") {
      obj['my0:employedIn']['my0:organizationAddress'][label] = e.target.value;
    } else {
      obj[label] = e.target.value;
    }
    this.setState({
      workHistory: obj
    })
  };

  handleSelectChange = (value, id, name) => {
    let obj = {...this.state.workHistory};
    let label = id;
    if(name === "organization") {
      obj['my0:employedIn'][label] = value['@type'];
    } else if(name === "address") {
      obj['my0:employedIn']['my0:organizationAddress'][label] = value['@type'];
    } else {
      obj[label] = value['@type'];
    }
    this.setState({
      workHistory: obj
    })

  };

  handleSave = e => {
    e.preventDefault();
    this.props.createWorkHistory(
        this.state.workHistory
    );
  };

  handleUpdate = e => {
    e.preventDefault();
    this.props.updateWorkHistory(
      {
         object: this.state.workHistory,
         index: this.props.id
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
      "my0:startDate" : startDate,
      "my0:endDate" : endDate,
      "my0:jobTitle" : jobTitle,
      "my0:jobMode" : jobMode,
      "my0:careerLevel" : careerLevel,
      "my0:jobDescription" : jobDescription,
      "my0:isCurrent" : isCurrent,
      "my0:employedIn" : employedIn
    } = this.state.workHistory;

    let {
      "my0:organizationName" : organizationName,
      "my0:companyIndustry" : companyIndustry,
      "my0:organizationWebsite" : organizationWebsite,
      "my0:organizationDescription" : organizationDescription,
      "my0:organizationPhoneNumber" : organizationPhoneNumber,
      "my0:organizationAddress" : address
    } = employedIn;

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
                    id="my0:isCurrent"
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
                      id="my0:startDate"
                      name="workHistory"
                      label="From"
                      type="date"
                      value={startDate}
                      handleChange={this.handleInputChange}
                    />
                  </Col>
                  <Col md={6} style={{ paddingRight: "0" }}>
                    <CustomInput
                      id="my0:endDate"
                      label="To"
                      name="workHistory"
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
                      id="my0:organizationName"
                      name="organization"
                      label="Company Name"
                      type="text"
                      value={organizationName}
                      handleChange={this.handleInputChange}
                    />
                  </div>
                  <div style={{ marginTop: "5px", width: "100%" }}>
                    <CustomInput
                      id="my0:organizationWebsite"
                      name="organization"
                      label="Company Website"
                      type="text"
                      value={organizationWebsite}
                      handleChange={this.handleInputChange}
                    />
                  </div>
                  <CustomInput
                    id="my0:organizationPhoneNumber"
                    name="organization"
                    label="Company Phone Number"
                    value={organizationPhoneNumber}
                    handleChange={this.handleInputChange}
                  />
                  <Row>
                    <Col sm={6}>
                      <CustomInput
                        id="my0:postalCode"
                        label="Company Postal Code"
                        name="address"
                        value={address["my0:postalCode"]}
                        handleChange={this.handleInputChange}
                      />
                    </Col>
                    <Col sm={6}>
                      <CustomInput
                        id="my0:city"
                        name="address"
                        label="Company City"
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
                    <label className="label-rw">Company Country</label>
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
                      name="my0:companyIndustry"
                      placeholder="Select industry"
                      data={this.state.CompanyIndustryValues}
                      value={companyIndustry}
                      textField="value"
                      valueField="@type"
                      caseSensitive={false}
                      minLength={3}
                      filter="contains"
                      onChange={value =>
                        this.handleSelectChange(
                          value,
                          "my0:companyIndustry",
                          "organization"
                        )
                      }
                    />
                  </Row>
                  <div style={{ width: "100%" }}>
                    <CustomTextarea
                      id="my0:organizationDescription"
                      name="organization"
                      label="Company Description"
                      value={organizationDescription}
                      handleChange={this.handleInputChange}
                    />
                  </div>
                </Row>
              </Col>
              <Col md={6}>
                <CustomInput
                  id="my0:jobTitle"
                  name="workHistory"
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
                    name="my0:jobMode"
                    placeholder="Select job mode"
                    data={this.props.jobmodes}
                    textField="value"
                    valueField="@type"
                    value={jobMode}
                    caseSensitive={false}
                    minLength={3}
                    filter="contains"
                    onChange={value =>
                      this.handleSelectChange(value, "my0:jobMode", "workHistory")
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
                    name="my0:careerLevel"
                    placeholder="Select career level"
                    data={this.props.careerlevels}
                    textField="value"
                    valueField="@type"
                    value={careerLevel}
                    caseSensitive={false}
                    minLength={3}
                    filter="contains"
                    onChange={value =>
                      this.handleSelectChange(value, "my0:careerLevel", "workHistory")
                    }
                  />
                </Row>
                <CustomTextarea
                  id="my0:jobDescription"
                  name="workHistory"
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
    initialValues: state.cv["my0:hasWorkHistory"][ownProps.id],
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

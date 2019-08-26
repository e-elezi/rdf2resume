import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Row, Col, Button } from "react-bootstrap";
import { Combobox } from "react-widgets";
import CustomTextarea from "../../../../core/CustomTextarea";
import CustomInput from "../../../../core/CustomInput";
import CustomCheckbox from "../../../../core/CustomCheckbox";
import { createCourse, updateCourse } from "../../../../../actions";
import { fetchCountries } from "../../../../../actions/utilityActions";
import { retrieveCountryValues } from "../../../../../utilities/utilityQueries";
import { generateUUID } from "../../../../../reducers/cvReducer";
import { getDataOfId } from '../../../../../utilities/utilityFunctions';

class CourseModal extends Component {
  state = {
    course: {
      "@type": "my0:Course",
      "my0:hasCertification": true,
      "my0:courseTitle": "",
      "my0:courseDescription": "",
      "my0:courseURL": "",
      "my0:courseStartDate": "",
      "my0:courseFinishDate": "",
      "my0:hasQualification": "",
      "my0:organizedBy": {
        "@type": "my0:Organization",
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
      }
    }
  };

  componentWillMount() {
    this.props.fetchCountries();
    this.setInitialValues();
  }

  setInitialValues = () => {
    if (this.props.id !== null && this.props.isUpdate === true) {
      let inputRef = this.props.initialValues;
      let course = { ...this.state.course };
      course["my0:hasCertification"] = inputRef["my0:hasCertification"];
      course["my0:courseTitle"] = inputRef["my0:courseTitle"];
      course["my0:courseDescription"] = inputRef["my0:courseDescription"];
      course["my0:courseURL"] = inputRef["my0:courseURL"];
      course["my0:courseStartDate"] = inputRef["my0:courseStartDate"];
      course["my0:courseFinishDate"] = inputRef["my0:courseFinishDate"];
      course["my0:hasQualification"] = inputRef["my0:hasQualification"];
      course["my0:organizedBy"] = inputRef["my0:organizedBy"];
      this.setState({
        course
      });
    }
  };

  clearForm = () => {
    if (!this.props.isUpdate) {
      this.setState({
        course: {
          "@type": "my0:Course",
          "my0:hasCertification": true,
          "my0:courseTitle": "",
          "my0:courseDescription": "",
          "my0:courseURL": "",
          "my0:courseStartDate": "",
          "my0:courseFinishDate": "",
          "my0:hasQualification": "",
          "my0:organizedBy": {
            "@type": "my0:Organization",
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
          }
        }
      });
    } else {
      this.setInitialValues();
    }
  };

  handleCheckboxChange = e => {
    let course = { ...this.state.course };
    course[e.target.id] = e.target.checked;
    this.setState({
      course
    });
  };

  handleInputChange = e => {
    let obj = {...this.state.course};
    let label = e.target.id;
    if(e.target.name === "organization") {
      obj['my0:organizedBy'][label] = e.target.value;
    } else if(e.target.name === "address") {
      obj['my0:organizedBy']['my0:organizationAddress'][label] = e.target.value;
    } else {
      obj[label] = e.target.value;
    }
    this.setState({
      course: obj
    })
  };

  handleSelectChange = (value, id, name) => {
    let obj = {...this.state.course};
    let label = id;
    if(name === "organization") {
      obj['my0:organizedBy'][label] = value['@type'];
    } else if(name === "address") {
      obj['my0:organizedBy']['my0:organizationAddress'][label] = value['@type'];
    } else {
      obj[label] = value['@type'];
    }
    this.setState({
      course: obj
    })
  };

  handleSave = () => {
    this.props.createCourse(
      this.state.course
    );
  };

  handleUpdate = () => {
    this.props.updateCourse(
      {
         object: this.state.course,
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
      "my0:hasCertification" : hasCertification,
      "my0:courseTitle" : courseTitle,
      "my0:courseDescription" : courseDescription,
      "my0:courseURL" : courseURL,
      "my0:courseStartDate" : courseStartDate,
      "my0:courseFinishDate" : courseFinishDate,
      "my0:organizedBy" : organizedBy
    } = this.state.course;

    let {
      "my0:organizationName" : organizationName,
      "my0:organizationWebsite" : organizationWebsite,
      "my0:organizationDescription" : organizationDescription,
      "my0:organizationPhoneNumber" : organizationPhoneNumber,
      "my0:organizationAddress" : organizationAddress
    } = organizedBy;

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
              <Col md={7}>{this.props.isUpdate ? "Update" : "Add New"} Course/Training</Col>
              <Col md={5}>
                <CustomCheckbox
                  id="my0:hasCertification"
                  type="checkbox"
                  label="Does it provide certification?"
                  checked={hasCertification}
                  handleChange={this.handleCheckboxChange}
                />
              </Col>
            </Row>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row style={{ alignItems: "flex-start" }}>
            <Col md={6} style={{ paddingRight: "25px" }}>
              <Row style={{ marginBottom: "8px" }}>
                <Col md={6}>
                  <CustomInput
                    id="my0:courseStartDate"
                    name="course"
                    label="From"
                    type="date"
                    value={courseStartDate}
                    handleChange={this.handleInputChange}
                  />
                </Col>
                <Col md={6}>
                  <CustomInput
                    id="my0:courseFinishDate"
                    name="course"
                    label="To"
                    type="date"
                    value={courseFinishDate}
                    handleChange={this.handleInputChange}
                  />
                </Col>
              </Row>
              <Row
                style={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  display: "flex",
                  marginLeft: "0px",
                  marginBottom: "8px"
                }}
              >
                <CustomInput
                  id="my0:organizationName"
                  name="organization"
                  label="Organization Name"
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
                <Row style={{ marginBottom: "8px" }}>
                  <Col sm={6}>
                    <CustomInput
                      id="my0:postalCode"
                      name="address"
                      label="Postal Code"
                      value={organizationAddress["my0:postalCode"]}
                      handleChange={this.handleInputChange}
                    />
                  </Col>
                  <Col sm={6}>
                    <CustomInput
                      id="my0:city"
                      name="address"
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
                    name="my0:country"
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
                id="my0:courseTitle"
                name="course"
                label="Course/Training Title"
                type="text"
                value={courseTitle}
                handleChange={this.handleInputChange}
              />
              <CustomInput
                id="my0:courseURL"
                name="course"
                label="Course/Training Website"
                type="text"
                value={courseURL}
                handleChange={this.handleInputChange}
              />
              <div className="mb-3" />
              <CustomTextarea
                id="my0:courseDescription"
                name="course"
                label="Course/Training Description"
                value={courseDescription}
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
      </Modal>
    );
  }
}

const mapstateToProps = (state, ownProps) => {
  return {
    initialValues: state.cv["my0:hasCourse"][ownProps.id],
    countries: retrieveCountryValues(state.utility.countryValues)
  };
};

export default connect(
  mapstateToProps,
  { createCourse, fetchCountries, updateCourse }
)(CourseModal);

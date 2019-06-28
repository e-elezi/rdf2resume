import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Row, Col, Button } from "react-bootstrap";
// import CustomSelect from "../../../../core/CustomSelect";
import { Combobox } from "react-widgets";
import CustomTextarea from "../../../../core/CustomTextarea";
import CustomInput from "../../../../core/CustomInput";
import CustomCheckbox from "../../../../core/CustomCheckbox";
import { updateCourse } from "../../../../../actions";
import { fetchCountries } from "../../../../../actions/utilityActions";
import { retrieveCountryValues } from "../../../../../utilities/utilityQueries";

class CourseUpdateModal extends Component {
  state = {
    course: {
      hasCertification: true,
      courseTitle: "",
      courseDescription: "",
      courseURL: "",
      courseStartDate: "",
      courseFinishDate: "",
      hasQualification: "",
      Organization: {
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
    // organizationCountryValues: []
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

  componentWillMount() {
    this.props.fetchCountries();
    if (this.props.id !== null) {
      let inputRef = this.props.initialValues;
      let course = { ...this.state.course };
      course.id = inputRef.id;
      course.hasCertification = inputRef.hasCertification;
      course.courseTitle = inputRef.courseTitle;
      course.courseDescription = inputRef.courseDescription;
      course.courseURL = inputRef.courseURL;
      course.courseStartDate = inputRef.courseStartDate;
      course.courseFinishDate = inputRef.courseFinishDate;
      course.hasQualification = inputRef.hasQualification;
      course.Organization = inputRef.Organization;
      this.setState({
        course
      });
    }
    // this.setState({
    //   organizationCountryValues: this.getCountries()
    // });
  }

  handleCheckboxChange = e => {
    let course = { ...this.state.course };
    course[e.target.id] = e.target.checked;
    this.setState({
      course
    });
  };

  handleInputChange = e => {
    let course = { ...this.state.course };
    let label = e.target.id;
    if (label.indexOf("Organization") >= 0) {
      let sublabel = label.substr(13);
      if (sublabel.indexOf("organizationAddress") >= 0) {
        let subsublabel = sublabel.substr(20);
        let mybj = course["Organization"]["organizationAddress"];
        mybj[subsublabel] = e.target.value;
        course["Organization"]["organizationAddress"] = mybj;
        this.setState({
          course
        });
      } else {
        let mybj = course["Organization"];
        mybj[sublabel] = e.target.value;
        course["Organization"] = mybj;
        this.setState({
          course
        });
      }
    } else {
      course[label] = e.target.value;
      this.setState({
        course
      });
    }
  };

  handleSelectChange = (value, id) => {
    let course = { ...this.state.course };
    let label = id;
    if (label.indexOf("Organization") >= 0) {
      let sublabel = label.substr(13);
      if (sublabel.indexOf("organizationAddress") >= 0) {
        let subsublabel = sublabel.substr(20);
        let mybj = course["Organization"]["organizationAddress"];
        mybj[subsublabel] = value.trim();
        course["Organization"]["organizationAddress"] = mybj;
        this.setState({
          course
        });
      } else {
        let mybj = course["Organization"];
        mybj[sublabel] = value.trim();
        course["Organization"] = mybj;
        this.setState({
          course
        });
      }
    } else {
      course[label] = value.trim();
      this.setState({
        course
      });
    }
  };

  handleUpdate = () => {
    this.props.updateCourse(this.state.course);
  };

  render() {
    let {
      hasCertification,
      courseTitle,
      courseDescription,
      courseURL,
      courseStartDate,
      courseFinishDate,
      Organization
    } = this.state.course;
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
              <Col md={7}>Add New Course/Training</Col>
              <Col md={5}>
                <CustomCheckbox
                  id="hasCertification"
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
                    id="courseStartDate"
                    label="From"
                    type="date"
                    value={courseStartDate}
                    handleChange={this.handleInputChange}
                  />
                </Col>
                <Col md={6}>
                  <CustomInput
                    id="courseFinishDate"
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
                  id="Organization.organizationName"
                  label="Organization Name"
                  type="text"
                  value={Organization.organizationName}
                  handleChange={this.handleInputChange}
                />
                <CustomInput
                  id="Organization.organizationWebsite"
                  label="Organization Website"
                  type="text"
                  value={Organization.organizationWebsite}
                  handleChange={this.handleInputChange}
                />
                <Row style={{ marginBottom: "8px" }}>
                  <Col sm={6}>
                    <CustomInput
                      id="Organization.organizationAddress.postalCode"
                      label="Postal Code"
                      value={Organization.organizationAddress.postalCode}
                      handleChange={this.handleInputChange}
                    />
                  </Col>
                  <Col sm={6}>
                    <CustomInput
                      id="Organization.organizationAddress.city"
                      label="City"
                      value={Organization.organizationAddress.city}
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
                    name="Organization.organizationAddress.country"
                    placeholder="Select country"
                    data={this.props.countries}
                    value={Organization.organizationAddress.country}
                    caseSensitive={false}
                    minLength={3}
                    filter="contains"
                    onChange={value =>
                      this.handleSelectChange(
                        value,
                        "Organization.organizationAddress.country"
                      )
                    }
                  />
                </Row>
                <CustomInput
                  id="Organization.organizationPhoneNumber"
                  label="Organization Phone Number"
                  value={Organization.organizationPhoneNumber}
                  handleChange={this.handleInputChange}
                />
                <div style={{ marginTop: "10px" }}>
                  <CustomTextarea
                    id="Organization.organizationDescription"
                    label="Organization Description"
                    value={Organization.organizationDescription}
                    handleChange={this.handleInputChange}
                  />
                </div>
              </Row>
            </Col>
            <Col md={6}>
              <CustomInput
                id="courseTitle"
                label="Course/Training Title"
                type="text"
                value={courseTitle}
                handleChange={this.handleInputChange}
              />
              <CustomInput
                id="courseURL"
                label="Course/Training Website"
                type="text"
                value={courseURL}
                handleChange={this.handleInputChange}
              />
              <div className="mb-3" />
              <CustomTextarea
                id="courseDescription"
                label="Course/Training Description"
                value={courseDescription}
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
    initialValues: state.cv.courses[ownProps.id],
    countries: retrieveCountryValues(state.utility.countryValues)
  };
};

export default connect(
  mapStateToProps,
  { updateCourse, fetchCountries }
)(CourseUpdateModal);

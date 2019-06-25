import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Row, Col, Button } from "react-bootstrap";
import CustomSelect from "../../../../core/CustomSelect";
import CustomTextarea from "../../../../core/CustomTextarea";
import CustomInput from "../../../../core/CustomInput";
import CustomCheckbox from "../../../../core/CustomCheckbox";
import { createCourse } from "../../../../../actions";

class CourseModal extends Component {
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
    },
    organizationCountryValues: []
  };

  getCountries = () => {
    return [
      "United States of America",
      "Albania",
      "Germany",
      "Italy",
      "France",
      "United Kingdom",
      "Norway",
      "Sweden",
      "Spain",
      "Portugal"
    ];
  };

  componentWillMount() {
    this.setState({
      organizationCountryValues: this.getCountries()
    });
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

  handleSelectChange = (e, id) => {
    let course = { ...this.state.course };
    let label = id;
    if (label.indexOf("Organization") >= 0) {
      let sublabel = label.substr(13);
      if (sublabel.indexOf("organizationAddress") >= 0) {
        let subsublabel = sublabel.substr(20);
        let mybj = course["Organization"]["organizationAddress"];
        mybj[subsublabel] = e.target.text.trim();
        course["Organization"]["organizationAddress"] = mybj;
        this.setState({
          course
        });
      } else {
        let mybj = course["Organization"];
        mybj[sublabel] = e.target.text.trim();
        course["Organization"] = mybj;
        this.setState({
          course
        });
      }
    } else {
      course[label] = e.target.text.trim();
      this.setState({
        course
      });
    }
  };

  handleSave = () => {
    this.props.createCourse({
      ...this.state.course,
      id: Math.round(Date.now() + Math.random())
    });
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
              <Col md={9}>Add New Course/Training</Col>
              <Col md={2}>
                <CustomCheckbox
                  id="hasCertification"
                  type="checkbox"
                  label="Does it provide certification?"
                  checked={hasCertification}
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
                  marginLeft: "0px"
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
                <Row>
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
                <CustomSelect
                  placeholder="Organization Country"
                  id="Organization.organizationAddress.country"
                  value={Organization.organizationAddress.country}
                  items={this.state.organizationCountryValues}
                  handleSelectChange={this.handleSelectChange}
                />
                <CustomInput
                  id="Organization.organizationPhoneNumber"
                  label="Organization Phone Number"
                  value={Organization.organizationPhoneNumber}
                  handleChange={this.handleInputChange}
                />
                <CustomTextarea
                  id="Organization.organizationDescription"
                  label="Organization Description"
                  value={Organization.organizationDescription}
                  handleChange={this.handleInputChange}
                />
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
          <Button variant="primary" onClick={this.handleSave}>
            Save
          </Button>
          <Button variant="danger" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect(
  null,
  { createCourse }
)(CourseModal);

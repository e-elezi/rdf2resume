import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Row, Col, Button } from "react-bootstrap";
import { Combobox } from "react-widgets";
import Swal from "sweetalert2";
import CustomTextarea from "../../../../core/CustomTextarea";
import CustomInput from "../../../../core/CustomInput";
import CustomCheckbox from "../../../../core/CustomCheckbox";
import { createCourse, updateCourse } from "../../../../../actions";
import {
  fetchCountries,
  fetchMainPropertiess
} from "../../../../../actions/utilityActions";
import {
  retrieveCountryValues,
  retrieveMainProperties
} from "../../../../../utilities/utilityQueries";
import {
  courseAddTitle,
  courseUpdateTitle,
  cancelLabel,
  resetLabel,
  saveLabel,
  updateLabel,
  startDate,
  endDate
} from "../../../../../translations/translations";

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
        "my0:orgName": "",
        "my0:orgAddress": {
          "@type": "Address",
          "my0:city": "",
          "my0:country": "",
          "my0:street": "",
          "my0:postalCode": ""
        },
        "my0:orgDescription": "",
        "my0:orgPhoneNumber": "",
        "my0:orgWebsite": ""
      }
    }
  };

  componentWillMount() {
    this.props.fetchCountries();
    this.props.fetchMainPropertiess("my0:Course");
    this.props.fetchMainPropertiess("my0:Organization");
    this.props.fetchMainPropertiess("my0:Address");
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
            "my0:orgName": "",
            "my0:orgAddress": {
              "@type": "Address",
              "my0:city": "",
              "my0:country": "",
              "my0:street": "",
              "my0:postalCode": ""
            },
            "my0:orgDescription": "",
            "my0:orgPhoneNumber": "",
            "my0:orgWebsite": ""
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
    let obj = { ...this.state.course };
    let label = e.target.id;
    if (label === "my0:courseStartDate") {
      if (
        e.target.value >
        new Date()
          .toJSON()
          .slice(0, 10)
          .replace(/-/g, "-")
      ) {
        Swal.fire({
          title: "Warning!",
          text: startDate[this.props.language],
          type: "warning",
          confirmButtonColor: "#4bb3cc",
          heightAuto: false,
          confirmButtonText: "Okay"
        });
        return;
      }
    }
    if (label === "my0:courseFinishDate") {
      if (e.target.value < this.state.course["my0:courseStartDate"]) {
        Swal.fire({
          title: "Warning!",
          text: endDate[this.props.language],
          type: "warning",
          confirmButtonColor: "#4bb3cc",
          heightAuto: false,
          confirmButtonText: "Okay"
        });
        return;
      }
    }
    if (e.target.name === "org") {
      obj["my0:organizedBy"][label] = e.target.value;
    } else if (e.target.name === "address") {
      obj["my0:organizedBy"]["my0:orgAddress"][label] = e.target.value;
    } else {
      obj[label] = e.target.value;
    }
    this.setState({
      course: obj
    });
  };

  handleSelectChange = (value, id, name) => {
    let obj = { ...this.state.course };
    let label = id;
    if (name === "org") {
      obj["my0:organizedBy"][label] = value["@type"];
    } else if (name === "address") {
      obj["my0:organizedBy"]["my0:orgAddress"][label] = value["@type"];
    } else {
      obj[label] = value["@type"];
    }
    this.setState({
      course: obj
    });
  };

  handleSave = () => {
    this.props.createCourse(this.state.course);
  };

  handleUpdate = () => {
    this.props.updateCourse({
      object: this.state.course,
      index: this.props.id
    });
  };

  findInArray(data, name) {
    let length = data.length;
    for (let i = 0; i < length; i++) {
      let index = data[i]["@type"].indexOf(name);
      let newlength = data[i]["@type"].length;
      if (index >= 0 && index + name.length >= newlength) {
        return i;
      }
    }
  }

  renderLabel(translated, name, lang) {
    let index = this.findInArray(translated, name);
    if (
      translated[index] === undefined ||
      translated[index][lang] === undefined
    ) {
      return name;
    } else {
      return translated[index][lang];
    }
  }

  handleRenderingSubmitButton = lang => {
    let isDisabled =
      this.state.course["my0:courseStartDate"] === "" ||
      this.state.course["my0:organizedBy"]["my0:orgName"] === "" ||
      this.state.course["my0:courseTitle"] === "";
    if (!this.props.isUpdate) {
      return (
        <Button
          disabled={isDisabled}
          type="submit"
          variant="primary"
          onClick={this.handleSave}
        >
          {saveLabel[lang]}
        </Button>
      );
    } else {
      return (
        <Button
          disabled={isDisabled}
          type="submit"
          variant="primary"
          onClick={this.handleUpdate}
        >
          {updateLabel[lang]}
        </Button>
      );
    }
  };

  render() {
    let {
      "my0:hasCertification": hasCertification,
      "my0:courseTitle": courseTitle,
      "my0:courseDescription": courseDescription,
      "my0:courseURL": courseURL,
      "my0:courseStartDate": courseStartDate,
      "my0:courseFinishDate": courseFinishDate,
      "my0:organizedBy": organizedBy
    } = this.state.course;

    let {
      "my0:orgName": orgName,
      "my0:orgWebsite": orgWebsite,
      "my0:orgDescription": orgDescription,
      "my0:orgPhoneNumber": orgPhoneNumber,
      "my0:orgAddress": orgAddress
    } = organizedBy;

    let { onHide } = this.props;

    let lang = this.props.language;

    let {
      translatedProps,
      translatedPropsOrg,
      translatedPropsAddr
    } = this.props;

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
              <Col md={7}>
                {this.props.isUpdate
                  ? courseUpdateTitle[lang]
                  : courseAddTitle[lang]}
              </Col>
              <Col md={5}>
                <CustomCheckbox
                  id="my0:hasCertification"
                  type="checkbox"
                  label={this.renderLabel(
                    translatedProps,
                    "hasCertification",
                    lang
                  )}
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
                  id="my0:courseStartDate"
                  name="course"
                  label={
                    this.renderLabel(translatedProps, "courseStartDate", lang) +
                    " *"
                  }
                  type="date"
                  value={courseStartDate}
                  handleChange={this.handleInputChange}
                />
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
                  id="my0:courseFinishDate"
                  name="course"
                  label={this.renderLabel(
                    translatedProps,
                    "courseFinishDate",
                    lang
                  )}
                  type="date"
                  value={courseFinishDate}
                  handleChange={this.handleInputChange}
                />
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
                  id="my0:orgName"
                  name="org"
                  label={
                    this.renderLabel(
                      translatedPropsOrg,
                      "orgName",
                      lang
                    ) + " *"
                  }
                  type="text"
                  value={orgName}
                  handleChange={this.handleInputChange}
                />
                <div style={{ width: "100%" }}>
                  <CustomInput
                    id="my0:orgWebsite"
                    name="org"
                    label={this.renderLabel(
                      translatedPropsOrg,
                      "orgWebsite",
                      lang
                    )}
                    type="text"
                    value={orgWebsite}
                    handleChange={this.handleInputChange}
                  />
                </div>
                <Row style={{ marginBottom: "8px" }}>
                  <Col sm={6}>
                    <CustomInput
                      id="my0:postalCode"
                      name="address"
                      label={this.renderLabel(
                        translatedPropsAddr,
                        "postalCode",
                        lang
                      )}
                      value={orgAddress["my0:postalCode"]}
                      handleChange={this.handleInputChange}
                    />
                  </Col>
                  <Col sm={6}>
                    <CustomInput
                      id="my0:city"
                      name="address"
                      label={this.renderLabel(
                        translatedPropsAddr,
                        "city",
                        lang
                      )}
                      value={orgAddress["my0:city"]}
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
                  <label className="label-rw">
                    {this.renderLabel(translatedPropsAddr, "country", lang)}
                  </label>
                  <Combobox
                    name="my0:country"
                    placeholder={this.renderLabel(
                      translatedPropsAddr,
                      "country",
                      lang
                    )}
                    data={this.props.countries}
                    textField={lang}
                    valueField="@type"
                    value={orgAddress["my0:country"]}
                    caseSensitive={false}
                    minLength={3}
                    filter="contains"
                    onChange={value =>
                      this.handleSelectChange(value, "my0:country", "address")
                    }
                  />
                </Row>
                <CustomInput
                  id="my0:orgPhoneNumber"
                  name="org"
                  label={this.renderLabel(
                    translatedPropsOrg,
                    "orgPhoneNumber",
                    lang
                  )}
                  value={orgPhoneNumber}
                  handleChange={this.handleInputChange}
                />
                <div style={{ marginTop: "10px", width: "100%" }}>
                  <CustomTextarea
                    id="my0:orgDescription"
                    name="org"
                    label={this.renderLabel(
                      translatedPropsOrg,
                      "orgDescription",
                      lang
                    )}
                    value={orgDescription}
                    handleChange={this.handleInputChange}
                  />
                </div>
              </Row>
            </Col>
            <Col md={6}>
              <CustomInput
                id="my0:courseTitle"
                name="course"
                label={
                  this.renderLabel(translatedProps, "courseTitle", lang) + " *"
                }
                type="text"
                value={courseTitle}
                handleChange={this.handleInputChange}
              />
              <CustomInput
                id="my0:courseURL"
                name="course"
                label={this.renderLabel(translatedProps, "courseURL", lang)}
                type="text"
                value={courseURL}
                handleChange={this.handleInputChange}
              />
              <div className="mb-3" />
              <CustomTextarea
                id="my0:courseDescription"
                name="course"
                label={this.renderLabel(
                  translatedProps,
                  "courseDescription",
                  lang
                )}
                value={courseDescription}
                handleChange={this.handleInputChange}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          {this.handleRenderingSubmitButton(lang)}
          <Button className="btn-reset" onClick={this.clearForm}>
            {resetLabel[lang]}
          </Button>
          <Button variant="danger" onClick={onHide}>
            {cancelLabel[lang]}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapstateToProps = (state, ownProps) => {
  return {
    initialValues: state.cv["my0:hasCourse"][ownProps.id],
    countries: retrieveCountryValues(state.utility.countryValues),
    language: state.utility.language,
    translatedPropsOrg: retrieveMainProperties(
      state.utility["my0:Organization"]
    ),
    translatedPropsAddr: retrieveMainProperties(state.utility["my0:Address"]),
    translatedProps: retrieveMainProperties(state.utility["my0:Course"])
  };
};

export default connect(
  mapstateToProps,
  { createCourse, fetchCountries, updateCourse, fetchMainPropertiess }
)(CourseModal);

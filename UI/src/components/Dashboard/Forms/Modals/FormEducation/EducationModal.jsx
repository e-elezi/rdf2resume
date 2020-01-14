import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Row, Col, Button } from "react-bootstrap";
import { Combobox } from "react-widgets";
import Swal from "sweetalert2";
import CustomTextarea from "../../../../core/CustomTextarea";
import CustomInput from "../../../../core/CustomInput";
import CustomCheckbox from "../../../../core/CustomCheckbox";
import { createEducation, updateEducation, updateCVLastUpdate } from "../../../../../actions";
import {
  fetchCountries,
  fetchCompanySizes,
  fetchEduDegrees,
  fetchMainPropertiess
} from "../../../../../actions/utilityActions";
import {
  retrieveCountryValues,
  retrieveMainProperties,
  retrieveBaseProperties
} from "../../../../../utilities/utilityQueries";
import {
  cancelLabel,
  resetLabel,
  saveLabel,
  updateLabel,
  startDate,
  endDate,
  educationAddTitle,
  educationUpdateTitle
} from "../../../../../translations/translations";

class EducationModal extends Component {
  state = {
    education: {
      "@type": "my0:Education",
      "my0:studiedIn": {
        "@type": "my0:EducationalOrg",
        "my0:orgName": [{
          "@value": "",
          "@language": "en"
        },
        {
          "@value": "",
          "@language": "it"
        },
        {
          "@value": "",
          "@language": "fr"
        },
        {
          "@value": "",
          "@language": "de"
        },
        {
          "@value": "",
          "@language": "sq"
        },
        ],
        "my0:orgDescription": [{
          "@value": "",
          "@language": "en"
        },
        {
          "@value": "",
          "@language": "it"
        },
        {
          "@value": "",
          "@language": "fr"
        },
        {
          "@value": "",
          "@language": "de"
        },
        {
          "@value": "",
          "@language": "sq"
        },
        ],
        "my0:orgWebsite": "",
        "my0:orgAddress": {
          "@type": "Address",
          "my0:city": [{
            "@value": "",
            "@language": "en"
          },
          {
            "@value": "",
            "@language": "it"
          },
          {
            "@value": "",
            "@language": "fr"
          },
          {
            "@value": "",
            "@language": "de"
          },
          {
            "@value": "",
            "@language": "sq"
          },
          ],
          "my0:country": "",
          "my0:street": [{
            "@value": "",
            "@language": "en"
          },
          {
            "@value": "",
            "@language": "it"
          },
          {
            "@value": "",
            "@language": "fr"
          },
          {
            "@value": "",
            "@language": "de"
          },
          {
            "@value": "",
            "@language": "sq"
          },
          ],
          "my0:postalCode": ""
        }
      },
      "my0:isEduCurrent": false,
      "my0:eduStartDate": "",
      "my0:eduGradDate": "",
      "my0:degree": "",
      "my0:degreeFieldOfStudy": [{
        "@value": "",
        "@language": "en"
      },
      {
        "@value": "",
        "@language": "it"
      },
      {
        "@value": "",
        "@language": "fr"
      },
      {
        "@value": "",
        "@language": "de"
      },
      {
        "@value": "",
        "@language": "sq"
      },
      ],
      "my0:eduDescription": [{
        "@value": "",
        "@language": "en"
      },
      {
        "@value": "",
        "@language": "it"
      },
      {
        "@value": "",
        "@language": "fr"
      },
      {
        "@value": "",
        "@language": "de"
      },
      {
        "@value": "",
        "@language": "sq"
      },
      ]
    }
  };

  componentWillMount() {
    this.props.fetchCompanySizes();
    this.props.fetchCountries();
    this.props.fetchEduDegrees();
    this.props.fetchMainPropertiess("my0:Education");
    this.props.fetchMainPropertiess("my0:Organization");
    this.props.fetchMainPropertiess("my0:Address");
    this.setInitialValues();
  }

  setInitialValues = () => {
    if (this.props.id !== null && this.props.isUpdate === true) {
      let inputRef = this.props.initialValues;
      let education = { ...this.state.education };
      education["my0:eduStartDate"] = inputRef["my0:eduStartDate"];
      education["my0:eduGradDate"] = inputRef["my0:eduGradDate"];
      education["my0:degree"] = inputRef["my0:degree"];
      education["my0:degreeFieldOfStudy"] = inputRef["my0:degreeFieldOfStudy"];
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
    if (!this.props.isUpdate) {
      this.setState({
        education: {
          "@type": "my0:Education",
          "my0:studiedIn": {
            "@type": "my0:EducationalOrg",
            "my0:orgName": [{
              "@value": "",
              "@language": "en"
            },
            {
              "@value": "",
              "@language": "it"
            },
            {
              "@value": "",
              "@language": "fr"
            },
            {
              "@value": "",
              "@language": "de"
            },
            {
              "@value": "",
              "@language": "sq"
            },
            ],
            "my0:orgDescription": [{
              "@value": "",
              "@language": "en"
            },
            {
              "@value": "",
              "@language": "it"
            },
            {
              "@value": "",
              "@language": "fr"
            },
            {
              "@value": "",
              "@language": "de"
            },
            {
              "@value": "",
              "@language": "sq"
            },
            ],
            "my0:orgWebsite": "",
            "my0:orgAddress": {
              "@type": "Address",
              "my0:city": [{
                "@value": "",
                "@language": "en"
              },
              {
                "@value": "",
                "@language": "it"
              },
              {
                "@value": "",
                "@language": "fr"
              },
              {
                "@value": "",
                "@language": "de"
              },
              {
                "@value": "",
                "@language": "sq"
              },
              ],
              "my0:country": "",
              "my0:street": [{
                "@value": "",
                "@language": "en"
              },
              {
                "@value": "",
                "@language": "it"
              },
              {
                "@value": "",
                "@language": "fr"
              },
              {
                "@value": "",
                "@language": "de"
              },
              {
                "@value": "",
                "@language": "sq"
              },
              ],
              "my0:postalCode": ""
            }
          },
          "my0:isEduCurrent": false,
          "my0:eduStartDate": "",
          "my0:eduGradDate": "",
          "my0:degree": "",
          "my0:degreeFieldOfStudy": [{
            "@value": "",
            "@language": "en"
          },
          {
            "@value": "",
            "@language": "it"
          },
          {
            "@value": "",
            "@language": "fr"
          },
          {
            "@value": "",
            "@language": "de"
          },
          {
            "@value": "",
            "@language": "sq"
          },
          ],
          "my0:eduDescription": [{
            "@value": "",
            "@language": "en"
          },
          {
            "@value": "",
            "@language": "it"
          },
          {
            "@value": "",
            "@language": "fr"
          },
          {
            "@value": "",
            "@language": "de"
          },
          {
            "@value": "",
            "@language": "sq"
          },
          ]
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

  replaceLanguageValue(data, language, value) {
    console.log(data, language, value);
    let length = data.length;
    for (let i = 0; i < length; i++) {
      if (data[i]["@language"] === language) {
        data[i]["@value"] = value;
        break;
      }
    }
    console.log(data, language, value);
    return data;
  }

  findTranslatedValue(data, lang) {
    let length = data.length;
    for (let i = 0; i < length; i++) {
      if (data[i]["@language"] === lang) {
        return data[i]["@value"];
      }
    }
  }

  handleInputChange = (e, lang) => {
    let obj = { ...this.state.education };
    let label = e.target.id;
    if (label === "my0:eduStartDate") {
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
    if (label === "my0:eduGradDate") {
      if (e.target.value < this.state.education["my0:eduStartDate"]) {
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
      if (lang) {
        obj["my0:studiedIn"][label] = this.replaceLanguageValue(obj["my0:studiedIn"][label], lang, e.target.value);
      } else {
        obj["my0:studiedIn"][label] = e.target.value;
      }
    } else if (e.target.name === "address") {
      if (lang) {
        obj["my0:studiedIn"]["my0:orgAddress"][label] = this.replaceLanguageValue(obj["my0:studiedIn"]["my0:orgAddress"][label], lang, e.target.value);
      } else {
        obj["my0:studiedIn"]["my0:orgAddress"][label] = e.target.value;
      }
    } else {
      if (lang) {
        obj[label] = this.replaceLanguageValue(obj[label], lang, e.target.value);
      } else {
        obj[label] = e.target.value;
      }
    }
    this.setState({
      education: obj
    });
  };

  handleSelectChange = (value, id, name) => {
    let obj = { ...this.state.education };
    let label = id;
    if (name === "org") {
      obj["my0:studiedIn"][label] = value["@type"];
    } else if (name === "address") {
      obj["my0:studiedIn"]["my0:orgAddress"][label] = value["@type"];
    } else {
      obj[label] = value["@type"];
    }
    this.setState({
      education: obj
    });
  };

  handleSave = () => {
    this.props.createEducation(this.state.education);
    this.props.updateCVLastUpdate();
  };

  handleUpdate = () => {
    this.props.updateEducation({
      object: this.state.education,
      index: this.props.id
    });
    this.props.updateCVLastUpdate();
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
      this.state.education["my0:eduStartDate"] === "" ||
      this.state.education["my0:degree"] === "" ||
      this.state.education["my0:degreeFieldOfStudy"] === "" ||
      this.state.education["my0:studiedIn"]["my0:orgName"] === "" ||
      this.state.education["my0:eduGradDate"] === "";
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
      "my0:eduStartDate": eduStartDate,
      "my0:eduGradDate": eduGradDate,
      "my0:degreeFieldOfStudy": degreeFieldOfStudy,
      "my0:degree": degree,
      "my0:eduDescription": eduDescription,
      "my0:isEduCurrent": isEduCurrent,
      "my0:studiedIn": studiedIn
    } = this.state.education;

    let {
      "my0:orgName": orgName,
      "my0:orgWebsite": orgWebsite,
      "my0:orgDescription": orgDescription,
      "my0:orgAddress": address
    } = studiedIn;

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
              <Col md={9}>
                {this.props.isUpdate
                  ? educationUpdateTitle[lang]
                  : educationAddTitle[lang]}
              </Col>
              <Col md={2}>
                <CustomCheckbox
                  id="my0:isEduCurrent"
                  type="checkbox"
                  label={this.renderLabel(
                    translatedProps,
                    "isEduCurrent",
                    lang
                  )}
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
              <Row
                style={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  display: "flex",
                  marginLeft: "0px"
                }}
              >
                <CustomInput
                  id="my0:eduStartDate"
                  name="education"
                  label={
                    this.renderLabel(translatedProps, "eduStartDate", lang) +
                    " *"
                  }
                  type="date"
                  value={eduStartDate}
                  handleChange={this.handleInputChange}
                />
              </Row>
              <Row
                style={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  display: "flex",
                  marginLeft: "0px",
                  marginTop: "5px"
                }}
              >
                <CustomInput
                  id="my0:eduGradDate"
                  name="education"
                  label={
                    this.renderLabel(translatedProps, "eduGradDate", lang) +
                    " *"
                  }
                  type="date"
                  value={eduGradDate}
                  handleChange={this.handleInputChange}
                />
              </Row>
              <Row
                style={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  display: "flex",
                  marginLeft: "0px"
                }}
              >
                <div style={{ width: "100%" }}>
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
                    value={this.findTranslatedValue(orgName, lang)}
                    handleChange={(e) => this.handleInputChange(e, lang)}
                  />
                </div>
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
                <Row>
                  <Col sm={6}>
                    <CustomInput
                      id="my0:postalCode"
                      name="address"
                      label={this.renderLabel(
                        translatedPropsAddr,
                        "postalCode",
                        lang
                      )}
                      value={address["my0:postalCode"]}
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
                      value={this.findTranslatedValue(address["my0:city"], lang)}
                      handleChange={(e) => this.handleInputChange(e, lang)}
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
                    value={address["my0:country"]}
                    caseSensitive={false}
                    minLength={3}
                    filter="contains"
                    onChange={value =>
                      this.handleSelectChange(value, "my0:country", "address")
                    }
                  />
                </Row>
                <div style={{ marginTop: "10px", width: "100%" }}>
                  <CustomTextarea
                    id="my0:orgDescription"
                    name="org"
                    label={this.renderLabel(
                      translatedPropsOrg,
                      "orgDescription",
                      lang
                    )}
                    value={this.findTranslatedValue(orgDescription, lang)}
                    handleChange={(e) => this.handleInputChange(e, lang)}
                  />
                </div>
              </Row>
            </Col>
            <Col md={6}>
              <CustomInput
                id="my0:degreeFieldOfStudy"
                label={this.renderLabel(translatedProps, "degreeFieldOfStudy", lang) + " *"}
                name="education"
                type="text"
                value={this.findTranslatedValue(degreeFieldOfStudy, lang)}
                handleChange={(e) => this.handleInputChange(e, lang)}
              />
              <label className="label-rw">
                {this.renderLabel(translatedProps, "degree", lang) + " *"}
              </label>
              <Combobox
                name="my0:degree"
                placeholder={this.renderLabel(
                  translatedProps,
                  "degree",
                  lang
                )}
                data={this.props.eduDegrees}
                valueField="@type"
                textField={lang}
                value={degree}
                caseSensitive={false}
                minLength={3}
                filter="contains"
                onChange={value =>
                  this.handleSelectChange(value, "my0:degree", "education")
                }
              />
              <div style={{ marginTop: "10px", width: "100%" }}>
                <CustomTextarea
                  id="my0:eduDescription"
                  name="education"
                  label={this.renderLabel(
                    translatedProps,
                    "eduDescription",
                    lang
                  )}
                  value={this.findTranslatedValue(eduDescription, lang)}
                  handleChange={(e) => this.handleInputChange(e, lang)}
                />
              </div>
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
    initialValues: state.cv["my0:hasEducation"][ownProps.id],
    countries: retrieveCountryValues(state.utility.countryValues),
    companySizes: retrieveBaseProperties(state.utility.companySizeValues),
    eduDegrees: retrieveBaseProperties(state.utility.eduDegreeValues),
    language: state.utility.language,
    translatedPropsOrg: retrieveMainProperties(
      state.utility["my0:Organization"]
    ),
    translatedPropsAddr: retrieveMainProperties(state.utility["my0:Address"]),
    translatedProps: retrieveMainProperties(state.utility["my0:Education"])
  };
};

export default connect(
  mapstateToProps,
  {
    createEducation,
    fetchCountries,
    fetchCompanySizes,
    fetchEduDegrees,
    updateEducation,
    fetchMainPropertiess,
    updateCVLastUpdate
  }
)(EducationModal);

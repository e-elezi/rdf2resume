import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { Combobox } from "react-widgets";
import CustomTextarea from "../../../../core/CustomTextarea";
import CustomInput from "../../../../core/CustomInput";
import { createReference, updateReference, updateCVLastUpdate } from "../../../../../actions";
import {
  fetchCountries,
  fetchTitleProperties,
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
  referenceAddTitle,
  referenceUpdateTitle
} from "../../../../../translations/translations";

class ReferenceModal extends Component {
  state = {
    reference: {
      "@type": "my0:Reference",
      "my0:refRelationDescription": "",
      "my0:referenceBy": {
        "@type": "my0:Person",
        "my0:title": "",
        "my0:firstName": "",
        "my0:lastName": "",
        "my0:address": {
          "@type": "my0:Address",
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
        },
        "my0:phoneNumberWork": "",
        "my0:email": ""
      }
    }
  };

  componentWillMount() {
    this.props.fetchCountries();
    this.props.fetchTitleProperties();
    this.props.fetchMainPropertiess("my0:Person");
    this.props.fetchMainPropertiess("my0:Address");
    this.setInitialValues();
  }

  setInitialValues = () => {
    if (this.props.id !== null && this.props.isUpdate === true) {
      let inputRef = this.props.initialValues;
      let reference = { ...this.state.reference };
      reference["my0:refRelationDescription"] = inputRef["my0:refRelationDescription"];
      reference["my0:referenceBy"] = inputRef["my0:referenceBy"];
      this.setState({
        reference
      });
    }
  };

  clearForm = () => {
    if (!this.props.isUpdate) {
      this.setState({
        reference: {
          "@type": "my0:Reference",
          "my0:refRelationDescription": [{
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
          "my0:referenceBy": {
            "@type": "my0:Person",
            "my0:title": "",
            "my0:firstName": "",
            "my0:lastName": "",
            "my0:address": {
              "@type": "my0:Address",
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
            },
            "my0:phoneNumberWork": "",
            "my0:email": ""
          }
        }
      });
    } else {
      this.setInitialValues();
    }
  };

  handleSelectChange = (value, id, name) => {
    let obj = { ...this.state.reference };
    let label = id;
    if (name === "person") {
      obj["my0:referenceBy"][label] = value["@type"];
    } else if (name === "address") {
      obj["my0:referenceBy"]["my0:address"][label] = value["@type"];
    } else {
      obj[label] = value["@type"];
    }
    this.setState({
      reference: obj
    });
  };

  replaceLanguageValue(data, language, value) {
    let length = data.length;
    for (let i = 0; i < length; i++) {
      if (data[i]["@language"] === language) {
        data[i]["@value"] = value;
        break;
      }
    }
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
    let obj = { ...this.state.reference };
    let label = e.target.id;
    if (e.target.name === "person") {
      if (lang) {
        obj["my0:referenceBy"][label] = this.replaceLanguageValue(obj["my0:referenceBy"][label], lang, e.target.value);
      } else {
        obj["my0:referenceBy"][label] = e.target.value;
      }
    } else if (e.target.name === "address") {
      if (lang) {
        obj["my0:referenceBy"]["my0:address"][label] = this.replaceLanguageValue(obj["my0:referenceBy"]["my0:address"][label], lang, e.target.value);
      } else {
        obj["my0:referenceBy"]["my0:address"][label] = e.target.value;
      }
    } else {
      if (lang) {
        obj[label] = this.replaceLanguageValue(obj[label], lang, e.target.value);
      } else {
        obj[label] = e.target.value;
      }
    }
    this.setState({
      reference: obj
    });
  };

  handleSave = () => {
    this.props.createReference(this.state.reference);
    this.props.updateCVLastUpdate();
  };

  handleUpdate = () => {
    this.props.updateReference({
      object: this.state.reference,
      index: this.props.id
    });
    this.props.updateCVLastUpdate();
  };

  handleRenderingSubmitButton = lang => {
    let disabled =
      this.state.reference["my0:referenceBy"]["my0:firstName"] === "" ||
      this.state.reference["my0:referenceBy"]["my0:lastName"] === "" ||
      this.state.reference["my0:referenceBy"]["my0:email"] === "" ||
      this.state.reference["my0:refRelationDescription"] === ""
    if (!this.props.isUpdate) {
      return (
        <Button
          disabled={disabled}
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
          disabled={disabled}
          type="submit"
          variant="primary"
          onClick={this.handleUpdate}
        >
          {updateLabel[lang]}
        </Button>
      );
    }
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

  render() {
    let {
      "my0:title": title,
      "my0:firstName": firstName,
      "my0:lastName": lastName,
      "my0:email": email,
      "my0:phoneNumberWork": phoneNumberWork,
      "my0:address": address
    } = this.state.reference["my0:referenceBy"];

    let {
      "my0:refRelationDescription": refRelationDescription
    } = this.state.reference;

    let lang = this.props.language;

    let {
      translatedProps,
      translatedPropsAddr,
      translatedPropsOrg,
      translatedPropsWork
    } = this.props;

    const { onHide } = this.props;
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
              <Col md={12}>
                {this.props.isUpdate
                  ? referenceUpdateTitle[lang]
                  : referenceAddTitle[lang]}
              </Col>
            </Row>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={4} style={{ marginTop: "7px" }}>
              <Row
                style={{
                  width: "100%",
                  justifyContent: "left",
                  marginLeft: "0px",
                  marginBottom: "8px"
                }}
              >
                <label className="label-rw">
                  {this.renderLabel(translatedProps, "title", lang)}
                </label>
                <Combobox
                  name="title"
                  placeholder={this.renderLabel(translatedProps, "title", lang)}
                  data={this.props.titles}
                  textField={lang}
                  valueField="@type"
                  value={title}
                  caseSensitive={false}
                  minLength={3}
                  filter="contains"
                  onChange={value =>
                    this.handleSelectChange(value, "my0:title", "person")
                  }
                />
              </Row>
            </Col>
            <Col md={4}>
              <CustomInput
                id="my0:firstName"
                name="person"
                label={
                  this.renderLabel(translatedProps, "firstName", lang) + " *"
                }
                type="text"
                value={firstName}
                handleChange={this.handleInputChange}
              />
            </Col>
            <Col md={4}>
              <CustomInput
                id="my0:lastName"
                label={
                  this.renderLabel(translatedProps, "lastName", lang) + " *"
                }
                name="person"
                type="text"
                value={lastName}
                handleChange={this.handleInputChange}
              />
            </Col>
          </Row>
          <div>
            <CustomInput
              id="my0:street"
              name="address"
              label={this.renderLabel(translatedPropsAddr, "street", lang)}
              type="text"
              value={this.findTranslatedValue(address["my0:street"], lang)}
              handleChange={(e) => this.handleInputChange(e, lang)}
            />
            <Row>
              <Col md={6}>
                <CustomInput
                  id="my0:postalCode"
                  label={this.renderLabel(
                    translatedPropsAddr,
                    "postalCode",
                    lang
                  )}
                  name="address"
                  type="text"
                  value={address["my0:postalCode"]}
                  handleChange={this.handleInputChange}
                />
              </Col>
              <Col md={6}>
                <CustomInput
                  id="my0:city"
                  name="address"
                  label={this.renderLabel(translatedPropsAddr, "city", lang)}
                  type="text"
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
          </div>
          <CustomInput
            id="my0:phoneNumberWork"
            name="person"
            label={this.renderLabel(translatedProps, "phoneNumberWork", lang)}
            type="text"
            value={phoneNumberWork}
            handleChange={this.handleInputChange}
          />
          <CustomInput
            id="my0:email"
            label={this.renderLabel(translatedProps, "email", lang) + " *"}
            name="person"
            type="text"
            value={email}
            handleChange={this.handleInputChange}
          />
          <CustomTextarea
            id="my0:refRelationDescription"
            name="reference"
            label={this.renderLabel(
              translatedProps,
              "refRelationDescription",
              lang
            )}
            value={this.findTranslatedValue(refRelationDescription, lang)}
            handleChange={(e) => this.handleInputChange(e, lang)}
          />
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
    initialValues: state.cv["my0:hasReference"][ownProps.id],
    language: state.utility.language,
    countries: retrieveCountryValues(state.utility.countryValues),
    titles: retrieveBaseProperties(state.utility.titleValues),
    translatedPropsOrg: retrieveMainProperties(
      state.utility["my0:Organization"]
    ),
    translatedPropsAddr: retrieveMainProperties(state.utility["my0:Address"]),
    translatedProps: retrieveMainProperties(state.utility["my0:Person"]),
    translatedPropsWork: retrieveMainProperties(
      state.utility["my0:WorkHistory"]
    )
  };
};

export default connect(
  mapstateToProps,
  {
    createReference,
    fetchCountries,
    fetchTitleProperties,
    updateReference,
    fetchMainPropertiess,
    updateCVLastUpdate
  }
)(ReferenceModal);

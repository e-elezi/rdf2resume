import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { Combobox } from "react-widgets";
import CustomInput from "../../../../core/CustomInput";
import { createReference, updateReference } from "../../../../../actions";
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
  updateLabel
} from "../../../../../utilities/utilityFunctions";

class ReferenceModal extends Component {
  state = {
    reference: {
      "@type": "my0:Reference",
      "my0:referenceBy": {
        "@type": "my0:Person",
        "my0:title": "",
        "my0:firstName": "",
        "my0:lastName": "",
        "my0:address": {
          "@type": "my0:Address",
          "my0:city": "",
          "my0:country": "",
          "my0:street": "",
          "my0:postalCode": ""
        },
        "my0:phoneNumber": "",
        "my0:email": "",
        "my0:currentJob": {
          "@type": "my0:WorkHistory",
          "my0:jobTitle": "",
          "my0:employedIn": {
            "@type": "my0:Company",
            "my0:organizationName": ""
          }
        }
      }
    }
  };

  componentWillMount() {
    this.props.fetchCountries();
    this.props.fetchTitleProperties();
    this.props.fetchMainPropertiess("my0:Person");
    this.props.fetchMainPropertiess("my0:Organization");
    this.props.fetchMainPropertiess("my0:Address");
    this.props.fetchMainPropertiess("my0:WorkHistory");
    this.setInitialValues();
  }

  setInitialValues = () => {
    if (this.props.id !== null && this.props.isUpdate === true) {
      let inputRef = this.props.initialValues;
      let reference = { ...this.state.reference };
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
          "my0:referenceBy": {
            "@type": "my0:Person",
            "my0:title": "",
            "my0:firstName": "",
            "my0:lastName": "",
            "my0:address": {
              "@type": "my0:Address",
              "my0:city": "",
              "my0:country": "",
              "my0:street": "",
              "my0:postalCode": ""
            },
            "my0:hasTelephoneNumber": "",
            "my0:email": "",
            "my0:currentJob": {
              "@type": "my0:WorkHistory",
              "my0:jobTitle": "",
              "my0:employedIn": {
                "@type": "my0:Company",
                "my0:organizationName": ""
              }
            }
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
    } else if (name === "workHistory") {
      obj["my0:referenceBy"]["my0:currentJob"][label] = value["@type"];
    } else if (name === "organization") {
      obj["my0:referenceBy"]["my0:currentJob"]["my0:employedIn"][label] =
        value["@type"];
    } else {
      obj[label] = value["@type"];
    }
    this.setState({
      reference: obj
    });
  };

  handleInputChange = e => {
    let obj = { ...this.state.reference };
    let label = e.target.id;
    if (e.target.name === "person") {
      obj["my0:referenceBy"][label] = e.target.value;
    } else if (e.target.name === "address") {
      obj["my0:referenceBy"]["my0:address"][label] = e.target.value;
    } else if (e.target.name === "workHistory") {
      obj["my0:referenceBy"]["my0:currentJob"][label] = e.target.value;
    } else if (e.target.name === "organization") {
      obj["my0:referenceBy"]["my0:currentJob"]["my0:employedIn"][label] =
        e.target.value;
    } else {
      obj[label] = e.target.value;
    }
    this.setState({
      reference: obj
    });
  };

  handleSave = () => {
    this.props.createReference(this.state.reference);
  };

  handleUpdate = () => {
    this.props.updateReference({
      object: this.state.reference,
      index: this.props.id
    });
  };

  handleRenderingSubmitButton = lang => {
    if (!this.props.isUpdate) {
      return (
        <Button type="submit" variant="primary" onClick={this.handleSave}>
          {saveLabel[lang]}
        </Button>
      );
    } else {
      return (
        <Button type="submit" variant="primary" onClick={this.handleUpdate}>
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
      "my0:phoneNumber": hasTelephoneNumber,
      "my0:currentJob": currentJob,
      "my0:address": address
    } = this.state.reference["my0:referenceBy"];

    let { "my0:jobTitle": jobTitle, "my0:employedIn": employedIn } = currentJob;

    let { "my0:organizationName": organizationName } = employedIn;

    let lang = this.props.language;

    let add = {
      en: "Add new reference",
      fr: "Ajouter une nouvelle référence",
      de: "Neue Referenz hinzufügen",
      it: "Aggiungere un nuovo riferimento"
    };

    let up = {
      en: "Update reference",
      fr: "Référence de la mise à jour",
      de: "Referenz aktualisieren",
      it: "Aggiornare il riferimento"
    };

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
              <Col md={4}>{this.props.isUpdate ? up[lang] : add[lang] }</Col>
              <Col md={4}>
                <Row
                  style={{
                    width: "100%",
                    justifyContent: "left",
                    marginLeft: "0px",
                    marginBottom: "8px"
                  }}
                ></Row>
              </Col>
              <Col md={4} />
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
                label={this.renderLabel(translatedProps, "firstName", lang)}
                type="text"
                value={firstName}
                handleChange={this.handleInputChange}
              />
            </Col>
            <Col md={4}>
              <CustomInput
                id="my0:lastName"
                label={this.renderLabel(translatedProps, "lastName", lang)}
                name="person"
                type="text"
                value={lastName}
                handleChange={this.handleInputChange}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <CustomInput
                id="my0:jobTitle"
                name="workHistory"
                label={this.renderLabel(translatedPropsWork, "jobTitle", lang)}
                type="text"
                value={jobTitle}
                handleChange={this.handleInputChange}
              />
            </Col>
            <Col md={6}>
              <CustomInput
                id="my0:organizationName"
                name="organization"
                label={this.renderLabel(
                  translatedPropsOrg,
                  "organizationName",
                  lang
                )}
                type="text"
                value={organizationName}
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
              value={address["my0:street"]}
              handleChange={this.handleInputChange}
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
            id="my0:phoneNumber"
            name="person"
            label={this.renderLabel(translatedProps, "phoneNumber", lang)}
            type="text"
            value={hasTelephoneNumber}
            handleChange={this.handleInputChange}
          />
          <CustomInput
            id="my0:email"
            label={this.renderLabel(translatedProps, "email", lang)}
            name="person"
            type="email"
            value={email}
            handleChange={this.handleInputChange}
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
    fetchMainPropertiess
  }
)(ReferenceModal);

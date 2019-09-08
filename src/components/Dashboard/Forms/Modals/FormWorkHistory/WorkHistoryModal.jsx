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
  fetchCompanySizes,
  fetchMainPropertiess,
  fetchAllIndustryTypess
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
          "my0:city": "",
          "my0:country": "",
          "my0:street": "",
          "my0:postalCode": ""
        },
        "my0:organizationDescription": "",
        "my0:organizationPhoneNumber": "",
        "my0:organizationWebsite": "",
        "my0:organizationField": ""
      }
    }
  };

  componentDidMount() {
    this.props.fetchCVCareerLevels();
    this.props.fetchCVJobModes();
    this.props.fetchCompanySizes();
    this.props.fetchCountries();
    this.props.fetchAllIndustryTypess();
    this.props.fetchMainPropertiess("my0:WorkHistory");
    this.props.fetchMainPropertiess("my0:Organization");
    this.props.fetchMainPropertiess("my0:Address");
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
              "my0:city": "",
              "my0:country": "",
              "my0:street": "",
              "my0:postalCode": ""
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
    let obj = { ...this.state.workHistory };
    let label = e.target.id;
    if (e.target.name === "organization") {
      obj["my0:employedIn"][label] = e.target.value;
    } else if (e.target.name === "address") {
      obj["my0:employedIn"]["my0:organizationAddress"][label] = e.target.value;
    } else {
      obj[label] = e.target.value;
    }
    this.setState({
      workHistory: obj
    });
  };

  handleSelectChange = (value, id, name) => {
    let obj = { ...this.state.workHistory };
    let label = id;
    if (name === "organization") {
      obj["my0:employedIn"][label] = value["@type"];
    } else if (name === "address") {
      obj["my0:employedIn"]["my0:organizationAddress"][label] = value["@type"];
    } else {
      obj[label] = value["@type"];
    }
    this.setState({
      workHistory: obj
    });
  };

  handleSave = e => {
    e.preventDefault();
    this.props.createWorkHistory(this.state.workHistory);
  };

  handleUpdate = e => {
    e.preventDefault();
    this.props.updateWorkHistory({
      object: this.state.workHistory,
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
      if (data[i]["@type"].indexOf(name) >= 0) {
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
      "my0:startDate": startDate,
      "my0:endDate": endDate,
      "my0:jobTitle": jobTitle,
      "my0:jobMode": jobMode,
      "my0:careerLevel": careerLevel,
      "my0:jobDescription": jobDescription,
      "my0:isCurrent": isCurrent,
      "my0:employedIn": employedIn
    } = this.state.workHistory;

    let add = {
      en: "Add new work experience",
      fr: "Ajouter une nouvelle expérience de travail",
      de: "Neue Arbeitserfahrung hinzufügen",
      it: "Aggiungere nuove esperienze di lavoro"
    };

    let up = {
      en: "Update work experience",
      fr: "Mettre à jour l'expérience professionnelle",
      de: "Aktualisierung der Berufserfahrung",
      it: "Aggiornare l'esperienza lavorativa"
    };

    let {
      "my0:organizationName": organizationName,
      "my0:organizationField": organizationField,
      "my0:organizationWebsite": organizationWebsite,
      "my0:organizationDescription": organizationDescription,
      "my0:organizationPhoneNumber": organizationPhoneNumber,
      "my0:organizationAddress": address
    } = employedIn;

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
        <form>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <Row>
                <Col md={9}>{this.props.isUpdate ? up[lang] : add[lang]}</Col>
                <Col md={2}>
                  <CustomCheckbox
                    id="my0:isCurrent"
                    type="checkbox"
                    label={this.renderLabel(translatedProps, "isCurrent", lang)}
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
                <Row
                  style={{
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    display: "flex",
                    marginLeft: "0px"
                  }}
                >
                  <CustomInput
                    id="my0:startDate"
                    name="workHistory"
                    label={this.renderLabel(translatedProps, "startDate", lang)}
                    type="date"
                    value={startDate}
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
                  <CustomInput
                    id="my0:endDate"
                    label={this.renderLabel(translatedProps, "endDate", lang)}
                    name="workHistory"
                    type="date"
                    value={endDate}
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
                  <div style={{ marginTop: "5px", width: "100%" }}>
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
                  </div>
                  <div style={{ marginTop: "5px", width: "100%" }}>
                    <CustomInput
                      id="my0:organizationWebsite"
                      name="organization"
                      label={this.renderLabel(
                        translatedPropsOrg,
                        "organizationWebsite",
                        lang
                      )}
                      type="text"
                      value={organizationWebsite}
                      handleChange={this.handleInputChange}
                    />
                  </div>
                  <CustomInput
                    id="my0:organizationPhoneNumber"
                    name="organization"
                    label={this.renderLabel(
                      translatedPropsOrg,
                      "organizationPhoneNumber",
                      lang
                    )}
                    value={organizationPhoneNumber}
                    handleChange={this.handleInputChange}
                  />
                  <Row>
                    <Col sm={6}>
                      <CustomInput
                        id="my0:postalCode"
                        label={this.renderLabel(
                          translatedPropsAddr,
                          "postalCode",
                          lang
                        )}
                        name="address"
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
                  <Row
                    style={{
                      width: "100%",
                      justifyContent: "left",
                      marginLeft: "0px",
                      marginBottom: "8px"
                    }}
                  >
                    <label className="label-rw">
                      {this.renderLabel(
                        translatedPropsOrg,
                        "organizationField",
                        lang
                      )}
                    </label>
                    <Combobox
                      name="my0:organizationField"
                      placeholder={this.renderLabel(
                        translatedPropsOrg,
                        "organizationField",
                        lang
                      )}
                      data={this.props.industries}
                      value={organizationField}
                      textField={lang}
                      valueField="@type"
                      caseSensitive={false}
                      minLength={3}
                      filter="contains"
                      onChange={value =>
                        this.handleSelectChange(
                          value,
                          "my0:organizationField",
                          "organization"
                        )
                      }
                    />
                  </Row>
                  <div style={{ width: "100%" }}>
                    <CustomTextarea
                      id="my0:organizationDescription"
                      name="organization"
                      label={this.renderLabel(
                        translatedPropsOrg,
                        "organizationDescription",
                        lang
                      )}
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
                  label={this.renderLabel(translatedProps, "jobTitle", lang)}
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
                  <label className="label-rw">
                    {this.renderLabel(translatedProps, "jobMode", lang)}
                  </label>
                  <Combobox
                    name="my0:jobMode"
                    placeholder={this.renderLabel(
                      translatedProps,
                      "jobMode",
                      lang
                    )}
                    data={this.props.jobmodes}
                    textField={lang}
                    valueField="@type"
                    value={jobMode}
                    caseSensitive={false}
                    minLength={3}
                    filter="contains"
                    onChange={value =>
                      this.handleSelectChange(
                        value,
                        "my0:jobMode",
                        "workHistory"
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
                  <label className="label-rw">
                    {this.renderLabel(translatedProps, "careerLevel", lang)}
                  </label>
                  <Combobox
                    name="my0:careerLevel"
                    placeholder={this.renderLabel(
                      translatedProps,
                      "careerLevel",
                      lang
                    )}
                    data={this.props.careerlevels}
                    textField={lang}
                    valueField="@type"
                    value={careerLevel}
                    caseSensitive={false}
                    minLength={3}
                    filter="contains"
                    onChange={value =>
                      this.handleSelectChange(
                        value,
                        "my0:careerLevel",
                        "workHistory"
                      )
                    }
                  />
                </Row>
                <CustomTextarea
                  id="my0:jobDescription"
                  name="workHistory"
                  label={this.renderLabel(
                    translatedProps,
                    "jobDescription",
                    lang
                  )}
                  value={jobDescription}
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
        </form>
      </Modal>
    );
  }
}

const mapstateToProps = (state, ownProps) => {
  return {
    language: state.utility.language,
    industries: retrieveBaseProperties(state.utility.industries),
    translatedPropsOrg: retrieveMainProperties(
      state.utility["my0:Organization"]
    ),
    translatedPropsAddr: retrieveMainProperties(state.utility["my0:Address"]),
    translatedProps: retrieveMainProperties(state.utility["my0:WorkHistory"]),
    initialValues: state.cv["my0:hasWorkHistory"][ownProps.id],
    countries: retrieveCountryValues(state.utility.countryValues),
    jobmodes: retrieveBaseProperties(state.utility.jobModeValues),
    careerlevels: retrieveBaseProperties(state.utility.careerLevelValues),
    companysizes: retrieveBaseProperties(state.utility.companySizeValues)
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
    fetchCompanySizes,
    fetchAllIndustryTypess,
    fetchMainPropertiess
  }
)(WorkHistoryModal);

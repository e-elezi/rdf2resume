import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import AddButton from "../../core/AddButton";
import RemoveButton from "../../core/RemoveButton";
import CustomInput from "../../core/CustomInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import CustomRadioGroup from "../../core/CustomRadioGroup";
import { Combobox, Multiselect } from "react-widgets";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import CustomTextarea from "../../core/CustomTextarea";
import {
  updateAboutPerson,
  createIM,
  updateIM,
  removeIM,
  createWebsite,
  updateWebsite,
  removeWebsite
} from "../../../actions";
import {
  fetchCountries,
  fetchGenders,
  fetchTitleProperties,
  fetchAllWebsiteTypess,
  fetchAllIMTypess,
  updateError,
  fetchMainPropertiess
} from "../../../actions/utilityActions";
import {
  retrieveCountryValues,
  retrieveMainProperties,
  retrieveBaseProperties
} from "../../../utilities/utilityQueries";
import {
  personalAccepted,
  personalIM,
  personalSizeMax,
  personalWebsite,
  mainSidebar,
  personalNationalityAlert
} from "../../../translations/translations";
import axios from "axios";

class FormPersonal extends Component {
  constructor(props) {
    super(props);
    // Create the ref
    this.inputHiddenRef = React.createRef();
    this.state = {};
  }

  componentWillMount() {
    this.props.fetchCountries();
    this.props.fetchGenders();
    this.props.fetchTitleProperties();
    this.props.fetchAllWebsiteTypess();
    this.props.fetchAllIMTypess();
    this.props.fetchMainPropertiess("my0:Person");
    this.props.fetchMainPropertiess("my0:Address");
    this.props.fetchMainPropertiess("my0:Website");
    this.props.fetchMainPropertiess("my0:InstantMessaging");
  }

  handleInputChange = (e, secondLevel) => {
    this.props.updateAboutPerson({
      id: e.target.id,
      value: e.target.value,
      secondLevel
    });
  };

  handleInputChangeWithLanguage = (e, lang, secondLevel) => {
    this.props.updateAboutPerson({
      id: e.target.id,
      language: lang,
      value: e.target.value,
      secondLevel
    });
  };

  handleSelectChange = (name, value, secondLevel) => {
    this.props.updateAboutPerson({
      id: name,
      value: value["@type"],
      secondLevel
    });
  };

  handleMultiSelectChange = (name, value, lang) => {
    let myarr = [];
    let length = value.length;
    if (name === "hasCitizenship" || name === "hasNationality") {
      if (value.length >= 3) {
        Swal.fire({
          title: "Warning!",
          text: personalNationalityAlert[lang],
          type: "warning",
          confirmButtonColor: "#4bb3cc",
          heightAuto: false,
          confirmButtonText: "Okay"
        });
        return;
      }
    }
    for (let i = 0; i < length; i++) {
      myarr.push(value[i]["@type"]);
    }
    this.props.updateAboutPerson({ id: name, value: myarr });
  };

  handleRadioChange = e => {
    this.props.updateAboutPerson({ id: e.target.name, value: e.target.id });
  };

  addWebsite = id => {
    this.props.createWebsite();
  };

  updateWebsite = (name, value, index) => {
    if (value["@type"]) {
      this.props.updateWebsite({
        id: index,
        name: name,
        value: value["@type"]
      });
    } else {
      this.props.updateWebsite({ id: index, name: name, value: value });
    }
  };

  removeWebsite = index => {
    this.props.removeWebsite(index);
  };

  addInstantMessaging = id => {
    this.props.createIM();
  };

  updateInstantMessaging = (name, value, index) => {
    if (value["@type"]) {
      this.props.updateIM({ id: index, name: name, value: value["@type"] });
    } else {
      this.props.updateIM({ id: index, name: name, value: value });
    }
  };

  removeInstantMessaging = index => {
    this.props.removeIM(index);
  };

  handleAddPhotoClick = () => {
    this.inputHiddenRef.click();
  };

  onChangePhotoUpload = async e => {
    let file = e.target.files[0];
    var formData = new FormData();
    formData.append("file", file);
    axios
      .post("/upload_photo", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(resp => {
        this.props.updateAboutPerson({
          id: "photo",
          value: resp.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  clearPhotoUpload = () => {
    this.props.updateAboutPerson({
      id: "photo",
      value: ""
    });
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

  handleBlur = e => {
    let label = e.target.id;
    if (label === "firstName" || label === "lastName" || label === "email") {
      if (e.target.value === "") {
        this.props.updateError({
          object: "my0:" + label,
          value: true
        });
      } else {
        this.props.updateError({
          object: "my0:" + label,
          value: false
        });
      }
    }
  };

  findTranslatedValue(data, lang) {
    let length = data.length;
    for (let i = 0; i < length; i++) {
      if (data[i]["@language"] === lang) {
        return data[i]["@value"];
      }
    }
  }

  render() {
    let {
      "my0:firstName": firstName,
      "my0:lastName": lastName,
      "my0:hasCitizenship": hasCitizenship,
      "my0:hasNationality": hasNationality,
      "my0:dateOfBirth": dateOfBirth,
      "my0:gender": gender,
      "my0:phoneNumber": phoneNumber,
      "my0:email": email,
      "my0:title": title,
      "my0:driversLicence": driversLicence,
      "my0:address": address,
      "my0:personShortDescription": personShortDescription,
      "my0:personLongDescription": personLongDescription,
      "my0:hasWebsite": hasWebsite,
      "my0:photo": photo
    } = this.props.aboutperson;

    let titlePage = mainSidebar[1];

    let {
      translatedProps,
      translatedPropsAddr,
      translatedPropsWeb,
      translatedPropsIM
    } = this.props;

    let lang = this.props.language;

    let error = this.props.error;

    let instantMessaging = this.props.aboutperson["my0:hasInstantMessaging"];

    return (
      <Row className="main-content-row">
        <Col md={4}>
          <h4 style={{ marginTop: "10px" }}>{titlePage[lang]}</h4>
          <CustomTextarea
            id="personShortDescription"
            rows="5"
            label={this.renderLabel(translatedProps, "personShortDescription", lang)}
            value={this.findTranslatedValue(personShortDescription, lang)}
            handleChange={(e) => this.handleInputChangeWithLanguage(e, lang)}
          />
          <CustomTextarea
            id="personLongDescription"
            rows="15"
            label={this.renderLabel(translatedProps, "personLongDescription", lang)}
            value={this.findTranslatedValue(personLongDescription, lang)}
            handleChange={(e) => this.handleInputChangeWithLanguage(e, lang)}
          />
        </Col>
        <Col md={4} className="pt-4">
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
            onChange={value => this.handleSelectChange("title", value)}
          />
          <div className="row">
            <div className="col col-sm-6">
              <CustomInput
                id="firstName"
                label={
                  this.renderLabel(translatedProps, "firstName", lang) + " *"
                }
                type="text"
                handleBlurEvent={this.handleBlur}
                value={firstName}
                handleChange={this.handleInputChange}
              />
              {error["my0:firstName"] ? (
                <span className="error">Required</span>
              ) : (
                  ""
                )}
            </div>
            <div className="col col-sm-6">
              <CustomInput
                id="lastName"
                label={
                  this.renderLabel(translatedProps, "lastName", lang) + " *"
                }
                type="text"
                value={lastName}
                handleBlurEvent={this.handleBlur}
                handleChange={this.handleInputChange}
              />
              {error["my0:lastName"] ? (
                <span className="error">Required</span>
              ) : (
                  ""
                )}
            </div>
          </div>
          <CustomInput
            id="email"
            label={this.renderLabel(translatedProps, "email", lang) + " *"}
            type="text"
            handleBlurEvent={this.handleBlur}
            value={email}
            handleChange={this.handleInputChange}
          />
          {error["my0:email"] ? <span className="error">Required</span> : ""}
          <CustomInput
            id="phoneNumber"
            label={this.renderLabel(translatedProps, "phoneNumber", lang)}
            type="text"
            value={phoneNumber}
            handleChange={this.handleInputChange}
          />
          <div>
            <CustomInput
              id="street"
              label={this.renderLabel(translatedPropsAddr, "street", lang)}
              type="text"
              value={this.findTranslatedValue(address["my0:street"], lang)}
              handleChange={e => this.handleInputChangeWithLanguage(e, lang, "address")}
            />
            <Row>
              <Col md={6}>
                <CustomInput
                  id="postalCode"
                  label={this.renderLabel(
                    translatedPropsAddr,
                    "postalCode",
                    lang
                  )}
                  type="text"
                  value={address["my0:postalCode"]}
                  handleChange={e => this.handleInputChange(e, "address")}
                />
              </Col>
              <Col md={6}>
                <CustomInput
                  id="city"
                  label={this.renderLabel(translatedPropsAddr, "city", lang)}
                  type="text"
                  value={this.findTranslatedValue(address["my0:city"], lang)}
                  handleChange={e => this.handleInputChangeWithLanguage(e, lang, "address")}
                />
              </Col>
            </Row>
            <label className="label-rw">
              {this.renderLabel(translatedPropsAddr, "country", lang)}
            </label>
            <Combobox
              name="country"
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
                this.handleSelectChange("country", value, "address")
              }
            />
          </div>
          <CustomInput
            id="dateOfBirth"
            label={this.renderLabel(translatedProps, "dateOfBirth", lang)}
            type="date"
            value={dateOfBirth}
            handleChange={this.handleInputChange}
          />
          <label className="label-rw">
            {this.renderLabel(translatedProps, "hasCitizenship", lang)}
          </label>
          <Multiselect
            name="hasCitizenship"
            data={this.props.countries}
            textField={lang}
            valueField="@type"
            value={hasCitizenship}
            placeholder={this.renderLabel(
              translatedProps,
              "hasCitizenship",
              lang
            )}
            caseSensitive={false}
            minLength={3}
            filter="contains"
            onChange={value =>
              this.handleMultiSelectChange("hasCitizenship", value, lang)
            }
          />
          <label className="label-rw">
            {this.renderLabel(translatedProps, "hasNationality", lang)}
          </label>
          <Multiselect
            name="hasNationality"
            data={this.props.countries}
            textField={lang}
            valueField="@type"
            value={hasNationality}
            placeholder={this.renderLabel(
              translatedProps,
              "hasNationality",
              lang
            )}
            caseSensitive={false}
            minLength={3}
            filter="contains"
            onChange={value =>
              this.handleMultiSelectChange("hasNationality", value, lang)
            }
          />
          <CustomInput
            id="driversLicence"
            label={this.renderLabel(translatedProps, "driversLicence", lang)}
            type="text"
            value={driversLicence}
            handleChange={this.handleInputChange}
          />
          <div className="mb-3" />
          <Row className="m-0">
            <Col md={5} className="p-0">
              <p className="mb-0">{personalWebsite[lang]}</p>
            </Col>
            <Col md={5} className="p-0" />
            <Col md={2} className="p-0 instant-add-wrapper">
              <AddButton
                classnames="add-button small-button"
                handleClick={() => this.addWebsite("hasWebsite")}
              />
            </Col>
          </Row>
          {hasWebsite.map((member, index) => (
            <Row key={index}>
              <Col md={4} className="pr-0">
                <div style={{ marginTop: "22px" }}>
                  <Combobox
                    name="websiteType"
                    data={this.props.websites}
                    textField={lang}
                    valueField="@type"
                    value={member["my0:websiteType"]}
                    placeholder={this.renderLabel(
                      translatedPropsWeb,
                      "websiteType",
                      lang
                    )}
                    caseSensitive={false}
                    minLength={3}
                    filter="contains"
                    onChange={value =>
                      this.updateWebsite("my0:websiteType", value, index)
                    }
                  />
                </div>
              </Col>
              <Col md={7} style={{ marginTop: "7px" }}>
                <CustomInput
                  id="websiteURL"
                  label={this.renderLabel(
                    translatedPropsWeb,
                    "websiteURL",
                    lang
                  )}
                  type="text"
                  value={member["my0:websiteURL"]}
                  handleChange={e =>
                    this.updateWebsite("my0:websiteURL", e.target.value, index)
                  }
                />
              </Col>
              <Col md={1}>
                <RemoveButton
                  classnames="shift-left"
                  handleClick={() => this.removeInstantMessaging(index)}
                />
              </Col>
            </Row>
          ))}
          <div className="mb-3" />
          <Row className="m-0">
            <Col md={5} className="p-0">
              <p className="mb-0">{personalIM[lang]}</p>
            </Col>
            <Col md={5} className="p-0" />
            <Col md={2} className="p-0 instant-add-wrapper">
              <AddButton
                classnames="add-button small-button"
                handleClick={() =>
                  this.addInstantMessaging("hasInstantMessaging")
                }
              />
            </Col>
          </Row>

          {instantMessaging.map((member, index) => (
            <Row key={index}>
              <Col md={6} className="pr-0">
                <div style={{ marginTop: "22px" }}>
                  <Combobox
                    name="instantMessagingName"
                    data={this.props.ims}
                    textField={lang}
                    valueField="@type"
                    value={member["my0:instantMessagingName"]}
                    placeholder={this.renderLabel(
                      translatedPropsIM,
                      "instantMessagingName",
                      lang
                    )}
                    caseSensitive={false}
                    minLength={3}
                    filter="contains"
                    onChange={value =>
                      this.updateInstantMessaging(
                        "my0:instantMessagingName",
                        value,
                        index
                      )
                    }
                  />
                </div>
              </Col>
              <Col md={5} style={{ marginTop: "7px" }}>
                <CustomInput
                  id="my0:instantMessagingUsername"
                  label={this.renderLabel(
                    translatedPropsIM,
                    "instantMessagingUsername",
                    lang
                  )}
                  type="text"
                  value={member["my0:instantMessagingUsername"]}
                  handleChange={e =>
                    this.updateInstantMessaging(
                      "my0:instantMessagingUsername",
                      e.target.value,
                      index
                    )
                  }
                />
              </Col>
              <Col md={1}>
                <RemoveButton
                  classnames="shift-left"
                  handleClick={() => this.removeInstantMessaging(index)}
                />
              </Col>
            </Row>
          ))}
        </Col>
        <Col md={4}>
          <div style={{ marginTop: "75px" }}>
            <div className="photo-div-container" width="250px" height="300px">
              {photo ? (
                <React.Fragment>
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    onClick={this.clearPhotoUpload}
                  />
                  <img
                    src={"../../static/media/photos/" + photo}
                    width="250px"
                    height="300px"
                    alt=""
                  ></img>
                </React.Fragment>
              ) : (
                  <div className="photo-div">
                    <p
                      style={{
                        textAlign: "center",
                        marginTop: "10px",
                        marginBottom: "0"
                      }}
                    >
                      {this.renderLabel(translatedProps, "photo", lang)}
                    </p>
                    <div className="photo-div-button">
                      <AddButton
                        handleClick={this.handleAddPhotoClick}
                        classnames="add-button"
                      />
                      <input
                        onChange={this.onChangePhotoUpload}
                        ref={inputHiddenRef =>
                          (this.inputHiddenRef = inputHiddenRef)
                        }
                        type="file"
                        hidden
                      />
                    </div>
                  </div>
                )}
            </div>
            <div
              className="alert alert-warning"
              style={{
                margin: 0,
                padding: "10px",
                fontSize: "14px",
                marginTop: "15px",
                maxWidth: "250px"
              }}
              role="alert"
            >
              {personalAccepted[lang]}
              <br />
              {personalSizeMax[lang]}
            </div>
            <CustomRadioGroup
              items={this.props.genders}
              lang={lang}
              name="gender"
              value={gender}
              handleChange={this.handleRadioChange}
            />
          </div>
        </Col>
      </Row>
    );
  }
}

const mapstateToProps = state => {
  return {
    language: state.utility.language,
    countries: retrieveCountryValues(state.utility.countryValues),
    genders: retrieveBaseProperties(state.utility.genderValues),
    titles: retrieveBaseProperties(state.utility.titleValues),
    ims: retrieveBaseProperties(state.utility.ims),
    websites: retrieveBaseProperties(state.utility.websites),
    translatedProps: retrieveMainProperties(state.utility["my0:Person"]),
    translatedPropsAddr: retrieveMainProperties(state.utility["my0:Address"]),
    translatedPropsWeb: retrieveMainProperties(state.utility["my0:Website"]),
    translatedPropsIM: retrieveMainProperties(
      state.utility["my0:InstantMessaging"]
    ),
    aboutperson: state.cv["my0:aboutPerson"],
    error: state.utility.error
  };
};

export default connect(
  mapstateToProps,
  {
    fetchCountries,
    updateAboutPerson,
    fetchGenders,
    fetchTitleProperties,
    fetchAllWebsiteTypess,
    fetchMainPropertiess,
    fetchAllIMTypess,
    createIM,
    updateIM,
    removeIM,
    updateError,
    createWebsite,
    updateWebsite,
    removeWebsite
  }
)(FormPersonal);

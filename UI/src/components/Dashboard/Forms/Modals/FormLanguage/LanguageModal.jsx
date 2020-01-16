import React, { Component } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { Modal, Row, Col, Button } from "react-bootstrap";
import { Combobox } from "react-widgets";
import { createOtherSkill, updateOtherSkill, updateCVLastUpdate } from "../../../../../actions";
import CustomInput from "../../../../core/CustomInput";
import CustomCheckbox from "../../../../core/CustomCheckbox";
import {
  fetchLanguageSkillSelfAssessmentProperties,
  fetchMainPropertiess,
  updateLanguage
} from "../../../../../actions/utilityActions";
import {
  retrieveMainProperties,
  retrieveBaseProperties
} from "../../../../../utilities/utilityQueries";
import {
  cancelLabel,
  resetLabel,
  saveLabel,
  updateLabel,
  languageAddTitle,
  languageUpdateTitle,
  successTitle
} from "../../../../../translations/translations";
import { ListItem, languages } from "../../../../core/LanguageToggle";

class LanguageModal extends Component {
  state = {
    language: '',
    languageSkill: {
      "@type": "my0:LanguageSkill",
      "my0:skillName": [{
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
      "my0:languageSkillProficiency": "",
      "my0:skillHasCertificate": true,
      "my0:skillCertificateName": [{
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
    this.props.fetchLanguageSkillSelfAssessmentProperties();
    this.props.fetchMainPropertiess("my0:LanguageSkill");
    this.props.fetchMainPropertiess("my0:Skill");
    this.setInitialValues();
    this.setState({
      language: this.props.language
    })
  }

  setInitialValues = () => {
    if (this.props.id !== null && this.props.isUpdate === true) {
      let inputRef = this.props.initialValues;
      let languageSkill = { ...this.state.languageSkill };
      languageSkill["my0:skillName"] = inputRef["my0:skillName"];
      languageSkill["my0:languageSkillProficiency"] =
        inputRef["my0:languageSkillProficiency"];
      languageSkill["my0:skillHasCertificate"] = inputRef["my0:skillHasCertificate"];
      languageSkill["my0:skillCertificateName"] = inputRef["my0:skillCertificateName"];

      this.setState({
        languageSkill
      });
    }
  };

  clearForm = () => {
    if (!this.props.isUpdate) {
      this.setState({
        languageSkill: {
          "@type": "my0:LanguageSkill",
          "my0:skillName": [{
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
          "my0:languageSkillProficiency": "",
          "my0:skillHasCertificate": true,
          "my0:skillCertificateName": [{
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
    let label = e.target.id;
    let languageSkill = { ...this.state.languageSkill };
    if (lang) {
      languageSkill[label] = this.replaceLanguageValue(languageSkill[label], lang, e.target.value);
    } else {
      languageSkill[label] = e.target.value;
    }
    this.setState({
      languageSkill
    });
  };

  handleSelectChange = (value, id) => {
    let obj = { ...this.state.languageSkill };
    let label = id;
    obj[label] = value["@type"];
    this.setState({
      languageSkill: obj
    });
  };

  handleSave = e => {
    e.preventDefault();
    this.props.createOtherSkill(this.state.languageSkill);
    this.props.updateCVLastUpdate();
    this.props.onHide();
    Swal.fire({
      title: successTitle[this.props.language],
      type: "success",
      confirmButtonColor: "#4bb3cc",
      heightAuto: false,
      confirmButtonText: "Okay"
    });
  };

  handleUpdate = e => {
    this.props.updateOtherSkill({
      object: this.state.languageSkill,
      index: this.props.id
    });
    this.props.updateCVLastUpdate();
    this.props.onHide();
    Swal.fire({
      title: successTitle[this.props.language],
      type: "success",
      confirmButtonColor: "#4bb3cc",
      heightAuto: false,
      confirmButtonText: "Okay"
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
      this.state.languageSkill["my0:skillName"] === "" ||
      this.state.languageSkill["my0:languageSkillProficiency"] === "";
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
          type="submit"
          variant="primary"
          disabled={isDisabled}
          onClick={e => this.handleUpdate(e, this.props.id)}
        >
          {updateLabel[lang]}
        </Button>
      );
    }
  };

  handleCheckboxChange = e => {
    let languageSkill = { ...this.state.languageSkill };
    languageSkill[e.target.id] = e.target.checked;
    this.setState({
      languageSkill
    });
  };

  render() {
    let {
      "my0:skillName": skillName,
      "my0:skillHasCertificate": skillHasCertificate,
      "my0:skillCertificateName": skillCertificateName,
      "my0:languageSkillProficiency": languageSkillProficiency
    } = this.state.languageSkill;
    let { onHide } = this.props;

    let lang = this.state.language;
    let changeLanguage = (value) => this.setState({ language: value });
    let types = this.props.types;
    let { translatedProps, translatedPropsSkill } = this.props;
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
                  ? languageUpdateTitle[lang]
                  : languageAddTitle[lang]}
              </Col>
            </Row>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row
            style={{
              width: "100%",
              justifyContent: "left",
              marginLeft: "0px",
              marginBottom: "8px"
            }}
          >
            <CustomInput
              id="my0:skillName"
              label={
                this.renderLabel(translatedPropsSkill, "skillName", lang) +
                " *"
              }
              type="text"
              value={this.findTranslatedValue(skillName, lang)}
              handleChange={(e) => this.handleInputChange(e, lang)}
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
                translatedProps,
                "languageSkillProficiency",
                lang
              ) + " *"}
            </label>
            <Combobox
              name="my0:languageSkillProficiency"
              placeholder={this.renderLabel(
                translatedProps,
                "languageSkillProficiency",
                lang
              )}
              data={types}
              textField={lang}
              valueField="@type"
              value={languageSkillProficiency}
              caseSensitive={false}
              minLength={3}
              filter="contains"
              onChange={value =>
                this.handleSelectChange(
                  value,
                  "my0:languageSkillProficiency"
                )
              }
            />
          </Row>
          <CustomCheckbox
            id="my0:skillHasCertificate"
            type="checkbox"
            label={this.renderLabel(
              translatedPropsSkill,
              "skillHasCertificate",
              lang
            )}
            checked={skillHasCertificate}
            handleChange={this.handleCheckboxChange}
          />
          <CustomInput
            id="my0:skillCertificateName"
            label={
              this.renderLabel(translatedPropsSkill, "skillCertificateName", lang)
            }
            type="text"
            value={this.findTranslatedValue(skillCertificateName, lang)}
            handleChange={(e) => this.handleInputChange(e, lang)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Combobox onChange={changeLanguage} value={lang} defaultValue={"en"} containerClassName="languagebox" data={languages} itemComponent={ListItem} />
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

const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: state.cv["my0:hasSkill"][ownProps.id],
    language: state.utility.language,
    translatedProps: retrieveMainProperties(state.utility["my0:LanguageSkill"]),
    translatedPropsSkill: retrieveMainProperties(state.utility["my0:Skill"]),
    types: retrieveBaseProperties(state.utility.languageSelfAssessmentValues)
  };
};

export default connect(
  mapStateToProps,
  {
    createOtherSkill,
    updateOtherSkill,
    fetchLanguageSkillSelfAssessmentProperties,
    fetchMainPropertiess,
    updateCVLastUpdate,
    updateLanguage
  }
)(LanguageModal);

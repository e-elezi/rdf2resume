import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Row, Col, Button } from "react-bootstrap";
import { Combobox } from "react-widgets";
import { createOtherSkill, updateOtherSkill } from "../../../../../actions";
import CustomInput from "../../../../core/CustomInput";
import {
  fetchLanguageSkillSelfAssessmentProperties,
  fetchMainPropertiess
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
  languageUpdateTitle
} from "../../../../../translations/translations";

class LanguageModal extends Component {
  state = {
    languageSkill: {
      "@type": "my0:LanguageSkill",
      "my0:skillName": "",
      "my0:languageSkillProficiency": ""
    }
  };

  componentWillMount() {
    this.props.fetchLanguageSkillSelfAssessmentProperties();
    this.props.fetchMainPropertiess("my0:LanguageSkill");
    this.props.fetchMainPropertiess("my0:Skill");
    this.setInitialValues();
  }

  setInitialValues = () => {
    if (this.props.id !== null && this.props.isUpdate === true) {
      let inputRef = this.props.initialValues;
      let languageSkill = { ...this.state.languageSkill };
      languageSkill["my0:skillName"] = inputRef["my0:skillName"];
      languageSkill["my0:languageSkillProficiency"] =
        inputRef["my0:languageSkillProficiency"];
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
          "my0:skillName": "",
          "my0:languageSkillProficiency": ""
        }
      });
    } else {
      this.setInitialValues();
    }
  };

  handleInputChange = e => {
    let label = e.target.id;
    let languageSkill = { ...this.state.languageSkill };
    languageSkill[label] = e.target.value;
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
  };

  handleUpdate = e => {
    this.props.updateOtherSkill({
      object: this.state.languageSkill,
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

  render() {
    let {
      "my0:skillName": skillName,
      "my0:languageSkillProficiency": languageSkillProficiency
    } = this.state.languageSkill;
    let { onHide } = this.props;

    let lang = this.props.language;
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
          <Row style={{ alignItems: "flex-start" }}>
            <Col md={1} style={{ paddingRight: "25px" }}></Col>
            <Col md={10} style={{ paddingRight: "25px" }}>
              <Row
                style={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  display: "flex",
                  marginLeft: "0px"
                }}
              >
                <CustomInput
                  id="my0:skillName"
                  label={
                    this.renderLabel(translatedPropsSkill, "skillName", lang) +
                    " *"
                  }
                  type="text"
                  value={skillName}
                  handleChange={this.handleInputChange}
                />
              </Row>
              <Row
                style={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  display: "flex",
                  marginLeft: "0px",
                  marginTop: "10px"
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
            </Col>
            <Col md={1} style={{ paddingRight: "25px" }}></Col>
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
    fetchMainPropertiess
  }
)(LanguageModal);

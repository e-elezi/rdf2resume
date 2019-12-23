import React, { Component } from "react";
import { connect } from "react-redux";
import { Combobox } from "react-widgets";
import { Modal, Row, Col, Button } from "react-bootstrap";
import CustomTextarea from "../../../../core/CustomTextarea";
import { createOtherSkill, updateOtherSkill } from "../../../../../actions";
// import CustomInput from "../../../../core/CustomInput";
import CustomCheckbox from "../../../../core/CustomCheckbox";
import {
  fetchMainPropertiess,
  fetchSkillCategories,
  fetchSkillSuggestion
} from "../../../../../actions/utilityActions";
import {
  retrieveMainProperties,
  retrieveBaseProperties
} from "../../../../../utilities/utilityQueries";
import {
  cancelLabel,
  resetLabel,
  saveLabel,
  updateLabel
} from "../../../../../translations/translations";
import CustomLevelButton from "../../../../core/CustomLevelButton";
import {
  skillAddTitle,
  skillUpdateTitle
} from "../../../../../translations/translations";

class SkillModal extends Component {
  state = {
    otherSkill: {
      "@type": "my0:Skill",
      "my0:skillName": "",
      "my0:skillDescription": "",
      "my0:skillCategory": "",
      "my0:skillLevel": "",
      "my0:skillHasCertificate": true
    }
  };

  componentWillMount() {
    this.setInitialValues();
    this.props.fetchSkillCategories();
    this.props.fetchMainPropertiess("my0:Skill");
    this.props.fetchSkillSuggestion();
  }

  setInitialValues = () => {
    if (this.props.id !== null && this.props.isUpdate === true) {
      let inputRef = this.props.initialValues;
      let otherSkill = { ...this.state.otherSkill };
      otherSkill["my0:skillName"] = inputRef["my0:skillName"];
      otherSkill["my0:skillCategory"] = inputRef["my0:skillCategory"];
      otherSkill["my0:skillDescription"] = inputRef["my0:skillDescription"];
      otherSkill["my0:skillLevel"] = inputRef["my0:skillLevel"];
      otherSkill["my0:skillHasCertificate"] =
        inputRef["my0:skillHasCertificate"];
      this.setState({
        otherSkill
      });
    }
  };

  clearForm = () => {
    if (!this.props.isUpdate) {
      this.setState({
        otherSkill: {
          "@type": "my0:Skill",
          "my0:skillName": "",
          "my0:skillDescription": "",
          "my0:skillCategory": "",
          "my0:skillLevel": "",
          "my0:skillHasCertificate": true
        }
      });
    } else {
      this.setInitialValues();
    }
  };

  handleCheckboxChange = e => {
    let otherSkill = { ...this.state.otherSkill };
    otherSkill[e.target.id] = e.target.checked;
    this.setState({
      otherSkill
    });
  };

  handleInputChange = e => {
    let label = e.target.id;
    let otherSkill = { ...this.state.otherSkill };
    otherSkill[label] = e.target.value;
    this.setState({
      otherSkill
    });
  };

  handleSelectChange = (value, id) => {
    let obj = { ...this.state.otherSkill };
    let label = id;
    obj[label] = value["@type"];
    this.setState({
      otherSkill: obj
    });
  };

  handleSave = e => {
    e.preventDefault();
    //console.log(this.state.otherSkill);
    this.props.createOtherSkill(this.state.otherSkill);
  };

  handleUpdate = e => {
    this.props.updateOtherSkill({
      object: this.state.otherSkill,
      index: this.props.id
    });
  };

  handleRenderingSubmitButton = lang => {
    let isDisabled =
      this.state.otherSkill["my0:skillName"] === "" ||
      this.state.otherSkill["my0:skillCategory"] === "" ||
      this.state.otherSkill["my0:skillLevel"] === "";
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

  handleLevelClick = e => {
    let label = "my0:skillLevel";
    let otherSkill = { ...this.state.otherSkill };
    otherSkill[label] = e.target.id;
    this.setState({
      otherSkill
    });
  };

  handleSkillSuggestion = (value, id, language) => {
    this.props.fetchSkillSuggestion(value, language);
    let obj = { ...this.state.otherSkill };
    let label = id;
    //console.log(value);
    obj[label] = value["title"];
    this.setState({
      otherSkill: obj
    });
  };

  render() {
    let {
      "my0:skillName": skillName,
      "my0:skillCategory": skillCategory,
      "my0:skillDescription": skillDescription,
      "my0:skillHasCertificate": skillHasCertificate,
      "my0:skillLevel": skillLevel
    } = this.state.otherSkill;

    let { onHide } = this.props;

    let lang = this.props.language;

    let { translatedProps } = this.props;

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
              <Col md={4}>
                {this.props.isUpdate
                  ? skillUpdateTitle[lang]
                  : skillAddTitle[lang]}
              </Col>
              <Col md={8} />
            </Row>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={8}>
              {/* <CustomInput
                id="my0:skillName"
                label={
                  this.renderLabel(translatedProps, "skillName", lang) + " *"
                }
                type="text"
                value={skillName}
                handleChange={this.handleInputChange}
              /> */}
              <Combobox
                name="my0:skillName"
                placeholder={
                  this.renderLabel(translatedProps, "skillName", lang) + " *"
                }
                data={this.props.skillSuggestions}
                textField="title"
                valueField="title"
                value={skillName}
                caseSensitive={false}
                onChange={value =>
                  this.handleSkillSuggestion(value, "my0:skillName", lang)
                }
              />
            </Col>
            <Col md={4}>
              <label className="label-rw">
                {this.renderLabel(translatedProps, "skillLevel", lang) + " *"}
              </label>
              <CustomLevelButton
                id="my0:skillLevel"
                label="Skill Level"
                filledNumber={skillLevel}
                handleClick={this.handleLevelClick}
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
              {this.renderLabel(translatedProps, "skillCategory", lang)}
            </label>
            <Combobox
              name="my0:skillCategory"
              placeholder={
                this.renderLabel(translatedProps, "skillCategory", lang) + " *"
              }
              data={this.props.categories}
              textField={lang}
              valueField="@type"
              value={skillCategory}
              caseSensitive={false}
              minLength={3}
              filter="contains"
              onChange={value =>
                this.handleSelectChange(value, "my0:skillCategory")
              }
            />
          </Row>
          <CustomTextarea
            id="my0:skillDescription"
            label={this.renderLabel(translatedProps, "skillDescription", lang)}
            value={skillDescription}
            handleChange={this.handleInputChange}
          />
          <CustomCheckbox
            id="my0:skillHasCertificate"
            type="checkbox"
            label={this.renderLabel(
              translatedProps,
              "skillHasCertificate",
              lang
            )}
            checked={skillHasCertificate}
            handleChange={this.handleCheckboxChange}
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

const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: state.cv["my0:hasSkill"][ownProps.id],
    language: state.utility.language,
    categories: retrieveBaseProperties(state.utility.skillCategories),
    translatedProps: retrieveMainProperties(state.utility["my0:Skill"]),
    skillSuggestions: state.utility.skillSuggestion
  };
};

export default connect(
  mapStateToProps,
  {
    fetchSkillCategories,
    fetchSkillSuggestion,
    createOtherSkill,
    updateOtherSkill,
    fetchMainPropertiess
  }
)(SkillModal);

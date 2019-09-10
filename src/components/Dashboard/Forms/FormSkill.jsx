import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import SkillModal from "./Modals/FormSkill/SkillModal";
import SkillView from "./Modals/FormSkill/SkillView";
import LanguageView from "./Modals/FormLanguage/LanguageView";
import LanguageModal from "./Modals/FormLanguage/LanguageModal";
import AddButton from "../../core/AddButton";
import { updateSkills, createOtherSkill } from "../../../actions";
import {
  fetchLanguageSkillSelfAssessmentProperties,
  fetchSkillCategories
} from "../../../actions/utilityActions";
import { retrieveBaseProperties } from "../../../utilities/utilityQueries";
import { getNameFromURI } from "../../../utilities/utilityFunctions";

class FormSkill extends Component {
  state = {
    showModal: false,
    showLanguageModal: false,
    key: 0
  };

  componentWillMount() {
    this.props.fetchSkillCategories();
    this.props.fetchLanguageSkillSelfAssessmentProperties();
  }

  handleClose = () => {
    let key = this.state.key;
    this.setState({ showModal: false, key: ++key });
  };

  handleShow = () => {
    let key = this.state.key;
    this.setState({ showModal: true, key: ++key });
  };

  handleLanguageClose = () => {
    let key = this.state.key;
    this.setState({ showLanguageModal: false, key: ++key });
  };

  handleLanguageShow = () => {
    let key = this.state.key;
    this.setState({ showLanguageModal: true, key: ++key });
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
    let { showModal, showLanguageModal } = this.state;

    let titlePage = {
      en: "Language Skills",
      fr: "Compétences linguistiques",
      de: "Sprachkenntnisse",
      it: "Competenze linguistiche"
    };

    let addLang = {
      en: "Add language",
      fr: "Ajouter une langue",
      de: "Sprache hinzufügen",
      it: "Aggiungi lingua"
    };

    let titlesub = {
      en: "Other Skills",
      fr: "Autres compétences",
      de: "Andere Fähigkeiten",
      it: "Altre competenze"
    };

    let addskill = {
      en: "Add skill",
      fr: "Ajouter une compétence",
      de: "Skill hinzufügen",
      it: "Aggiungi abilità"
    };

    let lang = this.props.language;

    let categories = this.props.categories;

    return (
      <React.Fragment>
        <Row>
          <Col md={8}>
            <h4 style={{ marginTop: "10px" }}>{titlePage[lang]}</h4>
          </Col>
          <Col md={4} className="side-button-wrapper">
            <Row>
              <Col md={2}>
                <AddButton
                  classnames="add-button"
                  handleClick={this.handleLanguageShow}
                />
                <LanguageModal
                  show={showLanguageModal}
                  key={this.state.key}
                  onHide={this.handleLanguageClose}
                />
              </Col>
              <Col md={10} className="button-label">
                <p>{addLang[lang]}</p>
              </Col>
            </Row>
          </Col>
        </Row>
        {this.props.skills.map((skill, index) =>
          skill["@type"] === "my0:LanguageSkill" ? (
            <LanguageView languageSkillObj={skill} id={index} key={index} />
          ) : (
            ""
          )
        )}

        <Row style={{ marginTop: "50px" }}>
          <Col md={8}>
            <h4 style={{ marginTop: "10px" }}>{titlesub[lang]}</h4>
          </Col>
          <Col md={4} className="side-button-wrapper">
            <Row>
              <Col md={2}>
                <AddButton
                  classnames="add-button"
                  handleClick={this.handleShow}
                />
                <SkillModal
                  show={showModal}
                  key={this.state.key}
                  onHide={this.handleClose}
                />
              </Col>
              <Col md={10} className="button-label">
                <p>{addskill[lang]}</p>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col md={3}>
            <h6>
              <u>{this.renderLabel(categories, "IndustryKnowledge", lang)}</u>
            </h6>
          </Col>
          <Col md={3}>
            <h6>
              <u>{this.renderLabel(categories, "ToolsTechnologies", lang)}</u>
            </h6>
          </Col>
          <Col md={3}>
            <h6>
              <u>{this.renderLabel(categories, "InterpersonalSkills", lang)}</u>
            </h6>
          </Col>
          <Col md={3}>
            <h6>
              <u>{this.renderLabel(categories, "OtherSkills", lang)}</u>
            </h6>
          </Col>
        </Row>
        <Row style={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
          <Col md={3}>
            {this.props.skills.map((skill, index) =>
              skill["@type"] === "my0:Skill" &&
              skill["my0:skillCategory"] &&
              getNameFromURI(skill["my0:skillCategory"]) ===
                "IndustryKnowledge" ? (
                <SkillView skillObj={skill} id={index} key={index} />
              ) : (
                ""
              )
            )}
          </Col>
          <Col md={3}>
            {this.props.skills.map((skill, index) =>
              skill["@type"] === "my0:Skill" &&
              skill["my0:skillCategory"] &&
              getNameFromURI(skill["my0:skillCategory"]) ===
                "ToolsTechnologies" ? (
                <SkillView skillObj={skill} id={index} key={index} />
              ) : (
                ""
              )
            )}
          </Col>
          <Col md={3}>
            {this.props.skills.map((skill, index) =>
              skill["@type"] === "my0:Skill" &&
              skill["my0:skillCategory"] &&
              getNameFromURI(skill["my0:skillCategory"]) ===
                "InterpersonalSkills" ? (
                <SkillView skillObj={skill} id={index} key={index} />
              ) : (
                ""
              )
            )}
          </Col>
          <Col md={3}>
            {this.props.skills.map((skill, index) =>
              skill["@type"] === "my0:Skill" &&
              skill["my0:skillCategory"] &&
              getNameFromURI(skill["my0:skillCategory"]) === "OtherSkills" ? (
                <SkillView skillObj={skill} id={index} key={index} />
              ) : (
                ""
              )
            )}
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    language: state.utility.language,
    categories: retrieveBaseProperties(state.utility.skillCategories),
    skills: state.cv["my0:hasSkill"]
  };
};

export default connect(
  mapStateToProps,
  {
    fetchLanguageSkillSelfAssessmentProperties,
    updateSkills,
    createOtherSkill,
    fetchSkillCategories
  }
)(FormSkill);

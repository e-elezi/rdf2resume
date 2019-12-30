import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { removeOtherSkill } from "../../../../../actions";
import { connect } from "react-redux";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import LanguageModal from "./LanguageModal";
import { fetchLanguageSkillSelfAssessmentProperties } from "../../../../../actions/utilityActions";
import { retrieveBaseProperties } from "../../../../../utilities/utilityQueries";

class LanguageView extends Component {
  state = {
    editMode: false,
    key: 0
  };

  componentWillMount() {
    this.props.fetchLanguageSkillSelfAssessmentProperties();
  }

  handleCloseEdit = () => {
    let key = this.state.key;
    this.setState({ editMode: false, key: ++key });
  };

  handleShowEdit = () => {
    let key = this.state.key;
    this.setState({ editMode: true, key: ++key });
  };

  handleUpdateClick = () => {
    this.setState({
      editMode: true
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
      "my0:skillName": skillName,
      "my0:languageSkillProficiency": languageSkillProficiency
    } = this.props.languageSkillObj;

    let lang = this.props.language;

    return (
      <React.Fragment>
        <Row
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
            marginLeft: "0px",
            marginBottom: '5px'
          }}
        >
          <Col md={8} style={{ paddingLeft: "0" }}>
            <b>{this.findTranslatedValue(skillName, lang)}</b> -{" "}
            {this.renderLabel(
              this.props.types,
              languageSkillProficiency,
              this.props.language
            )}
          </Col>
          <Col md={4}>
            <FontAwesomeIcon
              icon={faEdit}
              onClick={() => this.handleUpdateClick()}
            />
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => this.props.removeOtherSkill(this.props.id)}
            />
          </Col>
        </Row>
        <LanguageModal
          show={this.state.editMode}
          id={this.props.id}
          isUpdate={true}
          onHide={this.handleCloseEdit}
          skillObj={this.props.skillObj}
          key={this.state.key}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    language: state.utility.language,
    types: retrieveBaseProperties(state.utility.languageSelfAssessmentValues)
  };
};

export default connect(
  mapStateToProps,
  { removeOtherSkill, fetchLanguageSkillSelfAssessmentProperties }
)(LanguageView);

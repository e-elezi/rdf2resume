import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { removeOtherSkill } from "../../../../../actions";
import { connect } from "react-redux";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import SkillModal from "./SkillModal";

class SkillView extends Component {
  state = {
    editMode: false,
    key: 0
  };

  handleCloseEdit = () => {
    let key = this.state.key
    this.setState({ editMode: false, key: ++key });
  };

  handleShowEdit = () => {
    let key = this.state.key
    this.setState({ editMode: true, key: ++key });
  };

  handleUpdateClick = () => {
    this.setState({
      editMode: true
    });
  };

  render() {
    let {
      "my0:skillName": skillName,
      "my0:skillDescription": skillDescription,
      "my0:skillHasCertificate": skillHasCertificate,
      "my0:skillLastUsed": skillLastUsed,
      "my0:skillLevel": skillLevel,
      "my0:skillYearsExperience": skillYearsExperience
    } = this.props.skillObj;

    return (
      <React.Fragment>
        <Row
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
            marginLeft: "0px"
          }}
        >
          <Col md={8} style={{ paddingLeft: "0" }}>
            <h4>
              {skillName} | {skillLevel}
            </h4>
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
        <Row
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
            marginLeft: "0px"
          }}
        >
          <p
            style={{
              width: "80%"
            }}
          >
            {skillDescription}
          </p>
        </Row>
        <Row
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
            marginLeft: "0px"
          }}
        >
          <p
            style={{
              width: "80%"
            }}
          >
            {skillLastUsed}
            {skillYearsExperience}
            {skillHasCertificate}
          </p>
        </Row>
        <SkillModal
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

export default connect(
  null,
  { removeOtherSkill }
)(SkillView);

import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { removeOtherSkill } from "../../../../../actions";
import { connect } from "react-redux";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import SkillModal from "./SkillModal";

class SkillView extends Component {
  state = {
    editMode: false
  };

  handleCloseEdit = () => {
    this.setState({ editMode: false });
  };

  handleShowEdit = () => {
    this.setState({ editMode: true });
  };

  handleUpdateClick = () => {
    this.setState({
      editMode: true
    });
  };

  render() {
    let { skillObj } = this.props;
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
              {skillObj.skillName} | {skillObj.skillLevel}
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
            {skillObj.skillDescription}
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
            {skillObj.skillLastUsed}
            {skillObj.skillYearsExperience}
            {skillObj.skillHasCertificate}
          </p>
        </Row>
        <SkillModal
          show={this.state.editMode}
          id={this.props.id}
          isUpdate={true}
          onHide={this.handleCloseEdit}
          skillObj={this.props.skillObj}
        />
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { removeOtherSkill }
)(SkillView);

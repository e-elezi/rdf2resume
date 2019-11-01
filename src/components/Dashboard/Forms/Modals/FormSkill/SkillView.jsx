import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { removeOtherSkill } from "../../../../../actions";
import { connect } from "react-redux";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import SkillModal from "./SkillModal";
import CustomLevelButton from "../../../../core/CustomLevelButton";

class SkillView extends Component {
  state = {
    editMode: false,
    key: 0,
    // showCollapse: false
  };

  // handleCollapseToggle = (e) => {
  //   this.setState({ showCollapse: !this.state.showCollapse })
  // }

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

  handleLevelClick = () => {
    return;
  };

  render() {
    let {
      "my0:skillName": skillName,
      // "my0:skillDescription": skillDescription,
      //"my0:skillHasCertificate": skillHasCertificate,
      "my0:skillLevel": skillLevel
    } = this.props.skillObj;

    return (
      <React.Fragment>
        <Row
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
            marginLeft: "0px"
          }}
          className="skill-cell"
        >
          <Col md={8} style={{ paddingLeft: "0" }}>
            {skillName}{" "}
            <CustomLevelButton
              handleClick={this.handleLevelClick}
              filledNumber={skillLevel}
            />
          </Col>
          <Col md={4}>
            {/* {this.state.showCollapse ? <FontAwesomeIcon
              icon={faCaretUp}
              onClick={() => this.handleCollapseToggle(this.props.id)}
            /> :
              <FontAwesomeIcon
                icon={faCaretDown}
                onClick={() => this.handleCollapseToggle(this.props.id)}
              />} */}
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
        {/* {this.state.showCollapse ? <Row
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

            className="content"
          >
            {skillDescription}
          </p>
        </Row> : ''} */}

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

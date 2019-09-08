import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";
import { removeProject } from "../../../../../actions";
import ProjectModal from "./ProjectModal";
import { getNameFromURI } from "../../../../../utilities/utilityFunctions";

class ProjectView extends Component {
  state = {
    editMode: false,
    key: 0
  };

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

  render() {
    let {
      "my0:projectName": projectName,
      "my0:projectIsCurrent": projectIsCurrent,
      "my0:projectStartDate": projectStartDate,
      "my0:projectEndDate": projectEndDate,
      "my0:projectCreator": projectCreator,
      "my0:projectDescription": projectDescription,
      "my0:projectURL": projectURL
    } = this.props.projectObj;

    return (
      <React.Fragment>
        <Row
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
            display: "flex"
          }}
        >
          <Col md={2}>
            <p>
              {projectStartDate} - {projectEndDate}
            </p>
          </Col>
          <Col md={6}>
            <Row
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
                display: "flex"
              }}
            >
              <b>{projectName}</b>
            </Row>
            <Row
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
                display: "flex"
              }}
            >
              <b>
                <FontAwesomeIcon icon={faMapMarkerAlt} /> {` `}
                {` `}
                <a href={projectURL} className="inline-link" target=" blank">
                  {projectCreator}
                </a>
              </b>
            </Row>
            <Row
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
                display: "flex"
              }}
            >
              {projectDescription}
            </Row>
          </Col>
          <Col md={4}>
            <FontAwesomeIcon
              icon={faEdit}
              onClick={() => this.handleUpdateClick()}
            />
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => this.props.removeCourse(this.props.id)}
            />
          </Col>
        </Row>
        <ProjectModal
          show={this.state.editMode}
          isUpdate={true}
          id={this.props.id}
          onHide={this.handleCloseEdit}
          key={this.state.key}
        />
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { removeProject }
)(ProjectView);

import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { removeProject } from "../../../../../actions";
import ProjectModal from "./ProjectModal";
import { now } from '../../../../../translations/translations';

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

    let current = now;

    let lang = this.props.language;

    return (
      <React.Fragment>
        <Row
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
            display: "flex",
            marginBottom: '10px'
          }}
        >
          <Col md={2}>
            <p>
              {projectStartDate} -{" "}
              {projectIsCurrent ? current[lang] : projectEndDate}
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
              <b>
                <a
                  href={projectURL}
                  className="inline-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {projectName}
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
              <b>
                <FontAwesomeIcon icon={faBookOpen} /> {` `}
                {` `}
                {projectCreator}
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

const mapstateToProps = state => {
  return {
    language: state.utility.language
  };
};

export default connect(
  mapstateToProps,
  { removeProject }
)(ProjectView);

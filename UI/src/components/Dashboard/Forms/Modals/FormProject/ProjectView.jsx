import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faUser, faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { removeProject } from "../../../../../actions";
import ProjectModal from "./ProjectModal";
import { now } from '../../../../../translations/translations';
import { renderPartialDate } from "../../../../../utilities/utilityFunctions";

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
      "my0:projectName": projectName,
      "my0:projectIsCurrent": projectIsCurrent,
      "my0:projectStartDate": projectStartDate,
      "my0:projectEndDate": projectEndDate,
      "my0:projectCreator": projectCreator,
      "my0:projectRole": projectRole,
      "my0:projectDescription": projectDescription,
      "my0:projectURL": projectURL
    } = this.props.projectObj;

    let current = now;

    let lang = this.props.language;

    return (
      <React.Fragment>
        <div className="card">
          <div className="card-header">
            <Col md={2} style={{ paddingLeft: '0' }}>
              <p>
                {renderPartialDate(projectStartDate)} -{" "}
                {projectIsCurrent ? current[lang] : renderPartialDate(projectEndDate)}
              </p>
            </Col>
            <Col md={8}>
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
                    {this.findTranslatedValue(projectName, lang)}
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
                  <FontAwesomeIcon icon={faPencilAlt} /> {` `}
                  {` `}
                  {this.findTranslatedValue(projectCreator, lang)}
                </b>
              </Row>
            </Col>
            <Col md={2} style={{ display: "flex", justifyContent: "flex-end" }}>
              <FontAwesomeIcon
                icon={faEdit}
                onClick={() => this.handleUpdateClick()}
              />
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => this.props.removeProject(this.props.id)}
              />
            </Col>
          </div>
          <div className="card-body">
            <Row>
              <Col md={2}>
              </Col>
              <Col md={8} style={{ paddingLeft: '0' }}>
                {this.findTranslatedValue(projectDescription, lang)}
              </Col>
              <Col md={2}>
              </Col>
            </Row>
            <Row>
              <Col md={2}>
              </Col>
              <Col md={8} style={{ paddingLeft: '0' }}>
                <b>
                  <FontAwesomeIcon icon={faUser} /> {` `}
                  {` `}
                  {this.findTranslatedValue(projectRole, lang)}
                </b>              </Col>
              <Col md={2}>
              </Col>
            </Row>
          </div>
        </div>
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

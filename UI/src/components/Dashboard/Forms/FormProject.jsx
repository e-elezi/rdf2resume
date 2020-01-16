import React, { Component } from "react";
import { Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { connect } from "react-redux";
import ProjectModal from "./Modals/FormProject/ProjectModal";
import ProjectView from "./Modals/FormProject/ProjectView";
import AddButton from "../../core/AddButton";
import {
  projectAddTitle,
  projectNoTitle,
  projectTitle
} from "../../../translations/translations";

class FormCourse extends Component {
  state = {
    showModal: false,
    key: 0
  };

  handleClose = () => {
    let key = this.state.key;
    this.setState({ showModal: false, key: ++key });
  };

  handleShow = () => {
    let key = this.state.key;
    this.setState({ showModal: true, key: ++key });
  };

  render() {
    let { showModal } = this.state;

    let lang = this.props.language;

    return (
      <React.Fragment>
        <Row>
          <Col md={8}>
            <h4 style={{ marginTop: "10px" }}>{projectTitle[lang]}</h4>
          </Col>
          <Col md={4} className="side-button-wrapper">
            <Row>
              <Col md={2}>
                <AddButton
                  classnames="add-button"
                  handleClick={this.handleShow}
                />
                <ProjectModal
                  show={showModal}
                  onHide={this.handleClose}
                  key={this.state.key}
                />
              </Col>
              <Col md={10} className="button-label">
                <p>{projectAddTitle[lang]}</p>
              </Col>
            </Row>
          </Col>
        </Row>
        <ListGroup className="col-md-8 col-sm-12">
          {this.props.projects.length === 0 ? projectNoTitle[lang] : ""}
          {this.props.projects.map((co, index) => (
            <ListGroupItem key={index} className="other-card">
              <ProjectView projectObj={co} id={index} key={index} />
            </ListGroupItem>
          ))}
        </ListGroup>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    projects: state.cv["my0:hasProject"],
    language: state.utility.language
  };
};

export default connect(
  mapStateToProps,
  {}
)(FormCourse);

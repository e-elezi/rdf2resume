import React, { Component } from "react";
import { Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { connect } from "react-redux";
import EducationModal from "./Modals/FormEducation/EducationModal";
import EducationView from "./Modals/FormEducation/EducationView";
import AddButton from "../../core/AddButton";
import {
  educationTitle,
  educationAddTitle,
  educationNoTitle
} from "../../../translations/translations";

class FormEducation extends Component {
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
            <h4 style={{ marginTop: "10px" }}>{educationTitle[lang]}</h4>
          </Col>
          <Col md={4} className="side-button-wrapper">
            <Row>
              <Col md={2}>
                <AddButton
                  classnames="add-button"
                  handleClick={this.handleShow}
                />
                <EducationModal key={this.state.key} show={showModal} onHide={this.handleClose} />
              </Col>
              <Col md={10} className="button-label">
                <p>{educationAddTitle[lang]}</p>
              </Col>
            </Row>
          </Col>
        </Row>
        <ListGroup className="col-md-8 col-sm-12">
          {this.props.education.length === 0 ? educationNoTitle[lang] : ""}
          {this.props.education.map((edu, index) => (
            <ListGroupItem key={index} className="other-card">
              <EducationView educationObj={edu} id={index} />
            </ListGroupItem>
          ))}
        </ListGroup>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    education: state.cv["my0:hasEducation"],
    language: state.utility.language
  };
};

export default connect(
  mapStateToProps,
  {}
)(FormEducation);

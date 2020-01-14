import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import CourseModal from "./Modals/FormCourse/CourseModal";
import CourseView from "./Modals/FormCourse/CourseView";
import AddButton from "../../core/AddButton";
import {
  courseAddTitle,
  courseNoTitle,
  courseTitle
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
            <h4 style={{ marginTop: "10px" }}>{courseTitle[lang]}</h4>
          </Col>
          <Col md={4} className="side-button-wrapper">
            <Row>
              <Col md={2}>
                <AddButton
                  classnames="add-button"
                  handleClick={this.handleShow}
                />
                <CourseModal
                  show={showModal}
                  onHide={this.handleClose}
                  key={this.state.key}
                />
              </Col>
              <Col md={10} className="button-label">
                <p>{courseAddTitle[lang]}</p>
              </Col>
            </Row>
          </Col>
        </Row>
        {this.props.course.length === 0 ? courseNoTitle[lang] : ""}
        {this.props.course.map((co, index) => (
          <CourseView courseObj={co} id={index} key={index} />
        ))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    course: state.cv["my0:hasCourse"],
    language: state.utility.language
  };
};

export default connect(
  mapStateToProps,
  {}
)(FormCourse);

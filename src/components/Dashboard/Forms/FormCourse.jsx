import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import CourseModal from "./Modals/FormCourse/CourseModal";
import CourseView from "./Modals/FormCourse/CourseView";
import AddButton from "../../core/AddButton";
import { getDataArrayOfType } from '../../../utilities/utilityFunctions'

class FormCourse extends Component {
  state = {
    showModal: false,
    key: 0
  };

  handleClose = () => {
    let key = this.state.key;
    this.setState({ showModal: false,
    key: ++key });
  };

  handleShow = () => {
    let key = this.state.key;
    this.setState({ showModal: true, key: ++key  });
  };

  render() {
    let { showModal } = this.state;
    return (
      <React.Fragment>
        <Row>
          <Col md={8}>
            <h4 style={{ marginTop: "10px" }}>Course/Training</h4>
          </Col>
          <Col md={4} className="side-button-wrapper">
            <Row>
              <Col md={2}>
                <AddButton
                  classnames="add-button"
                  handleClick={this.handleShow}
                />
                <CourseModal show={showModal} onHide={this.handleClose} key={this.state.key} />
              </Col>
              <Col md={10} className="button-label">
                <p>Add course / training</p>
              </Col>
            </Row>
          </Col>
        </Row>
        {this.props.course.length === 0
          ? "No courses have been added until now."
          : ""}
        {this.props.course.map((co, index) => (
          <CourseView
            courseObj={co}
            id={co['@id']}
            key={index}
          />
        ))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    course: getDataArrayOfType(state.cv, 'my0:Course' )
  };
};

export default connect(
  mapStateToProps,
  {}
)(FormCourse);

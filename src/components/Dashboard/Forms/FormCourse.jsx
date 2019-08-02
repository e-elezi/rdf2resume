import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import CourseModal from "./Modals/FormCourse/CourseModal";
import CourseView from "./Modals/FormCourse/CourseView";
import AddButton from "../../core/AddButton";

class FormCourse extends Component {
  state = {
    showModal: false
  };

  componentWillMount() {}

  handleClose = () => {
    this.setState({ showModal: false });
  };

  handleShow = () => {
    this.setState({ showModal: true });
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
                <CourseModal show={showModal} onHide={this.handleClose} />
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
        {this.props.course.map(co => (
          <CourseView
            courseObj={co}
            id={co.id}
            key={co.id}
          />
        ))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    course: Object.values(state.cv["my0:hasCourse"])
  };
};

export default connect(
  mapStateToProps,
  {}
)(FormCourse);

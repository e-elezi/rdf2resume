import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import EducationModal from "./Modals/FormEducation/EducationModal";
import EducationView from "./Modals/FormEducation/EducationView";
import AddButton from "../../core/AddButton";

class FormEducation extends Component {
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
            <h4 style={{ marginTop: "10px" }}>Education</h4>
          </Col>
          <Col md={4} className="side-button-wrapper">
            <Row>
              <Col md={2}>
                <AddButton
                  classnames="add-button"
                  handleClick={this.handleShow}
                />
                <EducationModal show={showModal} onHide={this.handleClose} />
              </Col>
              <Col md={10} className="button-label">
                <p>Add education</p>
              </Col>
            </Row>
          </Col>
        </Row>
        {this.props.education.length === 0
          ? "No education has been added until now."
          : ""}
        {this.props.education.map(edu => (
          <EducationView
            educationObj={edu}
            id={edu.id}
            key={edu.id}
          />
        ))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    education: Object.values(state.cv.education)
  };
};

export default connect(
  mapStateToProps,
  {}
)(FormEducation);

import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";
import { removeEducation } from "../../../../../actions";
import EducationModal from "./EducationModal";

class EducationView extends Component {
  state = {
    editMode: false
  };

  handleCloseEdit = () => {
    this.setState({ editMode: false });
  };

  handleShowEdit = () => {
    this.setState({ editMode: true });
  };

  handleUpdateClick = () => {
    this.setState({
      editMode: true
    });
  };

  render() {
    let { educationObj } = this.props;
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
              {educationObj.eduStartDate} - {educationObj.eduGradDate}
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
                {educationObj.degreeType} | {educationObj.eduMajor}
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
                <FontAwesomeIcon icon={faMapMarkerAlt} /> {` `}
                {` `}
                <a
                  href={educationObj.EducationalOrg.organizationWebsite}
                  className="inline-link"
                  target=" blank"
                >
                  {educationObj.EducationalOrg.organizationName}
                </a>{" "}
                {` `}
                {
                  educationObj.EducationalOrg.organizationAddress.city
                } {` `}{" "}
                {educationObj.EducationalOrg.organizationAddress.country}
              </b>
            </Row>
            <Row
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
                display: "flex"
              }}
            >
              {educationObj.eduDescription}
            </Row>
          </Col>
          <Col md={4}>
            <FontAwesomeIcon
              icon={faEdit}
              onClick={() => this.handleUpdateClick()}
            />
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => this.props.removeEducation(this.props.id)}
            />
          </Col>
        </Row>
        <EducationModal
          show={this.state.editMode}
          isUpdate={true}
          id={this.props.id}
          onHide={this.handleCloseEdit}
        />
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { removeEducation }
)(EducationView);

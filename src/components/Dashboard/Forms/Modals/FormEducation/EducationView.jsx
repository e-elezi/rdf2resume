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
    editMode: false,
    key: 0
  };

  handleCloseEdit = () => {
    let key = this.state.key
    this.setState({ editMode: false, key: ++key });
  };

  handleShowEdit = () => {
    let key = this.state.key
    this.setState({ editMode: true, key: ++key });
  };

  handleUpdateClick = () => {
    this.setState({
      editMode: true
    });
  };

  render() {

    let {
      "my0:eduStartDate" : eduStartDate,
      "my0:eduGradDate" : eduGradDate,
      "my0:degreeType" : degreeType,
      "my0:eduMajor" : eduMajor,
      // "my0:eduMinor" : eduMinor,
      "my0:eduDescription" : eduDescription,
      // "my0:isEduCurrent" : isEduCurrent
      "my0:studiedIn" : studiedIn
    } = this.props.educationObj;

    let {
      "my0:organizationName" : organizationName,
      "my0:organizationAddress" : organizationAddress,
      "my0:organizationWebsite" : organizationWebsite,
    } = studiedIn;

    let {
      "my0:city" : city,
      "my0:country" : country
      // "my0:street" : street,
      // "my0:postalCode" : postalCode,
    } = organizationAddress;


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
              {eduStartDate} - {eduGradDate}
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
                {degreeType.value} | {eduMajor}
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
                  href={organizationWebsite}
                  className="inline-link"
                  target=" blank"
                >
                  {organizationName}
                </a>{" "}
                {` `}
                {
                  city
                } {` `}{" "}
                {country}
              </b>
            </Row>
            <Row
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
                display: "flex"
              }}
            >
              {eduDescription}
            </Row>
          </Col>
          <Col md={4}>
            <FontAwesomeIcon
              icon={faEdit}
              onClick={() => this.handleUpdateClick()}
            />
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => this.props.removeEducation(this.props.id )}
            />
          </Col>
        </Row>
        <EducationModal
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
  { removeEducation }
)(EducationView);

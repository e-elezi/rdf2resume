import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";
import { removeCourse } from "../../../../../actions";
import CourseModal from "./CourseModal";
import { getDataOfId } from "../../../../../utilities/utilityFunctions";

class CourseView extends Component {
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
      "my0:hasCertification" : hasCertification,
      "my0:courseTitle" : courseTitle,
      "my0:courseDescription" : courseDescription,
      // "my0:courseURL" : courseURL,
      "my0:courseStartDate" : courseStartDate,
      "my0:courseFinishDate" : courseFinishDate
    } = this.props.courseObj;

    let {
      "@id": organizationID,
      "my0:organizationName" : organizationName,
      "my0:organizationAddress" : organizationAddress,
      "my0:organizationWebsite" : organizationWebsite,
    } = getDataOfId(this.props.cv, this.props.courseObj['my0:organizedBy']['@id']);

    let {
      "@id": addressId,
      "my0:city" : city,
      "my0:country" : country
      // "my0:street" : street,
      // "my0:postalCode" : postalCode,
    } = getDataOfId(this.props.cv, organizationAddress['@id']);

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
              {courseStartDate} - {courseFinishDate}
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
                {courseTitle}
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
                {city} {` `}{" "}
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
              {courseDescription}
            </Row>
            <Row
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
                display: "flex"
              }}
            >
            Is Course certified? {hasCertification}
            </Row>
          </Col>
          <Col md={4}>
            <FontAwesomeIcon
              icon={faEdit}
              onClick={() => this.handleUpdateClick()}
            />
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => this.props.removeCourse( {
                course:this.props.id,
                organization: organizationID,
                address: addressId
              } )}
            />
          </Col>
        </Row>
        <CourseModal
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

const mapstateToProps = (state, ownProps) => {
  return {
    cv: state.cv
  };
};

export default connect(
  mapstateToProps,
  { removeCourse }
)(CourseView);

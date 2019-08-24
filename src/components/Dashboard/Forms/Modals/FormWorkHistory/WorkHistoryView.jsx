import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";
import { removeWorkHistory } from "../../../../../actions";
import WorkHistoryModal from "./WorkHistoryModal";
import { getDataOfId } from "../../../../../utilities/utilityFunctions";

class WorkHistoryReview extends Component {
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
      "my0:startDate" : startDate,
      "my0:endDate" : endDate,
      "my0:jobTitle" : jobTitle,
      "my0:jobMode" : jobMode,
      // "my0:careerLevel" : careerLevel,
      "my0:jobDescription" : jobDescription,
      // "my0:isCurrent" : isCurrent
    } = this.props.workHistory;

    let {
      "@id": organizationID,
      "my0:organizationName" : organizationName,
      "my0:organizationAddress" : organizationAddress,
      "my0:organizationWebsite" : organizationWebsite,
    } = getDataOfId(this.props.cv, this.props.workHistory['my0:employedIn']['@id']);

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
              {startDate} - {endDate}
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
                {jobTitle} | {jobMode.value}
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
              {jobDescription}
            </Row>
          </Col>
          <Col md={4}>
            <FontAwesomeIcon
              icon={faEdit}
              onClick={() => this.handleUpdateClick()}
            />
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => this.props.removeWorkHistory(
                {
                  workHistory:this.props.id,
                  organization: organizationID,
                  address: addressId
                }
              )}
            />
          </Col>
        </Row>
        <WorkHistoryModal
          show={this.state.editMode}
          id={this.props.id}
          isUpdate={true}
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
  { removeWorkHistory }
)(WorkHistoryReview);

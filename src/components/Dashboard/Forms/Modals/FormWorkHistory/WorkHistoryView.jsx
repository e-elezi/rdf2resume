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

class WorkHistoryReview extends Component {
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
      "my0:organizationName" : organizationName,
      "my0:organizationAddress" : organizationAddress,
      "my0:organizationWebsite" : organizationWebsite,
      // "my0:organizationDescription" : organizationDescription,
      // "my0:organizationPhoneNumber" : organizationPhoneNumber,
      // "my0:companyIndustry" : companyIndustry,
    } = this.props.workHistory['my0:employedIn'];

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
                {organizationAddress["my0:city"]} {` `}{" "}
                {organizationAddress["my0:country"].value}
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
              onClick={() => this.props.removeWorkHistory(this.props.id)}
            />
          </Col>
        </Row>
        <WorkHistoryModal
          show={this.state.editMode}
          id={this.props.id}
          isUpdate={true}
          onHide={this.handleCloseEdit}
        />
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { removeWorkHistory }
)(WorkHistoryReview);

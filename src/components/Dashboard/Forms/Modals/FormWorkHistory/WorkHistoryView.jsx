import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";
import WorkHistoryUpdateModal from "./WorkHistoryUpdateModal";

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
    let { workHistory, handleRemove } = this.props;
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
              {workHistory.startDate} - {workHistory.endDate}
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
                {workHistory.jobTitle} | {workHistory.jobMode}
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
                  href={workHistory.Company.organizationWebsite}
                  className="inline-link"
                  target="_blank"
                >
                  {workHistory.Company.organizationName}
                </a>{" "}
                {` `}
                {workHistory.Company.organizationLocality} {` `}{" "}
                {workHistory.Company.organizationCountry}
              </b>
            </Row>
            <Row
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
                display: "flex"
              }}
            >
              {workHistory.jobDescription}
            </Row>
          </Col>
          <Col md={4}>
            <FontAwesomeIcon
              icon={faEdit}
              onClick={() => this.handleUpdateClick()}
            />
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => handleRemove(this.props.id)}
            />
          </Col>
        </Row>

        {/* <WorkHistoryUpdateModal
          show={this.state.editMode}
          id={this.props.id}
          onHide={this.handleCloseEdit}
          workHistoryObject={this.props.workHistory}
          handleUpdateWorkHistory={this.props.handleUpdateWorkHistory}
          handleStateObjectUpdate={this.props.handleStateObjectUpdate}
        /> */}
      </React.Fragment>
    );
  }
}

export default WorkHistoryReview;

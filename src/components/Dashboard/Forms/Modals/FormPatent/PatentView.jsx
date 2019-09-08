import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faBookOpen,
  faCopyright
} from "@fortawesome/free-solid-svg-icons";
import { removePatent } from "../../../../../actions";
import PatentModal from "./PatentModal";
import { getNameFromURI } from "../../../../../utilities/utilityFunctions";

class PatentView extends Component {
  state = {
    editMode: false,
    key: 0
  };

  handleCloseEdit = () => {
    let key = this.state.key;
    this.setState({ editMode: false, key: ++key });
  };

  handleShowEdit = () => {
    let key = this.state.key;
    this.setState({ editMode: true, key: ++key });
  };

  handleUpdateClick = () => {
    this.setState({
      editMode: true
    });
  };

  render() {
    let {
      "my0:patentTitle": patentTitle,
      "my0:patentOffice": patentOffice,
      "my0:patentNumber": patentNumber,
      "my0:patentInventor": patentInventor,
      "my0:patentURL": patentURL,
      "my0:patentIssuedDate": patentIssuedDate,
      "my0:patentStatus": patentStatus,
      "my0:patentDescription": patentDescription
    } = this.props.patentObj;

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
            {getNameFromURI(patentStatus)}
            <p>{patentIssuedDate}</p>
          </Col>
          <Col md={6}>
            <Row
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
                display: "flex"
              }}
            >
              <b>{patentTitle}</b> - {patentNumber}
            </Row>
            <Row
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
                display: "flex"
              }}
            >
              <b>
                <FontAwesomeIcon icon={faBookOpen} />
                {` `}
                <a href={patentURL} className="inline-link" target=" blank">
                  {patentOffice}
                </a>{" "}
              </b>
            </Row>
            <Row
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
                display: "flex"
              }}
            >
              {patentDescription}
            </Row>
            <Row
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
                display: "flex"
              }}
            >
              <FontAwesomeIcon icon={faCopyright} />
              {` `}
              {patentInventor}
            </Row>
          </Col>
          <Col md={4}>
            <FontAwesomeIcon
              icon={faEdit}
              onClick={() => this.handleUpdateClick()}
            />
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => this.props.removePatent(this.props.id)}
            />
          </Col>
        </Row>
        <PatentModal
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
  { removePatent }
)(PatentView);

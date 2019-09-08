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
import { removePublication } from "../../../../../actions";
import PublicationModal from "./PublicationModal";

class PublicationView extends Component {
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
      "my0:publiciationTitle": publiciationTitle,
      "my0:publiciationPublisher": publiciationPublisher,
      "my0:publiciationDate": publiciationDate,
      "my0:publicationAuthor": publicationAuthor,
      "my0:publicationURL": publicationURL,
      "my0:publicationDescription": publicationDescription
    } = this.props.publicationObject;

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
            <p>{publiciationDate}</p>
          </Col>
          <Col md={6}>
            <Row
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
                display: "flex"
              }}
            >
              <b>{publiciationTitle}</b>
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
                <a
                  href={publicationURL}
                  className="inline-link"
                  target=" blank"
                >
                  {publiciationPublisher}
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
              {publicationDescription}
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
              {publicationAuthor}
            </Row>
          </Col>
          <Col md={4}>
            <FontAwesomeIcon
              icon={faEdit}
              onClick={() => this.handleUpdateClick()}
            />
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => this.props.removePublication(this.props.id)}
            />
          </Col>
        </Row>
        <PublicationModal
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
  { removePublication }
)(PublicationView);
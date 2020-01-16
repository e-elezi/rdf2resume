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
import { renderPartialDate } from "../../../../../utilities/utilityFunctions";

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

  findTranslatedValue(data, lang) {
    let length = data.length;
    for (let i = 0; i < length; i++) {
      if (data[i]["@language"] === lang) {
        return data[i]["@value"];
      }
    }
  }

  render() {
    let {
      "my0:publicationTitle": publicationTitle,
      "my0:publicationPublisher": publicationPublisher,
      "my0:publicationDate": publicationDate,
      "my0:publicationAuthor": publicationAuthor,
      "my0:publicationURL": publicationURL,
      "my0:publicationDescription": publicationDescription
    } = this.props.publicationObject;

    let lang = this.props.language;

    return (
      <React.Fragment>
        <div className="card">
          <div className="card-header">
            <Col md={2} style={{ paddingLeft: '0' }}>
              <p>{renderPartialDate(publicationDate)}</p>
            </Col>
            <Col md={8}>
              <Row
                style={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  display: "flex"
                }}
              >
                <b>
                  <a
                    href={publicationURL}
                    className="inline-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {this.findTranslatedValue(publicationTitle, lang)}
                  </a>
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
                  <FontAwesomeIcon icon={faBookOpen} />
                  {` `}
                  {publicationPublisher}{" "}
                </b>
              </Row>
            </Col>
            <Col md={2} style={{ display: "flex", justifyContent: "flex-end" }}>
              <FontAwesomeIcon
                icon={faEdit}
                onClick={() => this.handleUpdateClick()}
              />
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => this.props.removePublication(this.props.id)}
              />
            </Col>
          </div>
          <div className="card-body">
            <Row>
              <Col md={2}>
              </Col>
              <Col md={8} style={{ paddingLeft: '0' }}>
                {this.findTranslatedValue(publicationDescription, lang)}
              </Col>
              <Col md={2}>
              </Col>
            </Row>
            <Row>
              <Col md={2}>
              </Col>
              <Col md={8} style={{ paddingLeft: '0' }}>
                <FontAwesomeIcon icon={faCopyright} />
                {` `}
                {publicationAuthor}              </Col>
              <Col md={2}>
              </Col>
            </Row>
          </div>
        </div>
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

const mapstateToProps = (state, ownProps) => {
  return {
    language: state.utility.language
  };
};

export default connect(
  mapstateToProps,
  { removePublication }
)(PublicationView);

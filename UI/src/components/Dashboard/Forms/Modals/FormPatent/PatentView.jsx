import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faLandmark,
  faCopyright
} from "@fortawesome/free-solid-svg-icons";
import { removePatent } from "../../../../../actions";
import PatentModal from "./PatentModal";
import { fetchAllPatentStatusess } from "../../../../../actions/utilityActions";
import { retrieveBaseProperties } from "../../../../../utilities/utilityQueries";
import { renderPartialDate } from "../../../../../utilities/utilityFunctions";

class PatentView extends Component {
  state = {
    editMode: false,
    key: 0
  };

  componentWillMount() {
    this.props.fetchAllPatentStatusess();
  }

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

  findInArray(data, name) {
    let length = data.length;
    for (let i = 0; i < length; i++) {
      let index = data[i]["@type"].indexOf(name);
      let newlength = data[i]["@type"].length;
      if (index >= 0 && index + name.length >= newlength) {
        return i;
      }
    }
  }

  renderLabel(translated, name, lang) {
    let index = this.findInArray(translated, name);
    if (
      translated[index] === undefined ||
      translated[index][lang] === undefined
    ) {
      return name;
    } else {
      return translated[index][lang];
    }
  }

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
      "my0:patentTitle": patentTitle,
      "my0:patentOffice": patentOffice,
      "my0:patentNumber": patentNumber,
      "my0:patentInventor": patentInventor,
      "my0:patentURL": patentURL,
      "my0:patentIssuedDate": patentIssuedDate,
      "my0:patentStatus": patentStatus,
      "my0:patentDescription": patentDescription
    } = this.props.patentObj;

    let lang = this.props.language;

    return (
      <React.Fragment>
        <div className="card">
          <div className="card-header">
            <Col md={2} style={{ paddingLeft: '0' }}>
              {
                patentIssuedDate !== '' ? <p style={{ marginBottom: "10px" }}>{renderPartialDate(patentIssuedDate)}</p> :
                  <p>
                    <u>{this.renderLabel(this.props.statuses, patentStatus, lang)}</u>
                  </p>
              }
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
                    href={patentURL}
                    className="inline-link"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {this.findTranslatedValue(patentTitle, lang)}
                  </a>
                </b>{" "}
                - {patentNumber}
              </Row>
              <Row
                style={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  display: "flex"
                }}
              >
                <b>
                  <FontAwesomeIcon icon={faLandmark} />
                  {` `}
                  {this.findTranslatedValue(patentOffice, lang)}{" "}
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
                onClick={() => this.props.removePatent(this.props.id)}
              />
            </Col>
          </div>
          <div className="card-body">
            <Row>
              <Col md={2}>
              </Col>
              <Col md={8} style={{ paddingLeft: '0' }}>
                {this.findTranslatedValue(patentDescription, lang)}
              </Col>
              <Col md={2}>
              </Col>
            </Row>
            <Row>
              <Col md={2}>
              </Col>
              <Col md={8} style={{ paddingLeft: '0' }}>
                <FontAwesomeIcon icon={faCopyright} />
                {` `} {patentInventor}              </Col>
              <Col md={2}>
              </Col>
            </Row>
          </div>
        </div>
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

const mapstateToProps = state => {
  return {
    language: state.utility.language,
    statuses: retrieveBaseProperties(state.utility.patents)
  };
};

export default connect(
  mapstateToProps,
  { removePatent, fetchAllPatentStatusess }
)(PatentView);

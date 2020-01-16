import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faLandmark
} from "@fortawesome/free-solid-svg-icons";
import { removeHonor } from "../../../../../actions";
import HonorModal from "./HonorModal";
import { renderPartialDate } from "../../../../../utilities/utilityFunctions";

class HonorView extends Component {
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
      "my0:honortitle": honortitle,
      "my0:honorIssuedDate": honorIssuedDate,
      "my0:honorIssuer": honorIssuer,
      "my0:honorDescription": honorDescription
    } = this.props.honorObj;

    let lang = this.props.language;

    return (
      <React.Fragment>
        <div className="card">
          <div className="card-header">
            <Col md={2} style={{ paddingLeft: '0' }}>
              <p>
                {renderPartialDate(honorIssuedDate)}
              </p>
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
                  {this.findTranslatedValue(honortitle, lang)}
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
                  <FontAwesomeIcon icon={faLandmark} /> {` `}
                  {` `}
                  {this.findTranslatedValue(honorIssuer, lang)}
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
                onClick={() => this.props.removeHonor(
                  this.props.id
                )}
              />
            </Col>
          </div>
          <div className="card-body">
            <Row>
              <Col md={2}>
              </Col>
              <Col md={8} style={{ paddingLeft: '0' }}>
                {this.findTranslatedValue(honorDescription, lang)}
              </Col>
              <Col md={2}>
              </Col>
            </Row>
          </div>
        </div>
        <HonorModal
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
  { removeHonor }
)(HonorView);
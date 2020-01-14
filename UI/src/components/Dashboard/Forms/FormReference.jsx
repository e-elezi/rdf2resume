import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";
import AddButton from "../../core/AddButton";
import ReferenceCard from "./Modals/FormReference/ReferenceCard";
import ReferenceModal from "./Modals/FormReference/ReferenceModal";
import {
  referenceAddTitle,
  referenceNoTitle,
  referenceTitle
} from "../../../translations/translations";

class FormReference extends Component {
  state = {
    showModal: false,
    key: 0
  };

  handleClose = () => {
    let key = this.state.key;
    this.setState({ showModal: false, key: ++key });
  };

  handleShow = () => {
    let key = this.state.key;
    this.setState({ showModal: true, key: ++key });
  };

  render() {
    let { showModal } = this.state;

    let lang = this.props.language;

    return (
      <React.Fragment>
        <Row>
          <Col md={8}>
            <h4 style={{ marginTop: "10px" }}>{referenceTitle[lang]}</h4>
          </Col>
          <Col md={4} className="side-button-wrapper">
            <Row>
              <Col md={2}>
                <AddButton
                  classnames="add-button"
                  handleClick={this.handleShow}
                />
              </Col>
              <Col md={10} className="button-label">
                <p>{referenceAddTitle[lang]}</p>
                <ReferenceModal
                  show={showModal}
                  onHide={this.handleClose}
                  key={this.state.key}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        {this.props.references.length === 0 ? referenceNoTitle[lang] : ""}
        <Row className="row-cards">
          {this.props.references.map((reference, index) => {
            return (
              <ReferenceCard referenceObj={reference} key={index} id={index} />
            );
          })}
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    references: state.cv["my0:hasReference"],
    language: state.utility.language
  };
};

export default connect(
  mapStateToProps,
  {}
)(FormReference);

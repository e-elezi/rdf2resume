import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";
import AddButton from "../../core/AddButton";
import ReferenceCard from "./Modals/FormReference/ReferenceCard";
import ReferenceModal from "./Modals/FormReference/ReferenceModal";

class FormReference extends Component {
  state = {
    showModal: false,
    key: 0
  };

  handleClose = () => {
    let key = this.state.key;
    this.setState({ showModal: false,
    key: ++key });
  };

  handleShow = () => {
    let key = this.state.key;
    this.setState({ showModal: true, key: ++key  });
  };

  renderNoTextPersonal = () => {
    let noText = "No references have been added until now.";
    this.props.references.map(reference => {
      if (reference["my0:referenceType"] === "Personal") {
        noText = "";
      }
      return '';
    });
    if (noText !== "") {
      return noText;
    }
  };

  renderNoTextProfessional = () => {
    let noText = "No references have been added until now.";
    this.props.references.map(reference => {
      if (reference["my0:referenceType"] === "Professional") {
        noText = "";
      }
      return '';
    });
    if (noText !== "") {
      return noText;
    }
  };

  render() {
    let { showModal } = this.state;
    return (
      <React.Fragment>
        <Row>
          <Col md={8}>
            <h4 style={{ marginTop: "10px" }}>Professional References</h4>
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
                <p>Add a reference</p>
                <ReferenceModal show={showModal} onHide={this.handleClose} key={this.state.key} />
              </Col>
            </Row>
          </Col>
        </Row>
        {this.renderNoTextProfessional()}
        <Row className="row-cards">
          {this.props.references.map((reference,index) => {
            if (reference["my0:referenceType"] === "Professional")
              return (
                <ReferenceCard
                  referenceObj={reference}
                  key={index}
                  id={index}
                />
              );
            return "";
          })}
        </Row>
        <Row style={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
          <h4 style={{ marginTop: "10px", marginLeft: "20px" }}>
            Personal References
          </h4>
        </Row>
        {this.renderNoTextPersonal()}
        <Row className="row-cards">
          {this.props.references.map((reference, index) => {
            if (reference["my0:referenceType"] === "Personal")
              return (
                <ReferenceCard
                  referenceObj={reference}
                  key={index}
                  id={index}
                />
              );
            return "";
          })}
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    references: state.cv["my0:hasReference"]
  };
};

export default connect(
  mapStateToProps,
  {}
)(FormReference);

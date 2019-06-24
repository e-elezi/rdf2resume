import React, { Component } from "react";
import { connect } from 'react-redux';
import { Row, Col } from "react-bootstrap";
import AddButton from "../../core/AddButton";
import ReferenceCard from "./Modals/FormReference/ReferenceCard";
import ReferenceModal from "./Modals/FormReference/ReferenceModal";

class FormReference extends Component {
  state = {
    label: "references",
    references: [
      {
        type: "Professional",
        title: "Dr.",
        name: "Enkeleda Elezi",
        jobTitle: "Student",
        Organization: {
          name: "Fraunhofer"
        },
        Address: {
          street: "Hirschberger Str",
          postalCode: "53119",
          city: "Bonn",
          country: "Germany"
        },
        hasTelephoneNumber: ["+49 1522 7589766"],
        email: "enkeleda.elezi@gmail.com"
      },
      {
        type: "Personal",
        title: "Dr.",
        name: "Enkeleda Elezi",
        jobTitle: "Student",
        Organization: {
          name: "Fraunhofer"
        },
        Address: {
          street: "Hirschberger Str",
          postalCode: "53119",
          city: "Bonn",
          country: "Germany"
        },
        hasTelephoneNumber: ["+49 1522 7589766"],
        email: "enkeleda.elezi@gmail.com"
      },
      {
        type: "Professional",
        title: "Dr.",
        name: "Enkeleda Elezi",
        jobTitle: "Student",
        Organization: {
          name: "Fraunhofer"
        },
        Address: {
          street: "Hirschberger Str",
          postalCode: "53119",
          city: "Bonn",
          country: "Germany"
        },
        hasTelephoneNumber: ["+49 1522 7589766"],
        email: "enkeleda.elezi@gmail.com"
      }
    ],
    showModal: false
  };

  handleClose = () => {
    this.setState({ showModal: false });
  };

  handleShow = () => {
    this.setState({ showModal: true });
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
                <ReferenceModal
                  show={showModal}
                  onHide={this.handleClose}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="row-cards">
          {this.props.references.map((reference) => {
            if (reference.type === "Professional")
              return (
                <ReferenceCard
                  referenceObj={reference}
                  key={reference.id}
                  id={reference.id}
                />
              );
              return '';
          })}
        </Row>
        <Row style={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
          <h4 style={{ marginTop: "10px", marginLeft: '20px' }}>Personal References</h4>
        </Row>
        <Row className="row-cards">
          {this.props.references.map((reference) => {
            if (reference.type === "Personal")
              return (
                <ReferenceCard
                 referenceObj={reference}
                  key={reference.id}
                  id={reference.id}
                />
              );
              return '';
          })}
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    references: Object.values(state.cv.references)
  };
};

export default connect(mapStateToProps, {})(FormReference);

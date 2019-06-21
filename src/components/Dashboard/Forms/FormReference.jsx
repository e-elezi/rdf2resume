import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import AddButton from "../../core/AddButton";
import ReferenceCard from "./Modals/FormReference/ReferenceCard";
import ReferenceModal from "./Modals/FormReference/ReferenceModal";
// import ReferenceUpdateModal from "./Modals/FormReference/ReferenceUpdateModal";

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

  handleRemoveReferenceCard = idx => {
    let references = [...this.state.references];
    references = references.filter((s, sidx) => idx !== sidx);
    this.setState({
      references
    });
  };

  handleSaveReferenceCard = reference => {
    let references = [...this.state.references];
    references.push(reference);
    this.setState({
      references
    });
  };

  handleUpdateReferenceCard = (reference, idx) => {
    let references = [...this.state.references];
    references[idx] = reference;
    this.setState({ references: references });
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
                  handleSaveReference={this.handleSaveReferenceCard}
                  handleStateObjectUpdate={this.handleStateObjectUpdate}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="row-cards">
          {this.state.references.map((reference, idx) => {
            if (reference.type === "Professional")
              return (
                <ReferenceCard
                  referenceObj={reference}
                  key={idx}
                  handleRemove={this.handleRemoveReferenceCard}
                  handleUpdateReferenceCard={this.handleUpdateReferenceCard}
                  handleStateObjectUpdate={this.handleStateObjectUpdate}
                  id={idx}
                />
              );
              return '';
          })}
        </Row>
        <Row style={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
          <h4 style={{ marginTop: "10px", marginLeft: '20px' }}>Personal References</h4>
        </Row>
        <Row className="row-cards">
          {this.state.references.map((reference, idx) => {
            if (reference.type === "Personal")
              return (
                <ReferenceCard
                  referenceObj={reference}
                  key={idx}
                  handleRemove={this.handleRemoveReferenceCard}
                  handleUpdateReferenceCard={this.handleUpdateReferenceCard}
                  handleStateObjectUpdate={this.handleStateObjectUpdate}
                  id={idx}
                />
              );
              return '';
          })}
        </Row>
      </React.Fragment>
    );
  }
}

export default FormReference;

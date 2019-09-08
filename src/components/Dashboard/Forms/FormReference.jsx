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

  render() {
    let { showModal } = this.state;

    let lang = this.props.language;

    let titlePage = {
      en: "Reference",
      fr: "Référence",
      de: "Referenz",
      it: "Riferimento"
    };

    let titlesub = {
      en: "Add reference",
      fr: "Ajouter une référence",
      de: "Referenz hinzufügen",
      it: "Aggiungi riferimento",
    }

    let noedu = {
      en: "No references have been added until now.",
      fr: "Aucune référence n'a été ajoutée jusqu'à présent.",
      de: "Es wurden bisher keine Referenzen hinzugefügt.",
      it: "Finora non sono stati aggiunti riferimenti.",
    }

    return (
      <React.Fragment>
        <Row>
          <Col md={8}>
            <h4 style={{ marginTop: "10px" }}>{titlePage[lang]}</h4>
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
                <p>{titlesub[lang]}</p>
                <ReferenceModal show={showModal} onHide={this.handleClose} key={this.state.key} />
              </Col>
            </Row>
          </Col>
        </Row>
        {this.props.references.length === 0
          ? noedu[lang]
          : ""}
        <Row className="row-cards">
          {this.props.references.map((reference,index) => {
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
    references: state.cv["my0:hasReference"],
    language: state.utility.language
  };
};

export default connect(
  mapStateToProps,
  {}
)(FormReference);

import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import PatentModal from "./Modals/FormPatent/PatentModal";
import PatentView from "./Modals/FormPatent/PatentView";
import AddButton from "../../core/AddButton";

class FormPatent extends Component {
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

    let titlePage = {
      en: "Patent",
      fr: "Brevet",
      de: "Patent",
      it: "Brevetto"
    };

    let titlesub = {
      en: "Add patent",
      fr: "Ajouter un brevet",
      de: "Patent hinzufügen",
      it: "Aggiungere un brevetto"
    };

    let nocourse = {
      en: "No patents have been added until now.",
      fr: "Aucun brevet n'a été ajouté jusqu'à présent.",
      de: "Bislang wurden keine Patente hinzugefügt.",
      it: "Finora non sono stati aggiunti brevetti."
    };

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
                <PatentModal
                  show={showModal}
                  onHide={this.handleClose}
                  key={this.state.key}
                />
              </Col>
              <Col md={10} className="button-label">
                <p>{titlesub[lang]}</p>
              </Col>
            </Row>
          </Col>
        </Row>
        {this.props.patents.length === 0 ? nocourse[lang] : ""}
        {this.props.patents.map((co, index) => (
          <PatentView patentObj={co} id={index} key={index} />
        ))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    patents: state.cv["my0:hasPatent"],
    language: state.utility.language
  };
};

export default connect(
  mapStateToProps,
  {}
)(FormPatent);

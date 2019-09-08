import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import PublicationModal from "./Modals/FormPublication/PublicationModal";
import PublicationView from "./Modals/FormPublication/PublicationView";
import AddButton from "../../core/AddButton";

class FormPublication extends Component {
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
      en: "Publication",
      fr: "Publication",
      de: "Veröffentlichung",
      it: "Pubblicazione"
    };

    let titlesub = {
      en: "Add publication",
      fr: "Ajouter une publication",
      de: "Publikation hinzufügen",
      it: "Aggiungi pubblicazione",
    }

    let nocourse = {
      en: "No publication have been added until now.",
      fr: "Aucune publication n'a été ajoutée jusqu'à présent.",
      de: "Bislang wurden keine Publikationen hinzugefügt.",
      it: "Finora non è stata aggiunta alcuna pubblicazione.",
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
                <PublicationModal show={showModal} onHide={this.handleClose} key={this.state.key} />
              </Col>
              <Col md={10} className="button-label">
                <p>{titlesub[lang]}</p>
              </Col>
            </Row>
          </Col>
        </Row>
        {this.props.publications.length === 0
          ? nocourse[lang]
          : ""}
        {this.props.publications.map((pu, index) => (
          <PublicationView
            publicationObject={pu}
            id={index}
            key={index}
          />
        ))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    publications: state.cv["my0:hasPublication"],
    language: state.utility.language
  };
};

export default connect(
  mapStateToProps,
  {}
)(FormPublication);

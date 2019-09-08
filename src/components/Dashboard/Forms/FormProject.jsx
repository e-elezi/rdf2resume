import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import ProjectModal from "./Modals/FormProject/ProjectModal";
import ProjectView from "./Modals/FormProject/ProjectView";
import AddButton from "../../core/AddButton";

class FormCourse extends Component {
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
      en: "Project",
      fr: "Le projet",
      de: "Projekt",
      it: "Il progetto"
    };

    let titlesub = {
      en: "Add project",
      fr: "Ajouter un projet",
      de: "Projekt hinzufügen",
      it: "Aggiungi progetto",
    }

    let nocourse = {
      en: "No projects have been added until now.",
      fr: "Aucun projet n'a été ajouté jusqu'à présent.",
      de: "Bislang wurden keine Projekte hinzugefügt.",
      it: "Finora non è stato aggiunto alcun progetto.",
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
                <ProjectModal show={showModal} onHide={this.handleClose} key={this.state.key} />
              </Col>
              <Col md={10} className="button-label">
                <p>{titlesub[lang]}</p>
              </Col>
            </Row>
          </Col>
        </Row>
        {this.props.projects.length === 0
          ? nocourse[lang]
          : ""}
        {this.props.projects.map((co, index) => (
          <ProjectView
            projectObj={co}
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
    projects: state.cv["my0:hasProject"],
    language: state.utility.language
  };
};

export default connect(
  mapStateToProps,
  {}
)(FormCourse);

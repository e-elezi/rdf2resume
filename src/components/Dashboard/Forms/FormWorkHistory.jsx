import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import WorkHistoryModal from "./Modals/FormWorkHistory/WorkHistoryModal";
import WorkHistoryView from "./Modals/FormWorkHistory/WorkHistoryView";
import AddButton from "../../core/AddButton";

class FormWorkHistory extends Component {
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
      en: "Work History",
      fr: "Antécédents de travail",
      de: "Arbeitsablauf",
      it: "Storia del lavoro"
    };

    let titlesub = {
      en: "Add work history",
      fr: "Ajouter un historique de travail",
      de: "Arbeitsablauf hinzufügen",
      it: "Aggiungere la cronologia dei lavori",
    }

    let nowwork = {
      en: "No work histories have been added until now.",
      fr: "Aucun historique de travail n'a été ajouté jusqu'à présent.",
      de: "Bisher wurden keine Arbeitshistorien hinzugefügt.",
      it: "Finora non sono state aggiunte storie di lavoro.",
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
                <WorkHistoryModal key={this.state.key} show={showModal} onHide={this.handleClose} />
              </Col>
              <Col md={10} className="button-label">
                <p>{titlesub[lang]}</p>
              </Col>
            </Row>
          </Col>
        </Row>
        {this.props.workHistories.length === 0
          ? nowwork[lang]
          : ""}
        {this.props.workHistories.map((workHistory, index) => (
          <WorkHistoryView
            workHistory={workHistory}
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
    workHistories: state.cv["my0:hasWorkHistory"],
    language: state.utility.language
  };
};

export default connect(
  mapStateToProps,
  {}
)(FormWorkHistory);

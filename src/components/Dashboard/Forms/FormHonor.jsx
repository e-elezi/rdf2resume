import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import HonorModal from "./Modals/FormHonor/HonorModal";
import HonorView from "./Modals/FormHonor/HonorView";
import AddButton from "../../core/AddButton";

class FormHonor extends Component {
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
      en: "Honor & Award",
      fr: "Prix et distinctions",
      de: "Ehrungen & Auszeichnungen",
      it: "Premi e riconoscimenti"
    };

    let titlesub = {
      en: "Add honor/award",
      fr: "Ajouter distinctions/prix",
      de: "Ehre/Award hinzufügen",
      it: "Aggiungi premi/riconoscimento",
    }

    let nocourse = {
      en: "No honors or awards have been added until now.",
      fr: "Aucun prix ou distinction n'a été ajouté jusqu'à présent.",
      de: "Bis jetzt wurden keine Ehrungen oder Auszeichnungen hinzugefügt.",
      it: "Non sono stati aggiunti riconoscimenti o premi fino ad ora.",
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
                <HonorModal show={showModal} onHide={this.handleClose} key={this.state.key} />
              </Col>
              <Col md={10} className="button-label">
                <p>{titlesub[lang]}</p>
              </Col>
            </Row>
          </Col>
        </Row>
        {this.props.honors.length === 0
          ? nocourse[lang]
          : ""}
        {this.props.honors.map((co, index) => (
          <HonorView
            honorObj={co}
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
    honors: state.cv["my0:hasHonorAward"],
    language: state.utility.language
  };
};

export default connect(
  mapStateToProps,
  {}
)(FormHonor);

import React, { Component } from "react";
import { connect } from 'react-redux';
import { Row, Col } from "react-bootstrap";
import AddButton from "../../core/AddButton";
import OtherInfoView from "./Modals/FormOtherInfo/OtherInfoView";
import OtherInfoModal from "./Modals/FormOtherInfo/OtherInfoModal";

class FormOtherInfo extends Component {
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
      en: "Other Information",
      fr: "Autres informations",
      de: "Sonstige Informationen",
      it: "Altre informazioni"
    };

    let titlesub = {
      en: "Add other information",
      fr: "Ajouter d'autres informations",
      de: "Weitere Informationen hinzufügen",
      it: "Aggiungi altre informazioni",
    }

    let noedu = {
      en: "No other infos have been added until now.",
      fr: "Aucune autre information n'a été ajoutée jusqu'à présent.",
      de: "Es wurden bisher keine weiteren Infos hinzugefügt.",
      it: "Non sono state aggiunte altre informazioni fino ad ora.",
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
                <OtherInfoModal
                  key={this.state.key}
                  show={showModal}
                  onHide={this.handleClose}
                />
              </Col>
              <Col md={10} className="button-label">
                <p>{titlesub[lang]}</p>
              </Col>
            </Row>
          </Col>
        </Row>
        {this.props.otherInfos.length === 0
          ? noedu[lang]
          : ""}
        {this.props.otherInfos.map((otherinfo, index) => (
          <OtherInfoView
            otherInfoObject={otherinfo}
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
    otherInfos: state.cv["my0:hasOtherInfo"],
    language: state.utility.language
  };
};

export default connect(mapStateToProps, {})(FormOtherInfo);

import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { Carousel } from "react-responsive-carousel";
import { Combobox } from "react-widgets";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ListItem, languages } from "../../../../core/LanguageToggle";
import { submitModalTitle, submitModalConvert } from '../../../../../translations/translations';

class SubmitModal extends Component {
  state = {
    design: 0,
    language: 'en'
  };

  componentWillMount() { }

  handleSave = e => {
    e.preventDefault();
  };

  handleSliderClick = e => {
    this.setState({
      design: e
    });
  };

  handleConverting = () => {
    this.props.showPdf(this.state.design, this.state.language);
  };

  handleLanguageChange = (value) => {
    this.setState({
      language: value
    })
  }

  render() {

    let lang = this.props.language;

    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        dialogClassName="submit-modal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {submitModalTitle[lang]}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel onChange={this.handleSliderClick}>
            <div>
              <img
                id="Design1"
                alt="Design1"
                onClick={this.handleSliderClick}
                style={{ height: "450px", width: "300px" }}
                src={require("../../../../../images/Design1.png")}
              />
            </div>
            <div>
              <img
                id="Design2"
                alt="Design2"
                onClick={this.handleSliderClick}
                style={{ height: "450px", width: "300px" }}
                src={require("../../../../../images/Design2.png")}
              />
            </div>
          </Carousel>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "center" }}>
          <Combobox
            onChange={this.handleLanguageChange}
            defaultValue={"en"}
            containerClassName="languagebox submit-window"
            data={languages}
            itemComponent={ListItem}
          />{" "}
          <Button variant="primary" onClick={this.handleConverting}>
            {submitModalConvert[lang]}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapstateToProps = state => {
  return {
    language: state.utility.language
  };
};

export default connect(
  mapstateToProps,
  {}
)(SubmitModal);

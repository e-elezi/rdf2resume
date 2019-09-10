import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { Carousel } from "react-responsive-carousel";
import { Combobox } from "react-widgets";
import de from "../../../../../images/de.png";
import fr from "../../../../../images/fr.png";
import it from "../../../../../images/it.png";
import en from "../../../../../images/en.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";

class SubmitModal extends Component {
  state = {
    design: 0,
    language: 'en'
  };

  componentWillMount() {}

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
    let ListItem = ({ item }) => (
      <React.Fragment>
        <span>
          {item === "de" ? (
            <img src={de} width="20px" height="20px" alt={item}></img>
          ) : (
            ""
          )}
          {item === "fr" ? (
            <img src={fr} width="20px" height="20px" alt={item}></img>
          ) : (
            ""
          )}
          {item === "it" ? (
            <img src={it} width="20px" height="20px" alt={item}></img>
          ) : (
            ""
          )}
          {item === "en" ? (
            <img src={en} width="20px" height="20px" alt={item}></img>
          ) : (
            ""
          )}{" "}
          <span style={{ textTransform: "uppercase" }}>{item}</span>
        </span>
      </React.Fragment>
    );

    let languages = ["de", "en", "it", "fr"];

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
            Choose your preferred design and download
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
            <div>
              <img
                id="Design3"
                alt="Design3"
                onClick={this.handleSliderClick}
                style={{ height: "450px", width: "300px" }}
                src={require("../../../../../images/Design3.png")}
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
            Convert
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect(
  null,
  {}
)(SubmitModal);

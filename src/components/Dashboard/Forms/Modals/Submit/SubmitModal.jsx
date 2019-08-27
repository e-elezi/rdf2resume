import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Row, Col, Button } from "react-bootstrap";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

class SubmitModal extends Component {
  state = {
      design: 0
  };

  componentWillMount() {}

  handleSave = e => {
    e.preventDefault();
  };

  handleSliderClick = e => {
      this.setState({
          design: e
      })
  }

  handleConverting = () => {
    this.props.showPdf('kot');
  }

  render() {
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
                     onClick={this.handleSliderClick}
                     style={{height: '450px', width: '300px'}} 
                     src={require('../../../../../images/Design1.png')} />
                </div>
                <div>
                    <img
                    id="Design2"
                    onClick={this.handleSliderClick} 
                    style={{height: '450px', width: '300px'}} 
                    src={require('../../../../../images/Design2.png')} />
                </div>
                <div>
                    <img
                    id="Design3"
                    onClick={this.handleSliderClick} 
                    style={{height: '450px', width: '300px'}} 
                    src={require('../../../../../images/Design3.png')} />
                </div>
            </Carousel>
        </Modal.Body>
        <Modal.Footer style={{justifyContent: 'center'}}>
          <Button variant="primary" onClick={this.handleConverting}>Convert</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect(
  null,
  {}
)(SubmitModal);

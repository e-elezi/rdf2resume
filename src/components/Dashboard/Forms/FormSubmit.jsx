import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import CustomButton from "../../core/CustomButton";
import SubmitModal from "./Modals/Submit/SubmitModal";
import { toggleSpinner } from "../../../actions/utilityActions";
import { processDataBeforeSubmit } from "../../../utilities/utilityFunctions";
import Spinner from "../../../components/core/Spinner";
import { connect } from "react-redux";

class FormSubmit extends Component {
  state = {
    showModal: false,
    key: 0,
    showPDF: false
  };

  handleClose = () => {
    let key = this.state.key;
    this.setState({ showModal: false, key: ++key });
  };

  handleShow = () => {
    let key = this.state.key;
    this.setState({ showModal: true, key: ++key });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    this.props.toggleSpinner(true);
    setTimeout(
      function() {
        processDataBeforeSubmit(this.props.cvData);
        this.props.toggleSpinner(false);
      }.bind(this),
      3000
    );
  };

  handlePDFgeneration = e => {
    e.preventDefault();
    this.handleShow();
  };

  handlePDFgenerationWithInterlinking = e => {
    e.preventDefault();
    alert("Will handle PDF generation with Interlinking");
  };

  handleShowPDF = filename =>
  {
    console.log(filename);
    this.setState({
      showModal: false,
      showPDF: true
    })
  }

  render() {
    let showModal = this.state.showModal;
    return (
      <React.Fragment>
        <Row style={{alignItems: 'flex-start'}}>
          <Col md={4}>
            <h4 style={{ marginTop: "10px" }}>Submit the form</h4>
            <Row style={{justifyContent: 'left', marginLeft: 0}}>
              <CustomButton
                label="Download as RDF"
                classnames="final-submit"
                handleClick={this.handleFormSubmit}
              />
            </Row>
            <Row style={{justifyContent: 'left', marginLeft: 0}}>
              <CustomButton
                label="Generate Resume PDF"
                classnames="final-submit"
                handleClick={this.handleShow}
              />
            </Row>
            <SubmitModal showPdf={this.handleShowPDF} show={showModal} key={this.state.key} onHide={this.handleClose} />
            <Row style={{justifyContent: 'left', marginLeft: 0}}>
              <CustomButton
                label="Generate Resume PDF (with interlinking)"
                classnames="final-submit"
                handleClick={this.handlePDFgenerationWithInterlinking}
              />
            </Row>
          </Col>
          <Col md={8}>
            {
              this.state.showPDF ? <embed style={{border: '3px solid #4bb3cc', borderRadius: '5px'}} src={require('../../../myfile.pdf')} width="800px" height="900px" /> : ''
            }
          </Col>
        </Row>
        <Row
          style={{
            justifyContent: "left",
            marginTop: "10px",
            marginLeft: "5px"
          }}
        >
          <Spinner show={this.props.showSpinner} />
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    cvData: state.cv,
    showSpinner: state.utility.showSpinner
  };
};

export default connect(
  mapStateToProps,
  {
    toggleSpinner
  }
)(FormSubmit);

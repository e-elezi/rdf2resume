import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import CustomButton from "../../core/CustomButton";
import SubmitModal from "./Modals/Submit/SubmitModal";
import { toggleSpinner, updateError } from "../../../actions/utilityActions";
import Spinner from "../../../components/core/Spinner";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import { trackPromise } from "react-promise-tracker";
import {
  warningLabel,
  warningText,
  submitTitle,
  submitFirstButtonLabel,
  submitSecondButtonLabel,
  submitThirdButtonLabel,
  submitFourthButtonLabel,
  submitFifthButtonLabel
} from "../../../translations/translations";

class FormSubmit extends Component {
  constructor(props) {
    super(props);
    // Create the ref
    this.anchorHiddenRef = React.createRef();
    this.anchorTwoHiddenRef = React.createRef();
    this.state = {
      showModal: false,
      showModalEnriched: false,
      key: 0,
      showPDF: false,
      pdfPath: "",
      jsonPath: "",
      zipPath: ""
    };
  }

  handleClose = () => {
    let key = this.state.key;
    this.setState({ showModal: false, key: ++key });
  };

  handleShow = () => {
    let key = this.state.key;
    this.setState({ showModal: true, key: ++key });
  };

  handleCloseEnriched = () => {
    let key = this.state.key;
    this.setState({ showModalEnriched: false, key: ++key });
  };

  handleShowEnriched = () => {
    let key = this.state.key;
    this.setState({ showModalEnriched: true, key: ++key });
  };

  checkError = data => {
    let error = false;
    if (data["my0:aboutPerson"]["my0:firstName"] === "") {
      this.props.updateError({
        object: "my0:firstName",
        value: true
      });
      error = true;
    }
    if (data["my0:aboutPerson"]["my0:lastName"] === "") {
      this.props.updateError({
        object: "my0:lastName",
        value: true
      });
      error = true;
    }
    if (data["my0:aboutPerson"]["my0:email"] === "") {
      this.props.updateError({
        object: "my0:email",
        value: true
      });
      error = true;
    }
    return error;
  };

  handleFormSubmit = async (e) => {
    e.preventDefault();
    if (this.checkError(this.props.cvData)) {
      let lang = this.props.language;
      Swal.fire({
        title: warningLabel[lang],
        text: warningText[lang],
        type: "warning",
        confirmButtonColor: "#4bb3cc",
        heightAuto: false,
        confirmButtonText: "Okay"
      });
    } else {
      console.log(this.props.cvData);
      axios
        .post("/submit_form", this.props.cvData)
        .then(resp => {
          this.setState({
            jsonPath: "../../static/" + resp.data
          });
          this.anchorHiddenRef.click();
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  handlePDFgeneration = e => {
    e.preventDefault();
    this.handleShow();
  };

  handleShowPDF = async (designNumber, language) => {
    if (this.checkError(this.props.cvData)) {
      let lang = this.props.language;
      Swal.fire({
        title: warningLabel[lang],
        text: warningText[lang],
        type: "warning",
        confirmButtonColor: "#4bb3cc",
        heightAuto: false,
        confirmButtonText: "Okay"
      });
    } else {
      this.setState({
        pdfPath: ""
      });
      this.setState({
        showPDF: false
      });
      this.handleClose();
      trackPromise(
        axios
          .post("/generate_pdf", {
            data: {
              cv: this.props.cvData,
              designNumber: designNumber,
              language: language
            }
          })
          .then(resp => {
            this.setState({
              pdfPath: "../../" + resp.data
            });
            this.setState({
              showPDF: true
            });
          })
          .catch(error => {
            console.log(error);
          })
      );
    }
  };

  handleShowPDFEnriched = async (designNumber, language) => {
    if (this.checkError(this.props.cvData)) {
      let lang = this.props.language;
      Swal.fire({
        title: warningLabel[lang],
        text: warningText[lang],
        type: "warning",
        confirmButtonColor: "#4bb3cc",
        heightAuto: false,
        confirmButtonText: "Okay"
      });
    } else {
      this.setState({
        pdfPath: ""
      });
      this.setState({
        showPDF: false
      });
      this.handleCloseEnriched();
      trackPromise(
        axios
          .post("/generate_pdf_enriched", {
            data: {
              cv: this.props.cvData,
              designNumber: designNumber,
              language: language
            }
          })
          .then(resp => {
            this.setState({
              pdfPath: "../../" + resp.data
            });
            this.setState({
              showPDF: true
            });
          })
          .catch(error => {
            console.log(error);
          })
      );
    }
  };

  generateHTML = async (language) => {
    if (this.checkError(this.props.cvData)) {
      let lang = this.props.language;
      Swal.fire({
        title: warningLabel[lang],
        text: warningText[lang],
        type: "warning",
        confirmButtonColor: "#4bb3cc",
        heightAuto: false,
        confirmButtonText: "Okay"
      });
    } else {
      trackPromise(
        axios
          .post("/generate_html", {
            data: {
              cv: this.props.cvData,
              language: language
            }
          })
          .then(resp => {
            this.setState({
              zipPath: '../../static/' + resp.data
            });
            this.anchorTwoHiddenRef.click();
          })
          .catch(error => {
            console.log(error);
          })
      );
    }
  };

  renderPDF = () => {
    if (this.state.showPDF) {
      return (
        <embed
          style={{ border: "3px solid #4bb3cc", borderRadius: "5px" }}
          src={this.state.pdfPath + ".pdf"}
          width="800px"
          height="900px"
        />
      );
    } else {
      return "";
    }
  };

  render() {
    let showModal = this.state.showModal;

    let lang = this.props.language;

    return (
      <React.Fragment>
        <Row style={{ alignItems: "flex-start" }}>
          <Col md={4}>
            <h4 style={{ marginTop: "10px" }}>{submitTitle[lang]}</h4>
            <Row style={{ justifyContent: "left", marginLeft: 0 }}>
              <CustomButton
                label={submitFirstButtonLabel[lang]}
                classnames="final-submit"
                handleClick={this.handleFormSubmit}
              />
              <a
                ref={anchorHiddenRef =>
                  (this.anchorHiddenRef = anchorHiddenRef)
                }
                href={this.state.jsonPath}
                target="_blank"
                rel="noopener noreferrer"
                download
                hidden
              >
                {" "}
              </a>
            </Row>
            <Row style={{ justifyContent: "left", marginLeft: 0 }}>
              <CustomButton
                label={submitFifthButtonLabel[lang]}
                classnames="final-submit"
                handleClick={() => this.generateHTML(lang)}
              />
              <a
                ref={anchorTwoHiddenRef =>
                  (this.anchorTwoHiddenRef = anchorTwoHiddenRef)
                }
                href={this.state.zipPath}
                target="_blank"
                rel="noopener noreferrer"
                download
                hidden
              >
                {" "}
              </a>
            </Row>
            <Row style={{ justifyContent: "left", marginLeft: 0 }}>
              <CustomButton
                label={submitSecondButtonLabel[lang]}
                classnames="final-submit"
                handleClick={this.handleShow}
              />
            </Row>
            <SubmitModal
              showPdf={this.handleShowPDF}
              show={showModal}
              key={this.state.key}
              onHide={this.handleClose}
            />
            <Row style={{ justifyContent: "left", marginLeft: 0 }}>
              <CustomButton
                label={submitThirdButtonLabel[lang]}
                classnames="final-submit"
                handleClick={this.handleShowEnriched}
              />
              <SubmitModal
                showPdf={this.handleShowPDFEnriched}
                show={this.state.showModalEnriched}
                key={this.state.key}
                onHide={this.handleCloseEnriched}
              />
            </Row>
            <Row style={{ justifyContent: "left", marginLeft: 0 }}>
              {this.state.showPDF ? (
                <a
                  className="final-submit btn btn-primary"
                  style={{ marginTop: "150px" }}
                  href={this.state.pdfPath + ".tex"}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  {submitFourthButtonLabel[lang]}
                </a>
              ) : (
                  ""
                )}
            </Row>
          </Col>
          <Col md={8}>{this.renderPDF()}</Col>
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
    language: state.utility.language,
    showSpinner: state.utility.showSpinner,
    error: state.utility.error
  };
};

export default connect(
  mapStateToProps,
  {
    toggleSpinner,
    updateError
  }
)(FormSubmit);

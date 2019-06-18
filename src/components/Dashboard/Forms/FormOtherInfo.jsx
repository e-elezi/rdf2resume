import React, { Component } from "react";
import CustomInput from "../../core/CustomInput";
import { Form, Row, Col } from "react-bootstrap";
import AddButton from "../../core/AddButton";
import OtherInfoView from "./Modals/FormOtherInfo/OtherInfoView";
import OtherInfoModal from "./Modals/FormOtherInfo/OtherInfoModal";

class FormOtherInfo extends Component {
  state = {
    label: "otherInfos",
    otherInfos: [
      {
        otherInfoCategory: "Publication",
        otherInfoDescription:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum"
      }
    ],
    showModal: false
  };

  handleClose = () => {
    this.setState({ showModal: false });
  };

  handleShow = () => {
    this.setState({ showModal: true });
  };

  handleRemoveOtherInfo = idx => {
    let otherInfos = [...this.state.otherInfos];
    otherInfos = otherInfos.filter((s, sidx) => idx !== sidx);
    this.setState({
      otherInfos
    });
  };

  handleSaveOtherInfo = otherInfo => {
    let otherInfos = [...this.state.otherInfos];
    otherInfos.push(otherInfo);
    this.setState({
      otherInfos
    });
  };

  handleUpdateOtherInfo = (otherInfo, idx) => {
    let otherInfos = [...this.state.otherInfos];
    otherInfos[idx] = otherInfo;
    this.setState({ otherInfos });
  };

  render() {
    let { showModal } = this.state;
    return (
      <React.Fragment>
        <Row>
          <Col md={8}>
            <h4 style={{ marginTop: "10px" }}>Other Information</h4>
          </Col>
          <Col md={4} className="side-button-wrapper">
            <Row>
              <Col md={2}>
                <AddButton
                  classnames="add-button"
                  handleClick={this.handleShow}
                />
                <OtherInfoModal
                  show={showModal}
                  onHide={this.handleClose}
                  handleSaveOtherInfo={this.handleSaveOtherInfo}
                  handleStateObjectUpdate={this.handleStateObjectUpdate}
                />
              </Col>
              <Col md={10} className="button-label">
                <p>Add other information</p>
              </Col>
            </Row>
          </Col>
        </Row>
        {this.state.otherInfos.map((otherinfo, idx) => (
          <OtherInfoView
            otherInfoObject={otherinfo}
            id={idx}
            handleRemove={this.handleRemoveOtherInfo}
            key={idx}
            handleUpdateOtherInfo={this.handleUpdateOtherInfo}
            handleStateObjectUpdate={this.handleStateObjectUpdate}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default FormOtherInfo;

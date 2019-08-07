import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Row, Col, Button } from "react-bootstrap";
import { Combobox } from "react-widgets";
import CustomTextarea from "../../../../core/CustomTextarea";
import { createOtherInfo, updateOtherInfo } from "../../../../../actions";
import { fetchOtherCVInfoTypes } from "../../../../../actions/utilityActions";
import { retrieveOtherTypes } from "../../../../../utilities/utilityQueries";

class OtherInfoModal extends Component {
  state = {
    otherInfo: {
      "@type": "my0:OtherInfo",
      "my0:otherInfoType": "",
      "my0:otherInfoDescription": ""
    }
  };

  componentWillMount() {
    this.props.fetchOtherCVInfoTypes();
    this.setInitialValues();
  }

  setInitialValues = () => {
    if (this.props.id !== null && this.props.isUpdate === true) {
      let inputRef = this.props.otherInfoObject;
      let otherInfo = { ...this.state.otherInfo };
      otherInfo["my0:otherInfoType"] = inputRef["my0:otherInfoType"];
      otherInfo["my0:otherInfoDescription"] = inputRef["my0:otherInfoDescription"];
      otherInfo.id = inputRef.id;
      this.setState({
        otherInfo
      });
    }
  };

  clearForm = () => {
    const hist = {
      "my0:otherInfoType": "",
      "my0:otherInfoDescription": ""
    };
    if (!this.props.isUpdate) {
      this.setState({
        otherInfo: hist
      });
    } else {
      this.setInitialValues();
    }
  };

  handleSelectChange = (value, id) => {
    let otherInfo = { ...this.state.otherInfo };
    otherInfo[id] = value;
    this.setState({ otherInfo });
  };

  handleInputChange = e => {
    let label = e.target.id;
    let otherInfo = { ...this.state.otherInfo };
    otherInfo[label] = e.target.value;
    this.setState({
      otherInfo
    });
  };

  handleSave = e => {
    e.preventDefault();
    this.props.createOtherInfo(
      this.state.otherInfo
    );
  };

  handleUpdate = e => {
    e.preventDefault();
    this.props.updateOtherInfo({ other:this.state.otherInfo, i:this.props.id});
  };

  handleRenderingSubmitButton = () => {
    if (!this.props.isUpdate) {
      return (
        <Button type="submit" variant="primary" onClick={this.handleSave}>
          Save
        </Button>
      );
    } else {
      return (
        <Button type="submit" variant="primary" onClick={this.handleUpdate}>
          Update
        </Button>
      );
    }
  };

  render() {
    let { "my0:otherInfoDescription" : otherInfoDescription,   "my0:otherInfoType" : otherInfoCategory } = this.state.otherInfo;
    let { onHide } = this.props;
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        className="reference-modal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <Row>
              <Col md={4}>
                {this.props.isUpdate ? "Update" : "Add New"} Other Information
              </Col>
              <Col md={8} />
            </Row>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row
            style={{
              width: "100%",
              justifyContent: "left",
              marginLeft: "0px",
              marginBottom: "8px"
            }}
          >
            <label className="label-rw">Category</label>
            <Combobox
              name="otherInfoCategory"
              placeholder="Select category"
              data={this.props.others}
              textField="value"
              valueField="@type"
              value={otherInfoCategory}
              caseSensitive={false}
              minLength={3}
              filter="contains"
              onChange={value =>
                this.handleSelectChange(value, "my0:otherInfoType")
              }
            />
          </Row>
          <div style={{ marginTop: "10px" }}>
            <CustomTextarea
              id="my0:otherInfoDescription"
              label="Description"
              value={otherInfoDescription}
              handleChange={this.handleInputChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          {this.handleRenderingSubmitButton()}
          <Button className="btn-reset" onClick={this.clearForm}>
            Reset
          </Button>
          <Button variant="danger" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapstateToProps = (state, ownProps) => {
  return {
    initialValues: state.cv["my0:hasOtherInfo"][ownProps.id],
    others: retrieveOtherTypes(state.utility.otherCVInfoValues)
  };
};

export default connect(
  mapstateToProps,
  { createOtherInfo, fetchOtherCVInfoTypes, updateOtherInfo }
)(OtherInfoModal);

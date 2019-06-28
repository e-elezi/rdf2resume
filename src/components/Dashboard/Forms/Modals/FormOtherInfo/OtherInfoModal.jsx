import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Row, Col, Button } from "react-bootstrap";
import { Combobox } from "react-widgets";
import CustomTextarea from "../../../../core/CustomTextarea";
import { createOtherInfo } from "../../../../../actions";
import { fetchOtherCVInfoTypes } from "../../../../../actions/utilityActions";
import { retrieveOtherTypes } from "../../../../../utilities/utilityQueries";

class OtherInfoModal extends Component {
  state = {
    otherInfo: {
      otherInfoCategory: "",
      otherInfoDescription: ""
    }
  };

  componentWillMount() {
    this.props.fetchOtherCVInfoTypes();
  }

  handleSelectChange = (value, id) => {
    let otherInfo = { ...this.state.otherInfo };
    otherInfo[id] = value.trim();
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
    this.props.createOtherInfo({
      ...this.state.otherInfo,
      id: Math.round(Date.now() + Math.random())
    });
  };

  render() {
    let { otherInfoDescription, otherInfoCategory } = this.state.otherInfo;
    let { onHide } = this.props;
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        className="reference-modal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <Row>
              <Col md={4}>Add Other Information</Col>
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
              value={otherInfoCategory}
              caseSensitive={false}
              minLength={3}
              filter="contains"
              onChange={value =>
                this.handleSelectChange(value, "otherInfoCategory")
              }
            />
          </Row>
          <div style={{ marginTop: "10px" }}>
            <CustomTextarea
              id="otherInfoDescription"
              label="Description"
              value={otherInfoDescription}
              handleChange={this.handleInputChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.handleSave}>
            Save
          </Button>
          <Button variant="danger" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapstateToProps = state => {
  return {
    others: retrieveOtherTypes(state.utility.otherCVInfoValues)
  };
};

export default connect(
  mapstateToProps,
  { createOtherInfo, fetchOtherCVInfoTypes }
)(OtherInfoModal);

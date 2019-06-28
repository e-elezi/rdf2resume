import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Row, Col, Button } from "react-bootstrap";
import { Combobox } from "react-widgets";
import CustomTextarea from "../../../../core/CustomTextarea";
import { updateOtherInfo } from "../../../../../actions";
import { fetchOtherCVInfoTypes } from "../../../../../actions/utilityActions";
import { retrieveOtherTypes } from "../../../../../utilities/utilityQueries";

class OtherInfoUpdateModal extends Component {
  state = {
    otherInfo: {
      otherInfoCategory: "",
      otherInfoDescription: "",
      id: ""
    }
  };

  componentWillMount() {
    this.props.fetchOtherCVInfoTypes();
    if (this.props.otherInfoObject !== null) {
      let inputRef = this.props.otherInfoObject;
      let otherInfo = { ...this.state.otherInfo };
      otherInfo.otherInfoCategory = inputRef.otherInfoCategory;
      otherInfo.otherInfoDescription = inputRef.otherInfoDescription;
      otherInfo.id = inputRef.id;
      this.setState({
        otherInfo
      });
    }
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

  handleUpdate = e => {
    e.preventDefault();
    this.props.updateOtherInfo(this.state.otherInfo);
  };

  render() {
    let { otherInfoDescription, otherInfoCategory } = this.state.otherInfo;
    console.log(otherInfoDescription, otherInfoCategory);
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
              <Col md={4}>Update Other Information</Col>
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
          <CustomTextarea
            id="otherInfoDescription"
            label="Description"
            value={otherInfoDescription}
            handleChange={this.handleInputChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.handleUpdate}>
            Update
          </Button>
          <Button variant="danger" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: state.cv.otherInfo[ownProps.id],
    others: retrieveOtherTypes(state.utility.otherCVInfoValues)
  };
};

export default connect(
  mapStateToProps,
  { updateOtherInfo, fetchOtherCVInfoTypes }
)(OtherInfoUpdateModal);

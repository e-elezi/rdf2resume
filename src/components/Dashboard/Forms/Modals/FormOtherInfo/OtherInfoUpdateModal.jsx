import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Row, Col, Button } from "react-bootstrap";
import CustomSelect from "../../../../core/CustomSelect";
import CustomTextarea from "../../../../core/CustomTextarea";
import { updateOtherInfo } from "../../../../../actions";

class OtherInfoUpdateModal extends Component {
  state = {
    otherInfo: {
      otherInfoCategory: "",
      otherInfoDescription: "",
      id: ''
    },
    categoryValues: []
  };

  getCategoryValues() {
    return ["Publication", "Seminar"];
  }

  componentWillMount() {
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
    this.setState({
      categoryValues: this.getCategoryValues()
    });
  }

  handleSelectChange = (e, id) => {
    let otherInfo = { ...this.state.otherInfo };
    otherInfo[id] = e.target.text.trim();
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
          <CustomSelect
            placeholder="Category"
            id="otherInfoCategory"
            value={otherInfoCategory}
            items={this.state.categoryValues}
            handleSelectChange={this.handleSelectChange}
          />
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
    initialValues: state.cv.otherInfo[ownProps.id]
  };
};

export default connect(
  mapStateToProps,
  { updateOtherInfo }
)(OtherInfoUpdateModal);

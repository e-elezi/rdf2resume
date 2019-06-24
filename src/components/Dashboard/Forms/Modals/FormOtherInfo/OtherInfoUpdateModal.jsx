import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { Modal, Row, Col, Button } from "react-bootstrap";
import CustomDropdown from "../../../../coreRedux/CustomDropdown";
import CustomTextarea from "../../../../coreRedux/CustomTextarea";
import { updateOtherInfo } from "../../../../../actions";

class OtherInfoUpdateModal extends Component {
  state = {
    categoryValues: []
  };

  getCategoryValues() {
    return ["Publication", "Seminar"];
  }

  componentWillMount() {
    this.setState({
      categoryValues: this.getCategoryValues()
    });
  }

  handleUpdate = e => {
    e.preventDefault();
    this.props.updateOtherInfo(this.props.formValues.values);
  };

  render() {
    let { otherInfoDescription, otherInfoCategory } = this.props.initialValues;
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
              <Col md={4}>Add Other Information</Col>
              <Col md={8} />
            </Row>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Field
            name="otherInfoCategory"
            component={CustomDropdown}
            label="Category"
            data={this.state.categoryValues}
          />
          <Field
            name="otherInfoDescription"
            component={CustomTextarea}
            label="Description"
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
    formValues: state.form.otherInfoUpdateModal,
    initialValues: state.cv.otherInfo[ownProps.id],
  };
};

OtherInfoUpdateModal = reduxForm({
  form: "otherInfoUpdateModal"
})(OtherInfoUpdateModal);

export default connect(
  mapStateToProps,
  { updateOtherInfo }
)(OtherInfoUpdateModal);
